package com.pwgp.blog.dto.auth;

import com.pwgp.blog.dto.user.UserResponse;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class JwtResponse {
    private String jwt;
    private UserResponse user;
}
