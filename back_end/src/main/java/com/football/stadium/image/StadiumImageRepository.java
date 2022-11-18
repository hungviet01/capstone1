package com.football.stadium.image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface StadiumImageRepository extends JpaRepository<StadiumImage, Integer> {

    List<StadiumImage> findByStadiumId(String stadiumId);

    @Modifying
    void deleteByStadiumId(String id);
}