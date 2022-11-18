package com.football.cart;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query("SELECT new com.football.cart.CartDto(c, p, cate, s) FROM Cart c" +
            " JOIN Product p ON p.id = c.productId" +
            " JOIN Category cate ON cate.id = p.categoryId" +
            " JOIN Size s ON s.id = c.sizeId" +
            " WHERE c.username = :username" +
            " AND (:productName IS NULL OR p.name LIKE :productName)" +
            " AND (:categoryId IS NULL OR p.categoryId = :categoryId)")
    Page<CartDto> searchCart(
            @Param("username") String username,
            @Param("productName") String productName,
            @Param("categoryId") Long categoryId,
            Pageable pageable
    );

    Optional<Cart> findByUsernameAndProductIdAndSizeId(
            @Param("username") String username,
            @Param("productId") String productId,
            @Param("sizeId") Long sizeId
    );
}