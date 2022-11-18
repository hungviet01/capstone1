package com.football.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TreeDTO<T> {

    private String key;
    private Boolean isRoot = true;
    private List<T> children;
}
