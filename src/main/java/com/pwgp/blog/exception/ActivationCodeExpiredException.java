package com.pwgp.blog.exception;

public class ActivationCodeExpiredException extends RuntimeException {
    public ActivationCodeExpiredException(String message) {
        super(message);
    }
}
