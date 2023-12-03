package com.pwgp.blog.constants;

public final class AppConstants {
    private AppConstants() {
        throw new AssertionError(String.format(ErrorMessage.INSTANTIATION_ERROR_MESSAGE, AppConstants.class.getSimpleName()));
    }

    public static final String AUTHORIZATION = "Authorization";
    public static final String BEARER = "Bearer ";

    public static final Long MAX_FILE_SIZE = 5L;

    public static final String MAIL_VERIFICATION_SUBJECT = "Email Verification";
    public static final String MAIL_VERIFICATION_TEMPLATE = "mail/verification-code-template.html";

    public static final String DEFAULT_PROFILE_AVATAR = "https://firebasestorage.googleapis.com/v0/b/blog-df8b6.appspot.com/o/default-avatar-icon-of-social-media-user-vector.jpg?alt=media";
}
