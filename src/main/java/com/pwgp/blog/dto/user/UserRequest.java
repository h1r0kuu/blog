package com.pwgp.blog.dto.user;

import lombok.Data;

@Data
public class UserRequest {
    private String username;
    private String password;
    private String email;
}
