package com.football.bill;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum BillStatus {

    PENDING(0, "Chờ duyệt"), APPROVE(1, "Đã duyệt"), REJECT(2, "Từ chối");

    final Integer status;
    final String statusName;

    public static BillStatus fromStatus(Integer status) {
        return Arrays.stream(values())
                .filter(bill -> bill.status == status)
                .findFirst()
                .orElseThrow( () -> new IllegalArgumentException(""));
    }
}
