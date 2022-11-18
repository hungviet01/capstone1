package com.football.district;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class DistrictMapper extends Mapper<District, DistrictDto> {

    public DistrictMapper() {
        super(District.class, DistrictDto.class);
    }
}
