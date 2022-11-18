package com.football.stadium.type.detail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.Tuple;
import java.time.LocalTime;
import java.util.List;

public interface StadiumDetailRepository extends JpaRepository<StadiumDetail, Long> {

    @Query("SELECT MIN(d.price), MAX(d.price) FROM StadiumDetail d" +
            " JOIN StadiumType t ON d.parentId = t.id" +
            " WHERE t.stadiumId = ?1")
    Tuple findMinAndMAxPriceByStadiumId(String stadiumId);

    List<StadiumDetail> findByParentId(Long parentId);

    @Query("SELECT d FROM StadiumDetail d" +
            " JOIN StadiumType t ON d.parentId = t.id" +
            " WHERE t.stadiumId = ?1" +
            " AND (?2 IS NULL OR d.startTime >= ?2)" +
            " AND (?3 IS NULL OR d.endTime <= ?3)")
    List<StadiumDetail> findByStadiumId(String stadiumId, String startTime, String endTime);

}