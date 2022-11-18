package com.football.district;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "_DISTRICT")
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "province_id")
    private Long provinceId;
}