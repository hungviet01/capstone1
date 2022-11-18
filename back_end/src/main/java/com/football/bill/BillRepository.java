package com.football.bill;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface BillRepository extends JpaRepository<Bill, String> {

    @Query("SELECT b FROM Bill b " +
            " WHERE (:createdDate IS NULL OR b.createdDate = :createdDate)" +
            " AND (:status IS NULL OR b.status = :status)" +
            " AND (:id IS NULL OR b.id = :id)" +
            " AND (:createdBy IS NULL OR b.createdBy = :createdBy)")
    Page<Bill> searchBill(
            @Param("createdDate") Date createdDate,
            @Param("status") Integer status,
            @Param("id") String id,
            @Param("createdBy") String username,
            Pageable pageable
    );
}