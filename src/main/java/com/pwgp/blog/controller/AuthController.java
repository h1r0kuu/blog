package com.pwgp.blog.controller;

import com.pwgp.blog.dto.auth.AuthRequest;
import com.pwgp.blog.dto.auth.JwtResponse;
import com.pwgp.blog.dto.auth.RegistrationRequest;
import com.pwgp.blog.dto.user.UserResponse;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.mapper.UserMapper;
import com.pwgp.blog.security.jwt.JwtUtils;
import com.pwgp.blog.service.VerificationTokenService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserMapper userMapper;
    private final VerificationTokenService tokenService;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper modelMapper;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        User user = (User) authentication.getPrincipal();

        return ResponseEntity.status(HttpStatus.OK)
                .body(JwtResponse.builder()
                        .jwt(jwt)
                        .user(modelMapper.map(user, UserResponse.class)).build());
    }

    @PostMapping(value = "/registration")
    public String register(@Valid @ModelAttribute RegistrationRequest registrationRequest,
                           @RequestParam(value = "confirmToken", required = false) String token) {
        userMapper.create(registrationRequest);
        if(token != null) {
            tokenService.verify(token);
        }
        return "OK";
    }

    @PostMapping("/refresh-token")
    public String refreshVerificationToken(@RequestParam(value = "confirmToken", required = false) String expiredToken) throws MessagingException {
        tokenService.refreshToken(expiredToken);
        return "OK";
    }
}