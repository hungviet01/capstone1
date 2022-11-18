package com.football.user;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapper extends Mapper<User, UserDto> {

    public UserMapper() {
        super(User.class, UserDto.class);
    }
}
