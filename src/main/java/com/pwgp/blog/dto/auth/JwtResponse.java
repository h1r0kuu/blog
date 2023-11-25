package com.pwgp.blog.dto.auth;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class JwtResponse {
    private String jwt;
    private String username;
    private String email;
}
