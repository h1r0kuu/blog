package com.pwgp.blog.service.impl;

import com.pwgp.blog.entity.User;
import com.pwgp.blog.event.OnRegistrationCompleteEvent;
import com.pwgp.blog.exception.EmailAlreadyTakenException;
import com.pwgp.blog.exception.UserAlreadyExistException;
import com.pwgp.blog.exception.UsernameNotFoundException;
import com.pwgp.blog.repository.UserRepository;
import com.pwgp.blog.service.UserService;
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

    @Override
    public User create(User user) {

        if(findByUsername(user.getUsername()) != null) {
            throw new UserAlreadyExistException(USERNAME_HAS_ALREADY_BEEN_TAKEN);
        }

        if(userRepository.findByEmail(user.getEmail()) != null) {
            throw new EmailAlreadyTakenException(EMAIL_HAS_ALREADY_BEEN_TAKEN);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User createdUser = userRepository.save(user);

        eventPublisher.publishEvent(new OnRegistrationCompleteEvent(createdUser));

        return createdUser;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND));
    }
}
