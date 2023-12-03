package com.pwgp.blog.constants;

public final class ErrorMessage {
    private ErrorMessage() {
        throw new AssertionError(String.format(INSTANTIATION_ERROR_MESSAGE, ErrorMessage.class.getSimpleName()));
    }

    public static final String INSTANTIATION_ERROR_MESSAGE = "%s shouldn't be instantiated";

    public static final String USER_NOT_FOUND = "User not found";
    public static final String EMAIL_HAS_ALREADY_BEEN_TAKEN = "Email has already been taken.";
    public static final String EMAIL_HAS_ALREADY_BEEN_VERIFIED = "Email has already been verified";
    public static final String USERNAME_HAS_ALREADY_BEEN_TAKEN = "Username has already been taken.";

// Validation error message constants
    public static final String USERNAME_LENGTH_MESSAGE = "Username must be between 3 and 20 characters";
    public static final String USERNAME_FORMAT_MESSAGE = "Username must contain only letters, numbers, underscores, or hyphens";
    public static final String EMAIL_NOT_VALID = "Please enter a valid email address.";

}
