package com.pwgp.blog.controller;

import com.pwgp.blog.entity.User;
import com.pwgp.blog.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserMapper userMapper;

    @GetMapping("/users/{username}")
    public String getUser(@PathVariable("username") String username, Model model) {
        model.addAttribute("user", userMapper.findByUsername(username));
        return "user_page";
    }
}
