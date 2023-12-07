package com.pwgp.blog.service;

import com.pwgp.blog.entity.Follow;
import com.pwgp.blog.repository.projection.UserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Set;

public interface FollowService {
    Follow create(Follow follow);
    Page<UserProjection> getUserFollowings(String username, Pageable pageable);
    Page<UserProjection> getUserFollowers(String username, Pageable pageable);
    void followUser(String username);
    void unfollowUser(String username);
}
