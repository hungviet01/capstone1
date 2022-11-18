package com.football.province;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "_PROVINCE")
public class Province {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", length = 1000)
    private String name;
}