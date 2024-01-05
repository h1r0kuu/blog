package com.pwgp.blog.security.jwt;

import com.pwgp.blog.constants.AppConstants;
import com.pwgp.blog.constants.ErrorMessage;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.exception.JwtAuthenticationException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${jwt.expiration.ms}")
    private int jwtExpirationMs;

    @Value("${jwt.secret.key}")
    private String key;

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
    }

    public String generateJwtToken(Authentication authentication) {
        User userPrincipal = (User) authentication.getPrincipal();
        return Jwts.builder()
                .subject((userPrincipal.getUsername()))
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getKey())
                .compact();
    }

    public String generateJwtToken(User userPrincipal) {
        return Jwts.builder()
                .subject((userPrincipal.getUsername()))
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getKey())
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().verifyWith(getKey()).build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().verifyWith(getKey()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException | ExpiredJwtException | IllegalArgumentException e) {
            throw new JwtAuthenticationException(ErrorMessage.JWT_TOKEN_EXPIRED);
        }
    }

    public String extractTokenFromRequest(HttpServletRequest request) {
        String headerAuth = request.getHeader(AppConstants.AUTHORIZATION);

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith(AppConstants.BEARER)) {
            return headerAuth.substring(7);
        }

        return null;
    }
}
