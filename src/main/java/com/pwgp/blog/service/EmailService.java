package com.pwgp.blog.service;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmail(String to, String subject, String body) throws MessagingException;
    void sendVerificationToken(String to, String token) throws MessagingException;
}