package com.pwgp.blog.handler;

import com.pwgp.blog.dto.error.ErrorResponse;
import com.pwgp.blog.exception.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        ErrorResponse response = new ErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND.value());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler({UserAlreadyExistException.class, EmailAlreadyTakenException.class, EmailAlreadyVerifiedException.class})
    public ResponseEntity<ErrorResponse> handleConflict(RuntimeException ex) {
        ErrorResponse response = new ErrorResponse(ex.getMessage(), HttpStatus.CONFLICT.value());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler({ActivationCodeExpiredException.class, PasswordMismatchException.class})
    public ResponseEntity<ErrorResponse> handleBadRequest(RuntimeException ex) {
        ErrorResponse response = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(JwtAuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleJwtAuthenticationException(JwtAuthenticationException ex) {
        ErrorResponse response = new ErrorResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED.value());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
}
