package com.pwgp.blog.mapper;

import com.pwgp.blog.dto.user.UserRequest;
import com.pwgp.blog.dto.user.UserResponse;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserResponse create(UserRequest userRequest) {
        User user = modelMapper.map(userRequest, User.class);
        return modelMapper.map(userService.create(user), UserResponse.class);
    }

    public UserResponse findByUsername(String username) {
        return modelMapper.map(userService.findByUsername(username), UserResponse.class);
    }
}
