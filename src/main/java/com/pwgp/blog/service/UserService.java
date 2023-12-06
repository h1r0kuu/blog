package com.pwgp.blog.service;

import com.pwgp.blog.dto.settings.ChangeGeneralSettingsRequest;
import com.pwgp.blog.dto.settings.ChangePasswordRequest;
import com.pwgp.blog.entity.User;

public interface UserService {
    User create(User user);
    User findByUsername(String username);
    String updatePassword(ChangePasswordRequest changePasswordRequest);
    String changeGeneralSettings(ChangeGeneralSettingsRequest changeGeneralSettingsRequest);
}
