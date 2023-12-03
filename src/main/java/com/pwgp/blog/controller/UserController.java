package com.pwgp.blog.controller;

import com.pwgp.blog.dto.settings.ChangePasswordRequest;
import com.pwgp.blog.dto.user.UserResponse;
import com.pwgp.blog.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pwgp.blog.constants.PathConstants.*;


@RestController
@RequestMapping(API_V1_USERS)
@RequiredArgsConstructor
public class UserController {

    private final UserMapper userMapper;

    @GetMapping(USERNAME)
    public ResponseEntity<UserResponse> getUser(@PathVariable("username") String username) {
        return ResponseEntity.status(HttpStatus.OK).body(userMapper.findByUsername(username));
    }

    @PutMapping(CHANGE_PASSWORD)
    public ResponseEntity<?> changeUserPassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(userMapper.changePassword(changePasswordRequest));
    }
}
