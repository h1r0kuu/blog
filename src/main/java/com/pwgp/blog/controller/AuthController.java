package com.pwgp.blog.controller;

import com.pwgp.blog.dto.auth.AuthRequest;
import com.pwgp.blog.dto.auth.RegistrationRequest;
import com.pwgp.blog.mapper.UserMapper;
import com.pwgp.blog.service.VerificationTokenService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class AuthController {

    private final UserMapper userMapper;
    private final VerificationTokenService tokenService;

    @GetMapping("/registration")
    public String registerPage(@RequestParam(value = "confirmToken", required = false) String confirmToken, Model model) {
        model.addAttribute("user", new RegistrationRequest());
        if(confirmToken != null) {
            tokenService.verify(confirmToken);
        }
        return "auth/registration";
    }

    @GetMapping("/login")
    public String loginPage(Model model) {
        model.addAttribute("auth", new AuthRequest());
        return "auth/login";
    }

    @PostMapping("/registration")
    public String register(@ModelAttribute("user") @Valid RegistrationRequest registrationRequest) {
        userMapper.create(registrationRequest);
        return "redirect:/";
    }

    @PostMapping("/refresh-token")
    public String refreshVerificationToken(@RequestParam(value = "confirmToken", required = false) String expiredToken) throws MessagingException {
        tokenService.refreshToken(expiredToken);
        return "redirect:/";
    }
}