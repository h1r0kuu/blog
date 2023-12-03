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
    public static final String RESET_VERIFICATION_TOKEN = REGISTRATION + "/token/{token}/reset";

    public static final String API_V1_USERS = API_V1 + "/users";
    public static final String USERNAME = "/{username}";
}
