package com.football.product;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "_PRODUCT")
public class Product {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "status")
    private Integer status;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "description")
    private String description;
}
