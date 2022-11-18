package com.football.stadium.option;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class StadiumOptionMapper extends Mapper<StadiumOption, StadiumOptionDto> {

    public StadiumOptionMapper() {
        super(StadiumOption.class, StadiumOptionDto.class);
    }
}
