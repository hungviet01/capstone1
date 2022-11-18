package com.football.size;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size, Long> {

    List<Size> findByProductId(String productId);

    @Modifying
    void deleteByProductId(String productId);
}