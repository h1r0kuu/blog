package com.pwgp.blog.constants;

public final class ErrorMessage {
    private ErrorMessage() {
        throw new AssertionError(String.format(INSTANTIATION_ERROR_MESSAGE, ErrorMessage.class.getSimpleName()));
    }

    public static final String INSTANTIATION_ERROR_MESSAGE = "%s shouldn't be instantiated";

    public static final String USER_NOT_FOUND = "User not found";
    public static final String EMAIL_HAS_ALREADY_BEEN_TAKEN = "Email has already been taken.";
    public static final String USERNAME_HAS_ALREADY_BEEN_TAKEN = "Username has already been taken.";

    public static final String JWT_TOKEN_EXPIRED = "JWT token is expired or invalid";
}
