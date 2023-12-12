package com.pwgp.blog.constants;

import com.pwgp.blog.dto.settings.ChangeGeneralSettingsRequest;
import com.pwgp.blog.entity.User;

public class TestConstants {

    public static final String USERNAME = "john_doe";
    public static final String PASSWORD = "password123";
    public static final String NEW_PASSWORD = "newPassword456";
    public static final String MISMATCHED_PASSWORD = "mismatchedPassword789";
    public static final String ENCODED_PASSWORD = "$2a$10$encodedPasswordHash"; // replace with an actual hash
    public static final String ENCODED_NEW_PASSWORD = "$2a$10$encodedNewPasswordHash"; // replace with an actual hash
    public static final Long USER_ID = 1L;

    public static User createUser() {
        User user = new User();
        user.setId(USER_ID);
        user.setUsername(USERNAME);
        user.setPassword(ENCODED_PASSWORD);
        // Add more fields if needed
        return user;
    }

    public static ChangeGeneralSettingsRequest createChangeGeneralSettingsRequest() {
        ChangeGeneralSettingsRequest request = new ChangeGeneralSettingsRequest();
        // Set fields in the request as needed for testing
        return request;
    }

    // Add more constants or methods as needed
}
