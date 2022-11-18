package com.football.role;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.stream.Stream;

@Getter
@AllArgsConstructor
public enum RoleEnum {
    ADMIN(), USER(), OWNER_STADIUM();

    public static String fromName(String name) {
        return Stream.of(values())
                .filter(value -> value.name().equals(name))
                .findFirst()
                .map(RoleEnum::name)
                .orElseThrow(() -> new IllegalArgumentException(""));
    }
}
