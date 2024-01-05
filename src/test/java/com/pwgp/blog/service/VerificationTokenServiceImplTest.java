package com.pwgp.blog.service;

import com.pwgp.blog.entity.User;
import com.pwgp.blog.entity.VerificationToken;
import com.pwgp.blog.exception.EmailAlreadyVerifiedException;
import com.pwgp.blog.repository.UserRepository;
import com.pwgp.blog.repository.VerificationTokenRepository;
import com.pwgp.blog.service.AuthenticationService;
import com.pwgp.blog.service.EmailService;
import com.pwgp.blog.service.impl.VerificationTokenServiceImpl;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class VerificationTokenServiceImplTest {

    @InjectMocks
    private VerificationTokenServiceImpl verificationTokenService;

    @Mock
    private VerificationTokenRepository tokenRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private AuthenticationService authenticationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateToken() {
        when(tokenRepository.save(any(VerificationToken.class))).thenReturn(new VerificationToken());

        VerificationToken result = verificationTokenService.create(new VerificationToken());

        assertNotNull(result);
    }

    @Test
    public void testVerifyToken() {
        VerificationToken mockToken = new VerificationToken();
        when(tokenRepository.findByToken(any(String.class))).thenReturn(mockToken);

        when(mockToken.isExpired()).thenReturn(false);

        when(userRepository.save(any(User.class))).thenReturn(new User());

        assertDoesNotThrow(() -> verificationTokenService.verify("test-token"));
    }

    @Test
    public void testResendToken() throws MessagingException {
        when(authenticationService.getAuthenticatedUser()).thenReturn(new User());

        when(userRepository.save(any(User.class))).thenReturn(new User());

        doNothing().when(emailService).sendVerificationCode(any(String.class), any(String.class));

        assertDoesNotThrow(() -> verificationTokenService.resendToken());
    }

    @Test
    public void testResendTokenEmailAlreadyVerified() throws MessagingException {
        User user = new User();
        user.setIsEmailVerified(true);
        when(authenticationService.getAuthenticatedUser()).thenReturn(user);

        assertThrows(EmailAlreadyVerifiedException.class, () -> verificationTokenService.resendToken());
    }
}
