package com.football.province;

import com.football.district.DistrictDto;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the {@link Province} entity
 */
@Data
public class ProvinceDto implements Serializable {

    private Integer id;
    private String name;
    private List<DistrictDto> districts;
}