package com.pwgp.blog.controller;

import com.pwgp.blog.dto.settings.ChangeGeneralSettingsRequest;
import com.pwgp.blog.dto.settings.ChangePasswordRequest;
import com.pwgp.blog.dto.user.UserProfileResponse;
import com.pwgp.blog.mapper.FollowMapper;
import com.pwgp.blog.mapper.UserMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "User Controller")
public class UserController {

    private final UserMapper userMapper;
    private final FollowMapper followMapper;

    @Operation(summary = "Get User Profile")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User profile retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(USERNAME)
    public ResponseEntity<UserProfileResponse> getUser(@PathVariable("username") String username) {
        return ResponseEntity.status(HttpStatus.OK).body(userMapper.findByUsername(username));
    }

    @Operation(summary = "Change User Password")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Password changed successfully"),
        @ApiResponse(responseCode = "400", description = "Bad Request"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping(CHANGE_PASSWORD)
    public ResponseEntity<?> changeUserPassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(userMapper.changePassword(changePasswordRequest));
    }

    @Operation(summary = "Change General Settings")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "General settings changed successfully"),
        @ApiResponse(responseCode = "400", description = "Bad Request"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping(CHANGE_GENERAL)
    public ResponseEntity<?> changeGeneralSettings(@RequestBody ChangeGeneralSettingsRequest changeGeneralSettingsRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(userMapper.changeGeneralSettings(changeGeneralSettingsRequest));
    }

    @Operation(summary = "Get User Followers")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User followers retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(USER_FOLLOWERS)
    public ResponseEntity<Page<UserProfileResponse>> getUserFollowers(@PathVariable("username") String username,
                                                               @PageableDefault Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(followMapper.getUserFollowers(username, pageable));
    }

    @Operation(summary = "Get User Followings")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User followings retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(USER_FOLLOWINGS)
    public ResponseEntity<Page<UserProfileResponse>> getUserFollowings(@PathVariable("username") String username,
                                                                       @PageableDefault Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(followMapper.getUserFollowings(username, pageable));
    }

    @Operation(summary = "Follow User")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User followed successfully"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(FOLLOW_USER)
    public ResponseEntity<?> followUser(@PathVariable("username") String username) {
        followMapper.followUser(username);
        return ResponseEntity.status(HttpStatus.OK).body("dsa");
    }

    @Operation(summary = "Unfollow User")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User unfollowed successfully"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping(UNFOLLOW_USER)
    public ResponseEntity<?> unfollowUser(@PathVariable("username") String username) {
        followMapper.unfollowUser(username);
        return ResponseEntity.status(HttpStatus.OK).body("dsa");
    }
}
