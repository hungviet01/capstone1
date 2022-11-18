package com.football.bill;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class BillMapper extends Mapper<Bill, BillDto> {

    public BillMapper() {
        super(Bill.class, BillDto.class);
    }
}
