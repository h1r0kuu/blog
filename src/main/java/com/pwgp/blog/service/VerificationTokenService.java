package com.pwgp.blog.service;

import com.pwgp.blog.entity.VerificationToken;
import jakarta.mail.MessagingException;

public interface VerificationTokenService {
    VerificationToken create(VerificationToken token);
    void verify(String token);
    void resendToken() throws MessagingException;
}