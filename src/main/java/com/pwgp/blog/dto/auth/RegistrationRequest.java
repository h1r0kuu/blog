package com.pwgp.blog.dto.auth;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class RegistrationRequest {
    private String username;
    private String password;
    private String email;
    private MultipartFile avatar;
}
