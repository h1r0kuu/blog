package com.pwgp.blog.constants;

public final class PathConstants {

    private PathConstants() {
        throw new AssertionError(String.format(ErrorMessage.INSTANTIATION_ERROR_MESSAGE, PathConstants.class.getSimpleName()));
    }

    public static final String API_V1 = "/api/v1";

    public static final String API_V1_AUTH = API_V1 + "/auth";
    public static final String LOGIN ="/login";
    public static final String REGISTRATION ="/registration";
    public static final String REGISTRATION_VERIFICATION_TOKEN = REGISTRATION + "/token/{token}";
    public static final String RESEND_VERIFICATION_TOKEN = REGISTRATION + "/token/resend";

    public static final String API_V1_USERS = API_V1 + "/users";
    public static final String USERNAME = "/{username}";
    public static final String FOLLOW_USER = "/{username}/follow";
    public static final String UNFOLLOW_USER = "/{username}/unfollow";
    public static final String USER_FOLLOWERS = "/{username}/followers";
    public static final String USER_FOLLOWINGS = "/{username}/followings";

    public static final String SETTINGS = "/settings";
    public static final String CHANGE_PASSWORD = SETTINGS + "/password";
    public static final String CHANGE_GENERAL = SETTINGS + "/general";
}
