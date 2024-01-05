package com.pwgp.blog.service.impl;

import com.pwgp.blog.dto.auth.AuthRequest;
import com.pwgp.blog.dto.auth.JwtResponse;
import com.pwgp.blog.dto.user.UserResponse;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.exception.UsernameNotFoundException;
import com.pwgp.blog.repository.UserRepository;
import com.pwgp.blog.security.jwt.JwtUtils;
import com.pwgp.blog.service.AuthenticationService;
import com.pwgp.blog.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import static com.pwgp.blog.constants.ErrorMessage.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    private HttpServletRequest getRequest() {
        RequestAttributes attribs = RequestContextHolder.getRequestAttributes();
        assert attribs != null;
        return ((ServletRequestAttributes) attribs).getRequest();
    }

    private boolean isAuthed() {
        HttpServletRequest request = getRequest();
        String jwt = jwtUtils.extractTokenFromRequest(request);
        return jwt != null;
    }

    @Override
    public String getAuthenticatedUserUsername() {
        if(isAuthed()) {
            HttpServletRequest request = getRequest();
            String jwt = jwtUtils.extractTokenFromRequest(request);
            return jwtUtils.getUserNameFromJwtToken(jwt);
        } else {
            return null;
        }
    }

    @Override
    public User getAuthenticatedUser() {
        if(isAuthed()) {
            return userRepository.findByUsername(getAuthenticatedUserUsername(), User.class).orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND));
        } else {
            return null;
        }
    }

    @Override
    public JwtResponse login(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        User user = (User) authentication.getPrincipal();
        return new JwtResponse(jwt, modelMapper.map(user, UserResponse.class));
    }

    @Override
    public JwtResponse refresh() {
        User authUser = getAuthenticatedUser();
        String newJwt = jwtUtils.generateJwtToken(authUser);
        return new JwtResponse(newJwt, modelMapper.map(authUser, UserResponse.class));
    }
}
