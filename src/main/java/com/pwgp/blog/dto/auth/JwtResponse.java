package com.pwgp.blog.dto.auth;

import com.pwgp.blog.dto.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
public class JwtResponse {
    private String jwt;
    private UserResponse user;

    public JwtResponse(String jwt, UserResponse user) {
        this.jwt = jwt;
        this.user = user;
    }
}
