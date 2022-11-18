package com.football.common.dto;

import lombok.Data;

import java.util.Objects;

@Data
public class SearchDTO<T> {

    public static final Integer DEFAULT_PAGE_SIZE = 10;

    private Integer page;
    private Integer pageSize;
    private T data;

    public Integer getPage() {
        if (Objects.isNull(page)) return null;
        if (page < 1) {
            return 1;
        }
        return page;
    }

    public Integer getPageSize() {
        if (Objects.isNull(pageSize)) return null;
        if (pageSize < 0) {
            return DEFAULT_PAGE_SIZE;
        }
        return pageSize;
    }
}
