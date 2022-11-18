package com.football.size;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class SizeMapper extends Mapper<Size, SizeDto> {

    public SizeMapper() {
        super(Size.class, SizeDto.class);
    }
}
