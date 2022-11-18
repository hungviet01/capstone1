package com.football.stadium.image;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

/**
 * A DTO for the {@link StadiumImage} entity
 */
@Data
public class StadiumImageDto implements Serializable {
    private Integer id;
    private MultipartFile file;
    private String stadiumId;
    private String image;
}