package com.pwgp.blog.service.impl;

import com.pwgp.blog.dto.auth.AuthRequest;
import com.pwgp.blog.dto.auth.JwtResponse;
import com.pwgp.blog.dto.user.UserResponse;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.exception.UsernameNotFoundException;
import com.pwgp.blog.repository.UserRepository;
import com.pwgp.blog.security.jwt.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceImplTest {

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private UserRepository userRepository;

    @Mock
    private HttpServletRequest httpServletRequest;

    @Test
    public void getAuthenticatedUserUsername_ShouldReturnUsername_WhenAuthenticated() {
        when(jwtUtils.extractTokenFromRequest(httpServletRequest)).thenReturn("fakeJwtToken");
        when(jwtUtils.getUserNameFromJwtToken("fakeJwtToken")).thenReturn("testUser");

        String result = authenticationService.getAuthenticatedUserUsername();

        assertEquals("testUser", result);
        verify(jwtUtils, times(1)).extractTokenFromRequest(httpServletRequest);
        verify(jwtUtils, times(1)).getUserNameFromJwtToken("fakeJwtToken");
    }

    @Test
    public void getAuthenticatedUserUsername_ShouldReturnNull_WhenNotAuthenticated() {
        when(jwtUtils.extractTokenFromRequest(httpServletRequest)).thenReturn(null);

        String result = authenticationService.getAuthenticatedUserUsername();

        assertEquals(null, result);
        verify(jwtUtils, times(1)).extractTokenFromRequest(httpServletRequest);
        verify(jwtUtils, times(0)).getUserNameFromJwtToken(anyString());
    }

    @Test
    public void login_ShouldReturnJwtResponse_WhenAuthenticationSuccessful() {
        AuthRequest authRequest = new AuthRequest("testUser", "testPassword");
        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(jwtUtils.generateJwtToken(authentication)).thenReturn("fakeJwtToken");
        User user = mock(User.class);
        when(authentication.getPrincipal()).thenReturn(user);
        JwtResponse expectedJwtResponse = new JwtResponse("fakeJwtToken", new UserResponse());
        when(modelMapper.map(user, UserResponse.class)).thenReturn(new UserResponse());

        JwtResponse result = authenticationService.login(authRequest);

        assertEquals(expectedJwtResponse, result);
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtUtils, times(1)).generateJwtToken(authentication);
        verify(modelMapper, times(1)).map(user, UserResponse.class);
    }
}