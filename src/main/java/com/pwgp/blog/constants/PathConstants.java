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

    public static final String API_V1_POSTS = API_V1 + "/posts";
    public static final String POST_BY_ID = "/{post_id}";
    public static final String ALL_POSTS = "/";
    public static final String POST_CREATE = "/create";
    public static final String POST_DELETE = POST_BY_ID + "/delete";
    public static final String POST_UPDATE = POST_BY_ID + "/update";
    public static final String POST_MARK_UPDATE = "/mark/update";
    public static final String SEARCH_POSTS = "/search";

    public static final String API_V1_TAGS = API_V1 + "/tags";
    public static final String ALL_TAGS = "/";

}
