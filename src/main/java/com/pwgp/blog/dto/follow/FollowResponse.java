package com.pwgp.blog.dto.follow;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FollowResponse {
    private String username;
    private String avatar;
    @JsonProperty("isMyProfileSubscribed")
    private boolean isMyProfileSubscribed;
}
