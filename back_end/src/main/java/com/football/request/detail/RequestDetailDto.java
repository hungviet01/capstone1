package com.football.request.detail;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

/**
 * A DTO for the {@link RequestDetail} entity
 */
@Data
public class RequestDetailDto implements Serializable {
    private Long id;
    private String requester;
    private Date createdDate;
    private Integer status;

    @NotNull
    private Long parentId;
}