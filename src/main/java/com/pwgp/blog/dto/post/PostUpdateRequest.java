package com.pwgp.blog.dto.post;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@Data
public class PostUpdateRequest {

    private String title;

    private String body;

    private String description;

    private Set<Long> tagIds;

    private MultipartFile poster;

}
