package com.pwgp.blog.dto.user;

import com.pwgp.blog.entity.Follow;
import com.pwgp.blog.entity.Post;
import com.pwgp.blog.entity.VerificationToken;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class UserResponse {
    private Long id;
    private String username;
    private String email;
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
