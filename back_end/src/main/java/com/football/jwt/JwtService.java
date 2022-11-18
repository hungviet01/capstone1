package com.football.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${spring.jwt.secret}")
    private String secret;

    @Value("${spring.jwt.expire}")
    private Long expiredTime;

    public String getUsernameFromToken(String token) {
        return this.getClaimsFromToken(token, Claims::getSubject);
    }

    public Date getExpirationFromToken(String token) {
        return this.getClaimsFromToken(token, Claims::getExpiration);
    }

    public boolean isExpiredToken(String token) {
        return this.getExpirationFromToken(token).before(new Date());
    }

    public <T> T getClaimsFromToken(String token, Function<Claims, T> claimResolver) {
        Claims claims = this.getAllClaimsFromToken(token);
        return claimResolver.apply(claims);
    }

    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token).getBody();
    }

    public String generateTokenForUser(String username) {
        return generateToken(new HashMap<>(), username);
    }

    public String generateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + this.expiredTime))
                .signWith(SignatureAlgorithm.HS512, this.secret).compact();
    }
}
