package com.pwgp.blog.service;

import com.pwgp.blog.dto.email.EmailRequest;
import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmail(EmailRequest request) throws MessagingException;
    void sendVerificationCode(String to, String token) throws MessagingException;
    void sendRestoreLink(String to) throws MessagingException;
}