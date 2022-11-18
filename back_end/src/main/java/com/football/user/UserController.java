package com.football.user;

import com.football.common.dto.ResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity regisUser(@RequestBody User user) {
        ResultDTO<UserDto> result = this.userService.regisUser(user);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PostMapping("/active")
    public ResponseEntity activeUser(@RequestBody UserDto userDto) {
        UserDto userDto1 = this.userService.activeAccount(userDto);
        return ResponseEntity.ok(userDto1);
    }

    @PostMapping("/re-send-mail")
    public ResponseEntity reSendMail(@RequestBody UserDto userDto) {
        userDto = this.userService.reSendMail(userDto);
        return ResponseEntity.ok(userDto);
    }
}
