package com.football.request;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class RequestMapper extends Mapper<Request, RequestDto> {

    public RequestMapper() {
        super(Request.class, RequestDto.class);
    }
}
