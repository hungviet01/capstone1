package com.football.stadium.option;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "_STADIUM_OPTION")
public class StadiumOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Lob
    @Column(name = "stadium_id", nullable = false)
    private String stadiumId;
}