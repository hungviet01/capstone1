package com.football.stadium.type;

import com.football.stadium.type.detail.StadiumDetailDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;

/**
 * A DTO for the {@link StadiumType} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StadiumTypeDto implements Serializable {
    private Long id;
    private String name;
    private Long quantity;
    private List<StadiumDetailDto> types;
}