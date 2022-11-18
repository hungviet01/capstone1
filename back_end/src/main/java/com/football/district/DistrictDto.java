package com.football.district;

import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link District} entity
 */
@Data
public class DistrictDto implements Serializable {
    private Integer id;
    private String name;
    private Long provinceId;
}