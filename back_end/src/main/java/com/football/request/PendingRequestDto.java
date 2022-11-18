package com.football.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.football.stadium.Stadium;
import com.football.stadium.type.StadiumType;
import com.football.stadium.type.detail.StadiumDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PendingRequestDto {
    private Long requestId;
    private Long detailId;
    private String stadiumName;
    private String typeName;

    private Date hireDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String requester;
    private String hasCompetitor;

    public PendingRequestDto(Stadium stadium, StadiumType stadiumType, StadiumDetail stadiumDetail, Request request) {
        this.stadiumName = stadium.getName();
        this.typeName = stadiumType.getName();
        this.startTime = stadiumDetail.getStartTime();
        this.endTime = stadiumDetail.getEndTime();
        this.requester = request.getCreatedBy();
        this.requestId = request.getId();
        this.hireDate = request.getHireDate();
        this.detailId = stadiumDetail.getId();
        this.hasCompetitor = request.getHasCompetitor() ? "Y" : "N";
    }
}
