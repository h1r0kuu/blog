package com.pwgp.blog.dto.auth;

import com.pwgp.blog.annotations.ImageValidation;
import com.pwgp.blog.constants.ErrorMessage;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class RegistrationRequest {

    @Size(min = 3, max = 20, message = ErrorMessage.USERNAME_LENGTH_MESSAGE)
    @Pattern(regexp = "^[a-zA-Z0-9_-]+$", message = ErrorMessage.USERNAME_FORMAT_MESSAGE)
    private String username;
    private String password;
    @Email(message = ErrorMessage.EMAIL_NOT_VALID)
    private String email;
    @ImageValidation
    private MultipartFile avatar;
}
