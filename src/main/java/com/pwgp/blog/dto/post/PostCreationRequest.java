package com.pwgp.blog.dto.post;

import com.pwgp.blog.entity.Category;
import com.pwgp.blog.entity.Mark;
import com.pwgp.blog.entity.Tag;
import com.pwgp.blog.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
public class PostCreationRequest {

    @Size(min = 4, message = "Post title must be at least 4 characters long")
    private String title;

    @Size(max = 10000, message = "Post body can't be longer than 10000 characters")
    private String body;

    private Category category;
    private Set<Tag> tags;
    private User creator;
    private MultipartFile poster;
}