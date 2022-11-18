package com.football.stadium.type;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class StadiumTypeMapper extends Mapper<StadiumType, StadiumTypeDto> {

    public StadiumTypeMapper() {
        super(StadiumType.class, StadiumTypeDto.class);
    }
}
