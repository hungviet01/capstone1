package com.football.common.utils;

import java.util.Objects;

public class DataUtils {

    public static String resolveKeySearch(String keySearch) {
        if (Objects.isNull(keySearch)) return "%%";
        return "%" + keySearch + "%";
    }
}
