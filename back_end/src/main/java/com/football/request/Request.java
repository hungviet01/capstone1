package com.football.request;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

@Data
@Entity
@Table(name = "_REQUEST")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    @Size(max = 100)
    @NotNull
    @Column(name = "created_by", nullable = false, length = 100)
    private String createdBy;

    @NotNull
    @Column(name = "status", nullable = false)
    private Integer status;

    @NotNull
    @Column(name = "has_competitor", nullable = false)
    private Boolean hasCompetitor = false;

    @NotNull
    @Column(name = "stadium_detail_id", nullable = false)
    private Long stadiumDetailId;

    @Size(max = 100)
    @Column(name = "competitor_id", length = 100)
    private String competitorId;

    @NotNull
    @Column(name = "hire_date", nullable = false)
    private Date hireDate;
}