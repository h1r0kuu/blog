package com.pwgp.blog.service.impl;

import com.pwgp.blog.constants.ErrorMessage;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.entity.VerificationToken;
import com.pwgp.blog.exception.EmailAlreadyVerifiedException;
import com.pwgp.blog.repository.UserRepository;
import com.pwgp.blog.repository.VerificationTokenRepository;
import com.pwgp.blog.service.AuthenticationService;
import com.pwgp.blog.service.EmailService;
import com.pwgp.blog.service.VerificationTokenService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VerificationTokenServiceImpl implements VerificationTokenService {

    private final VerificationTokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final AuthenticationService authenticationService;

    @Override
    public VerificationToken create(VerificationToken token) {
        return tokenRepository.save(token);
    }

    @Override
    public void verify(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);
        if(verificationToken.isExpired()) {
            throw new RuntimeException("Token is expired");
        }
        User unverifiedUser = verificationToken.getUser();
        unverifiedUser.setIsEmailVerified(true);
        userRepository.save(unverifiedUser);
    }

    @Override
    public void resendToken() throws MessagingException {
        User user = authenticationService.getAuthenticatedUser();
        VerificationToken verificationToken = user.getVerificationToken();

        if(user.getIsEmailVerified()) {
            throw new EmailAlreadyVerifiedException(ErrorMessage.EMAIL_HAS_ALREADY_BEEN_VERIFIED);
        }

        if(verificationToken.isExpired()) {
            verificationToken.newToken();
        }

        tokenRepository.save(verificationToken);
        emailService.sendVerificationCode(user.getEmail(), verificationToken.getToken());
    }
}
