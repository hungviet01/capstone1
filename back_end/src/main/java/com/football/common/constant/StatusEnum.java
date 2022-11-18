package com.football.common.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusEnum {

    ACTIVE(1), INACTIVE(0);

    final Integer status;
}
