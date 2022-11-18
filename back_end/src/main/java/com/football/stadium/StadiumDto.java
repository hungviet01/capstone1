package com.football.stadium;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.football.stadium.image.StadiumImageDto;
import com.football.stadium.type.StadiumTypeDto;
import com.football.stadium.option.StadiumOptionDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * A DTO for the {@link Stadium} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StadiumDto implements Serializable {

    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String address;

    @NotNull
    private Long districtId;

    @NotNull
    private Long provinceId;

    private String avatar;

    private MultipartFile avatarFile;

    private String description;

    private String createdBy;

    private Timestamp createdDate;

    private Integer status;

    private Integer totalType;

    private BigDecimal minPrice;
    private BigDecimal maxPrice;

    private String provinceName;

    @NotNull
    private List<StadiumTypeDto> details;

    @JsonIgnore
    private List<MultipartFile> images = new ArrayList<>();

    private List<StadiumImageDto> imageDto = new ArrayList<>();
    private List<StadiumOptionDto> options = new ArrayList<>();
}