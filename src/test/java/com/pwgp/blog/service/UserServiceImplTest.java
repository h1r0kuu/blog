package com.pwgp.blog.service;

import com.pwgp.blog.constants.AppConstants;
import com.pwgp.blog.constants.TestConstants;
import com.pwgp.blog.dto.settings.ChangePasswordRequest;
import com.pwgp.blog.entity.Follow;
import com.pwgp.blog.entity.Post;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.entity.VerificationToken;
import com.pwgp.blog.event.OnRegistrationCompleteEvent;
import com.pwgp.blog.exception.EmailAlreadyTakenException;
import com.pwgp.blog.exception.PasswordMismatchException;
import com.pwgp.blog.exception.UserAlreadyExistException;
import com.pwgp.blog.exception.UsernameNotFoundException;
import com.pwgp.blog.repository.UserRepository;
import com.pwgp.blog.service.impl.UserServiceImpl;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {
    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private ApplicationEventPublisher eventPublisher;

    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private ImageService imageService;

    @Test
    public void create_ShouldCreateUser() {
        User user = TestConstants.createUser();
        when(userRepository.isUserExistByUsername(user.getUsername())).thenReturn(false);
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(user.getPassword())).thenReturn(TestConstants.ENCODED_PASSWORD);
        when(userRepository.save(user)).thenReturn(user);

        User createdUser = userService.create(user);

        assertEquals(user, createdUser);
        verify(userRepository, times(1)).isUserExistByUsername(user.getUsername());
        verify(userRepository, times(1)).findByEmail(user.getEmail());
        verify(passwordEncoder, times(1)).encode(user.getPassword());
        verify(userRepository, times(1)).save(user);
        verify(eventPublisher, times(1)).publishEvent(any(OnRegistrationCompleteEvent.class));
    }

    @Test
    public void create_ShouldThrowUserAlreadyExistException_WhenUsernameTaken() {
        User user = TestConstants.createUser();
        when(userRepository.isUserExistByUsername(user.getUsername())).thenReturn(true);

        assertThrows(UserAlreadyExistException.class, () -> userService.create(user));
        verify(userRepository, times(1)).isUserExistByUsername(user.getUsername());
        verify(userRepository, times(1)).findByEmail(user.getEmail());
        verify(passwordEncoder, times(1)).encode(user.getPassword());
        verify(userRepository, times(1)).save(user);
        verify(eventPublisher, times(1)).publishEvent(any(OnRegistrationCompleteEvent.class));
    }

    @Test
    public void create_ShouldThrowEmailAlreadyTakenException_WhenEmailTaken() {
        User user = TestConstants.createUser();
        when(userRepository.isUserExistByUsername(user.getUsername())).thenReturn(false);
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        assertThrows(EmailAlreadyTakenException.class, () -> userService.create(user));
        verify(userRepository, times(1)).isUserExistByUsername(user.getUsername());
        verify(userRepository, times(1)).findByEmail(user.getEmail());
        verify(passwordEncoder, times(1)).encode(user.getPassword());
        verify(userRepository, times(1)).save(user);
        verify(eventPublisher, times(1)).publishEvent(any(OnRegistrationCompleteEvent.class));
    }

    @Test
    public void findByUsername_ShouldReturnUser() {
        User user = TestConstants.createUser();
        when(userRepository.findByUsername(user.getUsername(), User.class)).thenReturn(Optional.of(user));

        User foundUser = userService.findByUsername(user.getUsername(), User.class);

        assertEquals(user, foundUser);
        verify(userRepository, times(1)).findByUsername(user.getUsername(), User.class);
    }

    @Test
    public void findByUsername_ShouldThrowUsernameNotFoundException_WhenUserNotFound() {
        User user = TestConstants.createUser();
        when(userRepository.findByUsername(user.getUsername(), User.class)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.findByUsername(user.getUsername(), User.class));
        verify(userRepository, times(1)).findByUsername(user.getUsername(), User.class);
    }

    @Test
    public void updatePassword_ShouldUpdatePassword() {
        User user = TestConstants.createUser();
        ChangePasswordRequest changePasswordRequest = new ChangePasswordRequest();
        changePasswordRequest.setOldPassword(TestConstants.PASSWORD);
        changePasswordRequest.setNewPassword(TestConstants.NEW_PASSWORD);
        changePasswordRequest.setConfirmPassword(TestConstants.NEW_PASSWORD);

        when(authenticationService.getAuthenticatedUser()).thenReturn(user);
        when(passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())).thenReturn(true);
        when(passwordEncoder.encode(changePasswordRequest.getNewPassword())).thenReturn(TestConstants.ENCODED_NEW_PASSWORD);

        String result = userService.updatePassword(changePasswordRequest);

        assertEquals("Updated", result);
        verify(authenticationService, times(1)).getAuthenticatedUser();
        verify(passwordEncoder, times(1)).matches(changePasswordRequest.getOldPassword(), user.getPassword());
        verify(passwordEncoder, times(1)).encode(changePasswordRequest.getNewPassword());
        verify(userRepository, times(1)).updatePassword(user.getUsername(), TestConstants.ENCODED_NEW_PASSWORD);
    }

    @Test
    public void updatePassword_ShouldThrowPasswordMismatchException_WhenPasswordsDoNotMatch() {
        User user = TestConstants.createUser();
        ChangePasswordRequest changePasswordRequest = new ChangePasswordRequest();
        changePasswordRequest.setOldPassword(TestConstants.PASSWORD);
        changePasswordRequest.setNewPassword(TestConstants.NEW_PASSWORD);
        changePasswordRequest.setConfirmPassword(TestConstants.MISMATCHED_PASSWORD);

        when(authenticationService.getAuthenticatedUser()).thenReturn(user);
        when(passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())).thenReturn(true);

        assertThrows(PasswordMismatchException.class, () -> userService.updatePassword(changePasswordRequest));

        verify(authenticationService, times(1)).getAuthenticatedUser();
        verify(passwordEncoder, times(1)).matches(changePasswordRequest.getOldPassword(), user.getPassword());
        verify(passwordEncoder, times(1)).encode(anyString());
        verify(userRepository, times(1)).updatePassword(anyString(), anyString());
    }
}
