package com.pwgp.blog.listener;

import com.pwgp.blog.entity.User;
import com.pwgp.blog.entity.VerificationToken;
import com.pwgp.blog.event.OnRegistrationCompleteEvent;
import com.pwgp.blog.service.EmailService;
import com.pwgp.blog.service.VerificationTokenService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {

    private final EmailService emailService;
    private final VerificationTokenService tokenService;

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        User user = event.getUser();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setUser(user);
        tokenService.create(verificationToken);

        String recipientAddress = user.getEmail();
        String confirmationUrl = "/registration?confirmToken=" + verificationToken.getToken();
        String message = "http://localhost:8080" + confirmationUrl;

        try {
            emailService.sendEmail(recipientAddress, "registration", message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
