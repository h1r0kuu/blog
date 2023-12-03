package com.pwgp.blog.dto.settings;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}
