package com.pwgp.blog.dto.user;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String about;
    private String avatar;
    private String cover;
//    private Set<Post> posts = new HashSet<Post>();
//    private Set<Post> viewedPosts = new HashSet<Post>();
    private Boolean isEmailVerified;
    private int followersSize;
    private int followingsSize;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
