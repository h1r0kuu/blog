package com.pwgp.blog.dto.settings;

import lombok.Data;

@Data
public class ChangeGeneralSettingsRequest {
    private String username;
    private String email;
}
