package com.pwgp.blog.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class RegistrationRequest {

    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_-]+$", message = "Username must contain only letters, numbers, underscores, or hyphens")
    private String username;
    private String password;
    @Email(message = "Invalid email format")
    private String email;
    private MultipartFile avatar;
}
