package com.pwgp.blog.service;

import com.pwgp.blog.entity.User;

public interface UserService {
    User create(User user);
    User findByUsername(String username);
}
