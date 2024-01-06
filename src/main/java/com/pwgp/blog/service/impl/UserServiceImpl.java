package com.pwgp.blog.service.impl;

import com.pwgp.blog.constants.AppConstants;
import com.pwgp.blog.constants.ErrorMessage;
import com.pwgp.blog.dto.auth.RestorePasswordRequest;
import com.pwgp.blog.dto.settings.ChangeGeneralSettingsRequest;
import com.pwgp.blog.dto.settings.ChangePasswordRequest;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.event.OnRegistrationCompleteEvent;
import com.pwgp.blog.exception.EmailAlreadyTakenException;
import com.pwgp.blog.exception.PasswordMismatchException;
import com.pwgp.blog.exception.UserAlreadyExistException;
import com.pwgp.blog.exception.UsernameNotFoundException;
import com.pwgp.blog.repository.UserRepository;
import com.pwgp.blog.service.AuthenticationService;
import com.pwgp.blog.service.ImageService;
import com.pwgp.blog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.pwgp.blog.constants.ErrorMessage.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher eventPublisher;
    private final AuthenticationService authenticationService;
    private final ImageService imageService;

    @Override
    public User create(User user) {

        if(userRepository.isUserExistByUsername(user.getUsername())) {
            throw new UserAlreadyExistException(USERNAME_HAS_ALREADY_BEEN_TAKEN);
        }

        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new EmailAlreadyTakenException(EMAIL_HAS_ALREADY_BEEN_TAKEN);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User createdUser = userRepository.save(user);

        eventPublisher.publishEvent(new OnRegistrationCompleteEvent(createdUser));

        return createdUser;
    }

    @Override
    public <T> T findByUsername(String username, Class<T> type) {
        return userRepository.findByUsername(username, type).orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND));
    }

    @Override
    @Transactional
    public String updatePassword(ChangePasswordRequest changePasswordRequest) {
        User user = authenticationService.getAuthenticatedUser();
        String newPassword = changePasswordRequest.getNewPassword();
        if(!newPassword.equals(changePasswordRequest.getConfirmPassword())) {
            throw new PasswordMismatchException(PASSWORD_MISMATCH_MESSAGE);
        }
        if(!passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
            throw new PasswordMismatchException(PASSWORD_MISMATCH_MESSAGE);
        }
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        userRepository.updatePassword(user.getUsername(), encodedNewPassword);
        return "Updated";
    }

    @Override
    @Transactional
    public String changeGeneralSettings(ChangeGeneralSettingsRequest request) {
        User user = authenticationService.getAuthenticatedUser();
        if(userRepository.isUserExistByEmail(request.getEmail()) && !user.getEmail().equals(request.getEmail())) {
            throw new EmailAlreadyTakenException(EMAIL_HAS_ALREADY_BEEN_TAKEN);
        }
        if(userRepository.isUserExistByUsername(request.getUsername()) && !user.getUsername().equals(request.getUsername())) {
            throw new UserAlreadyExistException(USERNAME_HAS_ALREADY_BEEN_TAKEN);
        }

        String newAvatar = request.getAvatar() != null ? imageService.upload(request.getAvatar()) : user.getAvatar();
        String newCover = request.getCover() != null ? imageService.upload(request.getCover()) : user.getCover();
        userRepository.updateGeneralSettings(user.getId(), request.getUsername(), request.getAbout(), request.getEmail(), newAvatar, newCover);
        return "a";
    }

    @Override
    public String restorePassword(RestorePasswordRequest restorePasswordRequest) {
        return null;
    }
}
