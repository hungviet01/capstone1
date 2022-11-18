package com.football.stadium.option;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StadiumOptionRepository extends JpaRepository<StadiumOption, Integer> {

    List<StadiumOption> findByStadiumId(String stadiumId);
}