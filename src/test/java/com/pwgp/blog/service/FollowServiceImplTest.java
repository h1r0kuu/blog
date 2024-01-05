package com.pwgp.blog.service;

import com.pwgp.blog.entity.Follow;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.repository.FollowRepository;
import com.pwgp.blog.service.impl.FollowServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FollowServiceImplTest {

    @InjectMocks
    private FollowServiceImpl followService;

    @Mock
    private FollowRepository followRepository;

    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private UserService userService;

    @Test
    public void create_ShouldCreateFollow_WhenNotAlreadyFollowing() {
        User follower = new User();
        follower.setUsername("follower");
        User following = new User();
        following.setUsername("following");
        Follow follow = new Follow();
        follow.setFollowing(follower);
        follow.setFollower(following);
        when(followRepository.findByFollower_UsernameAndFollowing_Username("follower", "following")).thenReturn(null);
        when(followRepository.save(follow)).thenReturn(follow);

        Follow result = followService.create(follow);

        assertEquals(follow, result);
        verify(followRepository, times(1)).findByFollower_UsernameAndFollowing_Username("follower", "following");
        verify(followRepository, times(1)).save(follow);
    }

    @Test
    public void create_ShouldThrowRuntimeException_WhenAlreadyFollowing() {
        User follower = new User();
        follower.setUsername("follower");
        User following = new User();
        following.setUsername("following");
        Follow follow = new Follow();
        follow.setFollowing(following);
        follow.setFollower(follower);

        when(followRepository.findByFollower_UsernameAndFollowing_Username("follower", "following")).thenReturn(follow);

        assertThrows(RuntimeException.class, () -> followService.create(follow));
        verify(followRepository, times(1)).findByFollower_UsernameAndFollowing_Username("follower", "following");
        verify(followRepository, times(0)).save(any(Follow.class));
    }

}
