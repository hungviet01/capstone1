package com.football.bill;

import com.football.bill.detail.BillDetail;
import com.football.bill.detail.BillDetailDto;
import com.football.bill.detail.BillDetailRepository;
import com.football.cart.CartDto;
import com.football.cart.CartRepository;
import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.common.utils.DataUtils;
import com.football.common.utils.DateUtils;
import com.football.common.utils.ResultUtils;
import com.football.product.Product;
import com.football.product.ProductMapper;
import com.football.product.ProductRepository;
import com.football.user.UserDto;
import com.football.user.UserService;
import com.football.validator.ValidatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class BillService {

    private final UserService userService;

    private final BillRepository billRepository;
    private final BillDetailRepository billDetailRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;

    private final ValidatorService validatorService;

    private final ProductMapper productMapper;
    private final BillMapper billMapper;

    public List<BillDetailDto> getBillDetail(String billId) {
        Bill bill = this.billRepository.findById(billId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hóa đơn"));
        return this.billDetailRepository.findByBillId(billId);
    }

    public SearchResponse<List<BillDto>> getMyBill(SearchDTO<BillDto> searchDTO) {
        UserDto currentUser = this.userService.getCurrentUser();
        BillDto data = searchDTO.getData();
        Page<Bill> bills = this.billRepository.searchBill(
                data.getCreatedDate(),
                data.getStatus(),
                data.getId(),
                currentUser.getUsername(),
                PageRequest.of(searchDTO.getPage() - 1, searchDTO.getPageSize())
        );
        SearchResponse searchResponse = new SearchResponse();
        searchResponse.setTotal(bills.getTotalElements());
        searchResponse.setData(this.billMapper.toDto(bills.getContent()));
        return searchResponse;
    }

    @Transactional
    public ResultDTO payment(PaymentDto paymentDto) {
        this.validatorService.validate(paymentDto);
        UserDto currentUser = this.userService.getCurrentUser();

        Bill bill = new Bill();
        bill.setId(UUID.randomUUID().toString());
        bill.setCreatedBy(currentUser.getUsername());
        bill.setPhone(paymentDto.getPhone());
        bill.setAddress(paymentDto.getAddress());
        bill.setFullName(paymentDto.getFullName());
        bill.setStatus(BillStatus.PENDING.getStatus());
        bill.setCreatedDate(new Date());

        BigDecimal totalPrice = paymentDto.getCarts().stream()
                .map(cart -> {
                    Product product = this.productRepository.findById(cart.getProductId()).get();
                    cart.setProduct(this.productMapper.toDto(product));
                    if (product.getQuantity() < cart.getQuantity())
                        throw new IllegalArgumentException("Không đủ số lượng sản phẩm: " + product.getName());
                    product.setQuantity( product.getQuantity() - cart.getQuantity());
                    this.productRepository.save(product);
                    return product.getPrice().multiply(new BigDecimal(cart.getQuantity().toString()));
                })
                .reduce(new BigDecimal("0"), (total, cur) -> total.add(cur));
        bill.setTotal(totalPrice);
        Bill _bill = this.billRepository.save(bill);

        List<BillDetail> billDetails = paymentDto.getCarts().stream().map(cart -> {
            BillDetail billDetail = new BillDetail();
            billDetail.setBillId(_bill.getId());
            billDetail.setQuantity(cart.getQuantity());
            billDetail.setPrice(cart.getProduct().getPrice());
            billDetail.setProductId(cart.getProductId());
            billDetail.setSizeId(cart.getSizeId());
            return billDetail;
        }).collect(Collectors.toList());
        this.billDetailRepository.saveAll(billDetails);
        this.cartRepository.deleteAllById(paymentDto.getCarts().stream().map(CartDto::getId).collect(Collectors.toList()));

        return ResultUtils.buildSuccessResult(bill);
    }
}
