package com.football.request.detail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RequestDetailRepository extends JpaRepository<RequestDetail, Long> {

    @Query("SELECT r FROM RequestDetail r WHERE r.parentId = ?1 AND r.status = 0")
    List<RequestDetail> findByParentId(Long parentId);
}