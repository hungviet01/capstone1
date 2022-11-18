package com.football.cart;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "_CART")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "product_id")
    private String productId;

    @Column(name = "username")
    private String username;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "size_id")
    private Long sizeId;
}
