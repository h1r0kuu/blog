package com.pwgp.blog.controller;

import com.pwgp.blog.dto.auth.AuthRequest;
import com.pwgp.blog.dto.auth.JwtResponse;
import com.pwgp.blog.dto.auth.RegistrationRequest;
import com.pwgp.blog.mapper.UserMapper;
import com.pwgp.blog.service.AuthenticationService;
import com.pwgp.blog.service.VerificationTokenService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pwgp.blog.constants.PathConstants.*;


@RestController
@RequestMapping(API_V1_AUTH)
@RequiredArgsConstructor
public class AuthController {

    private final UserMapper userMapper;
    private final VerificationTokenService tokenService;
    private final AuthenticationService authenticate;

    @PostMapping(LOGIN)
    public ResponseEntity<JwtResponse> login(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(authenticate.login(authRequest));
    }

    @PostMapping(REGISTRATION)
    public ResponseEntity<?> register(@Valid @ModelAttribute RegistrationRequest registrationRequest) {
        userMapper.create(registrationRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping(REGISTRATION_VERIFICATION_TOKEN)
    public ResponseEntity<?> verifyRegistrationToken(@PathVariable("token") String token) {
        tokenService.verify(token);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping(RESEND_VERIFICATION_TOKEN)
    public String resendActivationCode() throws MessagingException {
        tokenService.resendToken();
        return "OK";
    }
}