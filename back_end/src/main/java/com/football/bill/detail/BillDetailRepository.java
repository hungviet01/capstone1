package com.football.bill.detail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillDetailRepository extends JpaRepository<BillDetail, Long> {

    @Query("SELECT new com.football.bill.detail.BillDetailDto(bd, p, c, s) FROM BillDetail bd" +
            " JOIN Product p ON p.id = bd.productId" +
            " JOIN Category c ON p.categoryId = c.id" +
            " JOIN Size s ON s.id = bd.sizeId")
    List<BillDetailDto> findByBillId(String billId);
}