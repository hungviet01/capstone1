package com.football.province;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class ProvinceMapper extends Mapper<Province, ProvinceDto> {

    public ProvinceMapper() {
        super(Province.class, ProvinceDto.class);
    }
}
