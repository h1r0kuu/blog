package com.pwgp.blog.dto.settings;

import com.pwgp.blog.annotations.ImageValidation;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ChangeGeneralSettingsRequest {
    private String username;
    private String email;
    private String about;
    @ImageValidation
    private MultipartFile avatar;
    @ImageValidation
    private MultipartFile cover;
}
