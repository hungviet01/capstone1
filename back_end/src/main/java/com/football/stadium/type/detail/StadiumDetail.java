package com.football.stadium.type.detail;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "_STADIUM_DETAIL")
public class StadiumDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Column(name = "price", precision = 10)
    private BigDecimal price;

    @NotNull
    @Column(name = "parent_id", nullable = false)
    private Long parentId;
}