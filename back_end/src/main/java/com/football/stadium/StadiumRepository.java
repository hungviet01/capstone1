package com.football.stadium;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StadiumRepository extends JpaRepository<Stadium, String> {

    @Query(
        "SELECT stadium " +
        " FROM Stadium stadium" +
        " WHERE (:provinceId IS NULL OR stadium.provinceId = :provinceId)" +
        " AND (:districtId IS NULL OR stadium.districtId = :districtId)" +
        " AND (:name IS NULL OR stadium.name LIKE :name)" +
        " AND (:owner IS NULL OR stadium.createdBy = :owner)" +
        " AND stadium.status = 1"
    )
    Page<Stadium> findStadium(
        @Param("provinceId") Long provinceId,
        @Param("districtId") Long districtId,
        @Param("name") String name,
        @Param("owner") String owner,
        Pageable pageable
    );

    @Query("SELECT s FROM Stadium s " +
            " JOIN StadiumType t ON t.stadiumId = s.id" +
            " JOIN StadiumDetail d ON d.parentId = t.id" +
            " WHERE d.id = ?1")
    Optional<Stadium> findByStadiumDetailId(Long stadiumDetailId);
}
