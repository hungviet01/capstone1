package com.football.stadium;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class StadiumMapper extends Mapper<Stadium, StadiumDto> {

    public StadiumMapper() {
        super(Stadium.class, StadiumDto.class);
    }
}
