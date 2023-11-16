package com.pwgp.blog.controller;

import com.pwgp.blog.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserMapper userMapper;

    @GetMapping("/users")
    @PreAuthorize("isAuthenticated()")
    public String users(Authentication aa) {
        org.springframework.security.core.Authentication authentication  = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getName());
        return "5";
    }
}
