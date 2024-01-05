package com.pwgp.blog.dto.post;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class PostCreationRequest {

    @NotEmpty
    @Size(min = 6, message = "Post title should have at least 6 characters")
    private String title;

    @NotEmpty
    @Size(min = 500, message = "Post body should have at least 500 characters")
    private String body;

    @NotEmpty
    @Size(min = 250, max = 550, message = "Post body should have at least 250 and less than 550 characters")
    private String description;

    private List<Long> tagIds;

    @NotEmpty
    private String creatorUsername;

    private MultipartFile poster;

}