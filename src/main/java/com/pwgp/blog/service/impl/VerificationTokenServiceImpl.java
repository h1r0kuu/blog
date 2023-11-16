package com.pwgp.blog.service.impl;

import com.pwgp.blog.entity.User;
import com.pwgp.blog.entity.VerificationToken;
import com.pwgp.blog.repository.UserRepository;
import com.pwgp.blog.repository.VerificationTokenRepository;
import com.pwgp.blog.service.VerificationTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VerificationTokenServiceImpl implements VerificationTokenService {

    private final VerificationTokenRepository tokenRepository;
    private final UserRepository userRepository;

    @Override
    public VerificationToken create(VerificationToken token) {
        return tokenRepository.save(token);
    }

    @Override
    public void verify(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);
        User unverifiedUser = verificationToken.getUser();
        unverifiedUser.setEnabled(true);
        userRepository.save(unverifiedUser);
    }
}
