package com.football.admin.bill;

import com.football.bill.Bill;
import com.football.bill.BillDto;
import com.football.bill.BillRepository;
import com.football.bill.BillStatus;
import com.football.bill.detail.BillDetail;
import com.football.bill.detail.BillDetailDto;
import com.football.bill.detail.BillDetailRepository;
import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.common.utils.DataUtils;
import com.football.common.utils.ResultUtils;
import com.football.mail.MailDTO;
import com.football.mail.MailService;
import com.football.mail.MailTemplate;
import com.football.product.Product;
import com.football.product.ProductRepository;
import com.football.user.User;
import com.football.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminBillService {

    private final UserService userService;

    private final BillRepository billRepository;
    private final BillDetailRepository billDetailRepository;
    private final ProductRepository productRepository;

    private final MailService mailService;

    public SearchResponse<List<Bill>> searchBill(SearchDTO<BillDto> searchDTO) {
        log.info("search bill");
        BillDto bill = searchDTO.getData();
        Pageable pageable = null;
        if (Objects.nonNull(searchDTO.getPage()) && Objects.nonNull(searchDTO.getPageSize())) {
            pageable = PageRequest.of(searchDTO.getPage() - 1, searchDTO.getPageSize());
        }
        Page<Bill> bills = this.billRepository.searchBill(
                bill.getCreatedDate(),
                bill.getStatus(),
                bill.getId(),
                null,
                pageable
        );
        SearchResponse<List<Bill>> billResponse = new SearchResponse<>();
        billResponse.setTotal(bills.getTotalElements());
        billResponse.setData(bills.getContent());
        return billResponse;
    }

    @Transactional
    public ResultDTO approveBill(String billId) {
        Bill bill = this.billRepository.findById(billId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hóa đơn"));
        bill.setStatus(BillStatus.APPROVE.getStatus());
        this.billRepository.save(bill);
        User user = this.userService.getUserByUsername(bill.getCreatedBy());
        this.sendMail(user, bill, null);
        return ResultUtils.buildSuccessResult(bill);
    }

    @Transactional
    public ResultDTO rejectBill(String billId) {
        Bill bill = this.billRepository.findById(billId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hóa đơn"));
        bill.setStatus(BillStatus.REJECT.getStatus());
        this.billRepository.save(bill);
        List<BillDetailDto> details = this.billDetailRepository.findByBillId(billId);
        details.forEach(detail -> {
            Product product = this.productRepository.findById(detail.getProductId()).get();
            product.setQuantity( product.getQuantity() + detail.getQuantity() );
            this.productRepository.save(product);
        });
        User user = this.userService.getUserByUsername(bill.getCreatedBy());
        this.sendMail(user, bill, "Sản phẩm đã hết hàng.");
        return ResultUtils.buildSuccessResult(null);
    }

    @Async
    public void sendMail(User user, Bill bill, String reason) {
        MailDTO mailDTO = new MailDTO();
        mailDTO.setTo(new String[]{user.getEmail()});
        mailDTO.setParamsTemplate(new HashMap<>());
        Map<String, Object> params = mailDTO.getParamsTemplate();
        params.put("param0", user.getFullName());
        params.put("param1", bill.getId());
        if (BillStatus.APPROVE.getStatus().equals(bill.getStatus())) {
            mailDTO.setTemplateContent(MailTemplate.APPROVE_BILL);
            mailDTO.setSubject("[THÔNG BÁO] VẬN CHUYỂN ĐƠN HÀNG");
        }

        if (BillStatus.REJECT.getStatus().equals(bill.getStatus())) {
            params.put("param2", reason);
            mailDTO.setSubject("[THÔNG BÁO] ĐƠN HÀNG BỊ HỦY");
            mailDTO.setTemplateContent(MailTemplate.REJECT_BILL);
        }
        this.mailService.send(mailDTO);
    }
}
