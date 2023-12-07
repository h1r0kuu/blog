package com.pwgp.blog.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserProfileResponse {
    private Long id;
    private String username;
    private String email;
    private String avatar;
    private boolean isEmailVerified;
    private int followersSize;
    private int followingsSize;
    @JsonProperty("isMyProfileSubscribed")
    private boolean isMyProfileSubscribed;
}
