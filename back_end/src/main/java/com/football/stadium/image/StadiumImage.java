package com.football.stadium.image;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "_STADIUM_IMAGE")
public class StadiumImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Lob
    @Column(name = "image", nullable = false)
    private String image;

    @Lob
    @Column(name = "stadium_id", nullable = false)
    private String stadiumId;
}