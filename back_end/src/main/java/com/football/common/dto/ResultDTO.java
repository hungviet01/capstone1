package com.football.common.dto;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ResultDTO<T> {

    private T data;
    private String message;
    private HttpStatus status;
}
