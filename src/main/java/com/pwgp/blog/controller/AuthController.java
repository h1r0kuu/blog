package com.pwgp.blog.controller;

import com.pwgp.blog.dto.auth.AuthRequest;
import com.pwgp.blog.dto.auth.JwtResponse;
import com.pwgp.blog.dto.auth.RegistrationRequest;
import com.pwgp.blog.mapper.UserMapper;
import com.pwgp.blog.service.AuthenticationService;
import com.pwgp.blog.service.VerificationTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Auth Controller")
public class AuthController {

    private final UserMapper userMapper;
    private final VerificationTokenService tokenService;
    private final AuthenticationService authenticate;

    @Operation(summary = "User Login")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful login"),
        @ApiResponse(responseCode = "401", description = "Invalid credentials"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(LOGIN)
    public ResponseEntity<JwtResponse> login(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(authenticate.login(authRequest));
    }

    @Operation(summary = "User Registration")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful registration"),
        @ApiResponse(responseCode = "400", description = "Bad Request"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(REGISTRATION)
    public ResponseEntity<?> register(@Valid @ModelAttribute RegistrationRequest registrationRequest) {
        userMapper.create(registrationRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Verify Registration Token")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Token verification successful"),
        @ApiResponse(responseCode = "400", description = "Invalid token"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(REGISTRATION_VERIFICATION_TOKEN)
    public ResponseEntity<?> verifyRegistrationToken(@PathVariable("token") String token) {
        tokenService.verify(token);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "Resend Verification Token")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Token resent successfully"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(RESEND_VERIFICATION_TOKEN)
    public String resendActivationCode() throws MessagingException {
        tokenService.resendToken();
        return "OK";
    }
}