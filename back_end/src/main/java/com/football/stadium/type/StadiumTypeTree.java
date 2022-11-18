package com.football.stadium.type;

import com.football.common.dto.TreeDTO;
import com.football.stadium.type.detail.StadiumDetailDto;
import lombok.Data;

@Data
public class StadiumTypeTree extends TreeDTO<StadiumDetailDto> {
    private Long id;
    private String name;
    private Long quantity;
}
