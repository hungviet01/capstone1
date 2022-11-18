package com.football.request;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {

    @Query(nativeQuery = true,
            value = "SELECT * FROM _REQUEST " +
                    " WHERE stadium_detail_id = ?1" +
                    " AND hire_date = ?2" +
                    " AND status = ?3")
    List<Request> findApprovedRequest(Long stadiumDetailId, String hireDate, Integer status);

    @Query("SELECT new com.football.request.PendingRequestDto(s, t, d, r) FROM Request r" +
            " JOIN StadiumDetail d ON d.id = r.stadiumDetailId" +
            " JOIN StadiumType t ON t.id = d.parentId" +
            " JOIN Stadium s ON s.id = t.stadiumId" +
            " WHERE r.status = 0 AND r.hireDate >= current_date" +
            " AND (:stadiumId IS NULL OR s.id = :stadiumId)" +
            " AND (:provinceId IS NULL OR s.provinceId = :provinceId)" +
            " AND (:districtId IS NULL OR s.districtId = :districtId)" +
            " AND (:name IS NULL OR s.name LIKE :name)")
    Page<PendingRequestDto> findStadiumRequest(
            @Param("stadiumId") String stadiumId,
            @Param("provinceId") Long provinceId,
            @Param("districtId") Long districtId,
            @Param("name") String name,
            Pageable pageable
    );

    @Query("SELECT r FROM Request r" +
            " JOIN StadiumDetail d ON d.id = r.stadiumDetailId" +
            " JOIN StadiumType t ON t.id = d.parentId" +
            " WHERE t.stadiumId = ?1 AND r.status = 0")
    List<Request> findAllPendingRequest(String stadiumId);

    @Query(nativeQuery = true,
            value = "SELECT * FROM _REQUEST " +
                    " WHERE hire_date = ?1 " +
                    " AND stadium_detail_id = ?2" +
                    " AND status = 0")
    List<Request> findAllByHireDateAndStadiumDetailId(String hireDate, Long stadiumDetailId);

    @Query("SELECT new com.football.request.RequestDto(d, r) FROM Request r " +
            " JOIN StadiumDetail d ON r.stadiumDetailId = d.id" +
            " JOIN StadiumType t ON t.id = d.parentId" +
            " WHERE r.hireDate = ?1 AND t.id = ?2 AND r.status = 1")
    List<RequestDto> findAllRequestByHireDate(Date hireDate, Long typeId);

    @Query("SELECT new com.football.request.RequestTree(r.hireDate, t.name, t.id) FROM Request r" +
            " JOIN StadiumDetail d ON d.id = r.stadiumDetailId" +
            " JOIN StadiumType t ON t.id = d.parentId" +
            " WHERE t.stadiumId = ?1 AND r.status = 1 AND r.hireDate >= current_date AND r.createdBy <> ?2")
    List<RequestTree> findRequestTree(String stadiumId, String username);

    @Query("SELECT new com.football.request.RequestDto(s, t, d, r) FROM Request r" +
            " JOIN StadiumDetail d ON r.stadiumDetailId = d.id" +
            " JOIN StadiumType t ON t.id = d.parentId" +
            " JOIN Stadium s ON s.id = t.stadiumId" +
            " WHERE r.createdBy = :username AND r.status = 1 AND r.hasCompetitor = true AND r.hireDate >= current_date" +
            " AND ((:isFinding = true AND r.competitorId IS NULL) OR (:isFinding = false AND r.competitorId IS NOT NULL)) " +
            " AND (:provinceId IS NULL OR s.provinceId = :provinceId)" +
            " AND (:districtId IS NULL OR s.districtId = :districtId)" +
            " AND (:name IS NULL OR s.name LIKE :name)")
    Page<RequestDto> findRequestByUsername(
            @Param("username") String username,
            @Param("isFinding") Boolean isFinding,
            @Param("provinceId") Long provinceId,
            @Param("districtId") Long districtId,
            @Param("name") String name,
            Pageable pageable);
}