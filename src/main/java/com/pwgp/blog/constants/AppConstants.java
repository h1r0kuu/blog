package com.pwgp.blog.constants;

public final class AppConstants {
    private AppConstants() {
        throw new AssertionError(String.format(ErrorMessage.INSTANTIATION_ERROR_MESSAGE, AppConstants.class.getSimpleName()));
    }

    public static final String AUTHORIZATION = "Authorization";
    public static final String BEARER = "Bearer ";
}
