package com.football.security;

import com.football.jwt.JwtRequest;
import com.football.jwt.JwtResponse;
import com.football.jwt.JwtService;
import com.football.user.UserDto;
import com.football.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SecurityController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/authenticate")
    public ResponseEntity<JwtResponse> authenticate(@RequestBody JwtRequest jwtRequest) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword());
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        UserDto userDto = this.userService.getCurrentUser();
        JwtResponse jwtResponse = new JwtResponse();
        String token = this.jwtService.generateTokenForUser(userDto.getUsername());
        jwtResponse.setToken(token);
        jwtResponse.setUserDto(userDto);
        return ResponseEntity.ok(jwtResponse);
    }
}
