package com.football.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {

    @Query("SELECT new com.football.product.ProductDto(p, c) FROM Product p " +
            " JOIN Category c ON c.id = p.categoryId" +
            " WHERE 1 = 1" +
            " AND (:categoryId IS NULL OR p.categoryId = :categoryId)" +
            " AND (:name IS NULL OR p.name LIKE :name)" +
            " AND (:status IS NULL OR p.status = :status)" +
            " ORDER BY p.categoryId, p.name")
    Page<ProductDto> searchProduct(
            @Param("categoryId") Long categoryId,
            @Param("name") String name,
            @Param("status") Integer status,
            Pageable pageable
    );

    @Query("SELECT p FROM Product p WHERE p.status = 1 AND p.categoryId = ?1")
    List<Product> findByCategoryId(Long categoryId);

}