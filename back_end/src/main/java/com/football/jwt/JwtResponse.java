package com.football.jwt;

import com.football.user.UserDto;
import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private UserDto userDto;
}
