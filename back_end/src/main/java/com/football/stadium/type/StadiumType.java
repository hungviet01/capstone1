package com.football.stadium.type;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "_STADIUM_TYPE")
public class StadiumType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "stadium_id")
    private String stadiumId;
}