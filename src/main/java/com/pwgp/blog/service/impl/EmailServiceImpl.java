package com.pwgp.blog.service.impl;

import com.pwgp.blog.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    @Override
    public void sendEmail(String to, String subject, String body) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body, false);
        javaMailSender.send(mimeMessage);
    }

    @Override
    public void sendVerificationToken(String to, String token) throws MessagingException {
        String confirmationUrl = "/registration?confirmToken=" + token;
        String message = "http://localhost:8080" + confirmationUrl;
        sendEmail(to, "registration", message);
    }
}
