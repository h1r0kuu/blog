package com.pwgp.blog.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserProfileResponse {
    private String username;
    private String avatar;
    private String cover;
    private int followersSize;
    private int followingsSize;
    @JsonProperty("isMyProfileSubscribed")
    private boolean isMyProfileSubscribed;
}
