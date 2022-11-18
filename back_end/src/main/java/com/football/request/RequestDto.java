package com.football.request;

import com.football.stadium.Stadium;
import com.football.stadium.type.StadiumType;
import com.football.stadium.type.detail.StadiumDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalTime;
import java.util.Date;
import java.util.Objects;

/**
 * A DTO for the {@link Request} entity
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestDto implements Serializable {
    private Long id;
    private Instant createdDate;
    private String createdBy;
    private Integer status;
    private Boolean hasCompetitor;
    private Long stadiumDetailId;
    private String competitorId;
    private Date hireDate;
    private String key;

    private LocalTime startTime;
    private LocalTime endTime;
    private BigDecimal price;
    private String competitor;

    private String avatar;
    private String stadiumName;
    private String stadiumAddress;
    private String typeName;

    public RequestDto(Stadium stadium, StadiumType stadiumType, StadiumDetail stadiumDetail, Request request) {
        this(stadiumDetail, request);
        this.stadiumName = stadium.getName();
        this.stadiumAddress = stadium.getAddress();
        this.avatar = stadium.getAvatar();
        this.typeName = stadiumType.getName();
    }

    public RequestDto(StadiumDetail stadiumDetail, Request request) {
        this.startTime = stadiumDetail.getStartTime();
        this.endTime = stadiumDetail.getEndTime();
        this.price = stadiumDetail.getPrice();
        this.competitor = request.getCreatedBy();
        this.id = request.getId();
        this.hireDate = request.getHireDate();
    }

    public String getKey() {
        if (Objects.isNull(this.startTime)) {
            return "";
        }

        if (Objects.isNull(this.endTime)) {
            return "";
        }
        return this.startTime.toString() + "-" + this.endTime.toString();
    }
}