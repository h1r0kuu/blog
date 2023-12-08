package com.pwgp.blog.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface FollowProjection {
    String getUsername();
    String getAvatar();
    @Value("#{@userServiceHelper.isUserSubscribed(target.username)}")
    boolean getIsMyProfileSubscribed();
}