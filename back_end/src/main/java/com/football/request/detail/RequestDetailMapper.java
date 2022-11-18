package com.football.request.detail;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class RequestDetailMapper extends Mapper<RequestDetail, RequestDetailDto> {

    public RequestDetailMapper() {
        super(RequestDetail.class, RequestDetailDto.class);
    }
}
