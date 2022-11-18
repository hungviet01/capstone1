package com.football.stadium.type.detail;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class StadiumDetailMapper extends Mapper<StadiumDetail, StadiumDetailDto> {

    public StadiumDetailMapper() {
        super(StadiumDetail.class, StadiumDetailDto.class);
    }
}
