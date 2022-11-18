package com.football.stadium.type;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface StadiumTypeRepository extends JpaRepository<StadiumType, Long> {

    List<StadiumType> findByStadiumId(String stadiumId);

    @Modifying
    void deleteByStadiumId(String stadiumId);
}