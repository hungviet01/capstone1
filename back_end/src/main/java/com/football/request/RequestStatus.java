package com.football.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RequestStatus {

    PENDING(0), APPROVED(1), REJECT(2);

    final Integer status;
}
