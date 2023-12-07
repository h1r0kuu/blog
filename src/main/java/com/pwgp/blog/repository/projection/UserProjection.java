package com.pwgp.blog.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface UserProjection {
    Long getId();
    String getUsername();
    String getEmail();
    String getAvatar();
    boolean getIsEmailVerified();

    @Value("#{target.followers.size()}")
    int getFollowersSize();

    @Value("#{target.followings.size()}")
    int getFollowingsSize();

    @Value("#{@userServiceHelper.isUserSubscribed(target.username)}")
    boolean getIsMyProfileSubscribed();
}