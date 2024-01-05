package com.pwgp.blog.service;

import com.pwgp.blog.dto.auth.RestorePasswordRequest;
import com.pwgp.blog.dto.settings.ChangeGeneralSettingsRequest;
import com.pwgp.blog.dto.settings.ChangePasswordRequest;
import com.pwgp.blog.entity.User;

public interface UserService {
    User create(User user);
    <T> T findByUsername(String username, Class<T> type);
    String updatePassword(ChangePasswordRequest changePasswordRequest);
    String changeGeneralSettings(ChangeGeneralSettingsRequest changeGeneralSettingsRequest);
    String restorePassword(RestorePasswordRequest restorePasswordRequest);
}
