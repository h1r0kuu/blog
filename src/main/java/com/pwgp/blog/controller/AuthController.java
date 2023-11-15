package com.pwgp.blog.controller;

import com.pwgp.blog.dto.auth.AuthRequest;
import com.pwgp.blog.dto.user.UserRequest;
import com.pwgp.blog.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class AuthController {

    private final UserMapper userMapper;

    @GetMapping("/registration")
    public String registerPage(Model model) {
        model.addAttribute("user", new UserRequest());
        return "auth/registration";
    }

    @GetMapping("/login")
    public String loginPage(Model model) {
        model.addAttribute("auth", new AuthRequest());
        return "auth/login";
    }

    @PostMapping("/registration")
    public String register(@ModelAttribute("user") UserRequest userRequest) {
        userMapper.create(userRequest);
        return "";
    }
}