package com.pwgp.blog.mapper;

import com.pwgp.blog.dto.auth.RegistrationRequest;
import com.pwgp.blog.dto.user.UserResponse;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.service.ImageService;
import com.pwgp.blog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final UserService userService;
    private final ModelMapper modelMapper;
    private final ImageService imageService;

    public UserResponse create(RegistrationRequest registrationRequest) {
        User user = modelMapper.map(registrationRequest, User.class);
        if(registrationRequest.getAvatar() != null) {
            String imageUrl = imageService.upload(registrationRequest.getAvatar());
            user.setAvatar(imageUrl);
        }
        return modelMapper.map(userService.create(user), UserResponse.class);
    }

    public UserResponse findByUsername(String username) {
        return modelMapper.map(userService.findByUsername(username), UserResponse.class);
    }
}
