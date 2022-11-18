package com.football.stadium.image;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class StadiumImageMapper extends Mapper<StadiumImage, StadiumImageDto> {

    public StadiumImageMapper() {
        super(StadiumImage.class, StadiumImageDto.class);
    }
}
