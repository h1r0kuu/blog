package com.pwgp.blog.controller;

import com.pwgp.blog.dto.settings.ChangeGeneralSettingsRequest;
import com.pwgp.blog.dto.settings.ChangePasswordRequest;
import com.pwgp.blog.dto.user.UserProfileResponse;
import com.pwgp.blog.mapper.FollowMapper;
import com.pwgp.blog.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pwgp.blog.constants.PathConstants.*;


@RestController
@RequestMapping(API_V1_USERS)
@RequiredArgsConstructor
public class UserController {

    private final UserMapper userMapper;
    private final FollowMapper followMapper;

    @GetMapping(USERNAME)
    public ResponseEntity<UserProfileResponse> getUser(@PathVariable("username") String username) {
        return ResponseEntity.status(HttpStatus.OK).body(userMapper.findByUsername(username));
    }

    @PutMapping(CHANGE_PASSWORD)
    public ResponseEntity<?> changeUserPassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(userMapper.changePassword(changePasswordRequest));
    }

    @PutMapping(CHANGE_GENERAL)
    public ResponseEntity<?> changeGeneralSettings(@RequestBody ChangeGeneralSettingsRequest changeGeneralSettingsRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(userMapper.changeGeneralSettings(changeGeneralSettingsRequest));
    }

    @GetMapping(USER_FOLLOWERS)
    public ResponseEntity<Page<UserProfileResponse>> getUserFollowers(@PathVariable("username") String username,
                                                               @PageableDefault Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(followMapper.getUserFollowers(username, pageable));
    }

    @GetMapping(USER_FOLLOWINGS)
    public ResponseEntity<Page<UserProfileResponse>> getUserFollowings(@PathVariable("username") String username,
                                                                       @PageableDefault Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(followMapper.getUserFollowings(username, pageable));
    }

    @PostMapping(FOLLOW_USER)
    public ResponseEntity<?> followUser(@PathVariable("username") String username) {
        followMapper.followUser(username);
        return ResponseEntity.status(HttpStatus.OK).body("dsa");
    }

    @DeleteMapping(UNFOLLOW_USER)
    public ResponseEntity<?> unfollowUser(@PathVariable("username") String username) {
        followMapper.unfollowUser(username);
        return ResponseEntity.status(HttpStatus.OK).body("dsa");
    }
}
