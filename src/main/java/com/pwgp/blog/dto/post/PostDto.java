package com.pwgp.blog.dto.post;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pwgp.blog.dto.user.UserResponse;
import lombok.Data;


import java.time.LocalDateTime;
import java.util.Set;


@Data
public class PostDto {

    private Long id;

    private String title;

    private String posterUrl;

    private String description;

    private String body;

    private Set<TagDto> tags;

    private UserResponse creator;

    private int views;

    private int mark;

    private int positiveMarks;

    private int negativeMarks;

    private Boolean markStatus;

    private Boolean isMyProfileSubscribed;

    private LocalDateTime createdAt;

}