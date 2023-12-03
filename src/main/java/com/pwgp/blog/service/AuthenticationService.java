package com.pwgp.blog.service;

import com.pwgp.blog.dto.auth.AuthRequest;
import com.pwgp.blog.dto.auth.JwtResponse;
import com.pwgp.blog.entity.User;

public interface AuthenticationService {
    String getAuthenticatedUserUsername();
    User getAuthenticatedUser();
    JwtResponse login(AuthRequest authRequest);
}
