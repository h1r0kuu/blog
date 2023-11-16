package com.pwgp.blog.service;

import com.pwgp.blog.entity.VerificationToken;

public interface VerificationTokenService {
    VerificationToken create(VerificationToken token);
    void verify(String token);
}
