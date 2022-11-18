package com.football.bill;

import com.football.bill.detail.BillDetailDto;
import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @PostMapping("/checkout")
    public ResponseEntity checkout(@RequestBody PaymentDto paymentDto) {
        ResultDTO payment = this.billService.payment(paymentDto);
        return ResponseEntity.ok(payment);
    }

    @PostMapping("/mine")
    public ResponseEntity getMyBill(@RequestBody SearchDTO<BillDto> searchDTO) {
        SearchResponse<List<BillDto>> myBill = this.billService.getMyBill(searchDTO);
        return ResponseEntity.ok(myBill);
    }

    @GetMapping("/detail/{billId}")
    public ResponseEntity getDetail(@PathVariable String billId) {
        List<BillDetailDto> billDetail = this.billService.getBillDetail(billId);
        return ResponseEntity.ok(billDetail);
    }

}
