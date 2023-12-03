package com.pwgp.blog.service.impl;

import com.pwgp.blog.constants.AppConstants;
import com.pwgp.blog.constants.PathConstants;
import com.pwgp.blog.dto.email.EmailRequest;
import com.pwgp.blog.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine thymeleafTemplateEngine;

    @Value("${spring.mail.username}")
    private String from;

    @Override
    public void sendEmail(EmailRequest request) throws MessagingException {
        Context thymeleafContext = new Context();
        thymeleafContext.setVariables(request.getVariables());
        String htmlBody = thymeleafTemplateEngine.process(request.getTemplate(), thymeleafContext);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

        message.setFrom(from);
        message.setTo(request.getTo());
        message.setSubject(request.getSubject());
        message.setText(htmlBody, true);
        javaMailSender.send(mimeMessage);
    }

    @Override
    public void sendVerificationCode(String to, String token) throws MessagingException {
        String confirmationUrl = PathConstants.API_V1_AUTH + PathConstants.REGISTRATION_VERIFICATION_TOKEN.replace("{token}", token);
        String message = "http://localhost:8080" + confirmationUrl;
        EmailRequest email = EmailRequest.builder()
                .to(to)
                .subject(AppConstants.MAIL_VERIFICATION_SUBJECT)
                .template(AppConstants.MAIL_VERIFICATION_TEMPLATE)
                .variables(Map.of(
                        "verificationUrl", message
                ))
                .build();

        sendEmail(email);
    }
}
