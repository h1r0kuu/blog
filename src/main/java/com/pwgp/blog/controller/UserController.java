package com.pwgp.blog.controller;

import com.pwgp.blog.dto.user.UserResponse;
import com.pwgp.blog.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserMapper userMapper;

    @GetMapping("/{username}")
    public ResponseEntity<UserResponse> getUser(@PathVariable("username") String username) {
        return ResponseEntity.status(HttpStatus.OK).body(userMapper.findByUsername(username));
    }
}
