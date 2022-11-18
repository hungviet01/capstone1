package com.football.size;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "_SIZE")
public class Size {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "product_id")
    private String productId;
}
