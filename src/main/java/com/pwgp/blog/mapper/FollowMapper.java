package com.pwgp.blog.mapper;

import com.pwgp.blog.dto.follow.FollowResponse;
import com.pwgp.blog.dto.user.UserProfileResponse;
import com.pwgp.blog.dto.user.UserResponse;
import com.pwgp.blog.entity.Follow;
import com.pwgp.blog.repository.projection.UserProjection;
import com.pwgp.blog.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FollowMapper {

    private final FollowService followService;
    private final ModelMapper modelMapper;

    public Page<FollowResponse> getUserFollowers(String username, Pageable pageable) {
        return followService.getUserFollowers(username, pageable).map(f -> modelMapper.map(f, FollowResponse.class));
    }

    public Page<FollowResponse> getUserFollowings(String username, Pageable pageable) {
        return followService.getUserFollowings(username, pageable).map(f -> modelMapper.map(f, FollowResponse.class));
    }

    public void followUser(String username) {
        followService.followUser(username);
    }

    public void unfollowUser(String username) {
        followService.unfollowUser(username);
    }
}
