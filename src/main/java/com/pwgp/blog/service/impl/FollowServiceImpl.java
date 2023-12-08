package com.pwgp.blog.service.impl;

import com.pwgp.blog.entity.Follow;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.repository.FollowRepository;
import com.pwgp.blog.repository.projection.FollowProjection;
import com.pwgp.blog.repository.projection.UserProjection;
import com.pwgp.blog.service.AuthenticationService;
import com.pwgp.blog.service.FollowService;
import com.pwgp.blog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final AuthenticationService authenticationService;
    private final UserService userService;

    @Override
    public Follow create(Follow follow) {
        Follow existedFollow = followRepository.findByFollower_UsernameAndFollowing_Username(
                follow.getFollower().getUsername(),
                follow.getFollowing().getUsername()
        );
        if(existedFollow != null) {
            throw new RuntimeException("User already following");
        }
        return followRepository.save(follow);
    }

    @Override
    public Page<FollowProjection> getUserFollowings(String username, Pageable pageable) {
        return followRepository.findFollowings(username, pageable);
    }

    @Override
    public Page<FollowProjection> getUserFollowers(String username, Pageable pageable) {
        return followRepository.findFollowers(username, pageable);
    }

    @Override
    public void followUser(String username) {
        User authedUser = authenticationService.getAuthenticatedUser();
        User followingUser = userService.findByUsername(username, User.class);
        if(authedUser.equals(followingUser)) {
            throw new RuntimeException("You cannot follow yourself");
        }
        Follow follow = new Follow();
        follow.setFollower(authedUser);
        follow.setFollowing(followingUser);
        create(follow);
    }

    @Override
    @Transactional
    public void unfollowUser(String username) {
        User authedUser = authenticationService.getAuthenticatedUser();
        followRepository.deleteByFollower_UsernameAndFollowing_Username(authedUser.getUsername(), username);
    }
}
