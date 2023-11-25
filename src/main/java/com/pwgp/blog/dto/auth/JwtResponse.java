package com.pwgp.blog.dto.auth;

import lombok.Builder;

@Builder
public class JwtResponse {
    private String jwt;
    private String username;
    private String email;
}
