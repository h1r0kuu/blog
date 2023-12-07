package com.pwgp.blog.service.impl;

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
import com.pwgp.blog.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.pwgp.blog.constants.ErrorMessage.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher eventPublisher;
    private final AuthenticationService authenticationService;

    @Override
    public User create(User user) {

        if(userRepository.isUserExist(user.getUsername())) {
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
    public String changeGeneralSettings(ChangeGeneralSettingsRequest request) {
        User user = authenticationService.getAuthenticatedUser();
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyTakenException(EMAIL_HAS_ALREADY_BEEN_TAKEN);
        }
        if(userRepository.isUserExist(request.getUsername())) {
            throw new RuntimeException("Exc");
        }
        userRepository.generalSettings(user.getId(), request.getUsername(), request.getEmail());
        return null;
    }
}
