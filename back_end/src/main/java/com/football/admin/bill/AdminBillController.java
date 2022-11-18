package com.football.admin.bill;

import com.football.bill.Bill;
import com.football.bill.BillDto;
import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/bills")
public class AdminBillController {

    private final AdminBillService adminBillService;

    @PostMapping("/search-bill")
    public ResponseEntity searchBill(@RequestBody SearchDTO<BillDto> searchDTO) {
        SearchResponse<List<Bill>> response = this.adminBillService.searchBill(searchDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/approve/{billId}")
    public ResponseEntity approveBill(@PathVariable String billId) {
        ResultDTO resultDTO = this.adminBillService.approveBill(billId);
        return ResponseEntity.ok(resultDTO);
    }

    @GetMapping("/reject/{billId}")
    public ResponseEntity rejectBill(@PathVariable String billId) {
        ResultDTO resultDTO = this.adminBillService.rejectBill(billId);
        return ResponseEntity.ok(resultDTO);
    }
}
