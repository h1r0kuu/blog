package com.pwgp.blog.helper;

import com.pwgp.blog.entity.User;
import com.pwgp.blog.repository.FollowRepository;
import com.pwgp.blog.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserServiceHelper {

    private final FollowRepository followRepository;
    private final AuthenticationService authenticationService;

    public boolean isUserSubscribed(String username) {
        User authedUser = authenticationService.getAuthenticatedUser();
        return followRepository.isUserSubscribed(authedUser.getUsername(), username);
    }
}
