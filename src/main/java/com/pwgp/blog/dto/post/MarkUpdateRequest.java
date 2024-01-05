package com.pwgp.blog.dto.post;

import lombok.Data;


@Data
public class MarkUpdateRequest {

    private Long postId;
    private Boolean status;

}