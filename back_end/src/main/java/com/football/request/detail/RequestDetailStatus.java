package com.football.request.detail;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RequestDetailStatus {

    PENDING(0), APPROVE(1), REJECT(2);

    final Integer status;
}
