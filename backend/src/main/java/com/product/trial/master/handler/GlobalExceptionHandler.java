package com.product.trial.master.handler;

import com.product.trial.master.dtos.ErrorResponse;
import com.product.trial.master.exceptions.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    private static final String BAD_CREDENTIALS = "Login and / or password is incorrect";
    public static final String INTERNAL_ERROR_CONTACT_THE_ADMIN = "Internal error, contact the admin";

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleException(AccessDeniedException e) {
        log.error("Accès refusé: {}", e.getMessage());
        return ResponseEntity
                .status(FORBIDDEN)
                .body(
                        ErrorResponse.builder()
                                .time(new Date())
                                .message(e.getMessage())
                                .httpStatus(FORBIDDEN)
                                .build()
                );

    }

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<ErrorResponse> lockedException() {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                        ErrorResponse.builder()
                                .time(new Date())
                                .httpStatus(UNAUTHORIZED)
                                .build()
                );
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ErrorResponse> disabledException() {
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .time(new Date())
                                .httpStatus(BAD_REQUEST)
                                .build()
                );
    }

    @ExceptionHandler(TokenInvalidException.class)
    public ResponseEntity<ErrorResponse> handleException(TokenInvalidException exp) {
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .time(new Date())
                                .httpStatus(BAD_REQUEST)
                                .message(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(ProductNotFoundException exp) {
        return ResponseEntity
                .status(NOT_FOUND)
                .body(
                        ErrorResponse.builder()
                                .time(new Date())
                                .httpStatus(NOT_FOUND)
                                .message(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(ProductAlreadyExist.class)
    public ResponseEntity<ErrorResponse> handleException(ProductAlreadyExist exp) {
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .time(new Date())
                                .httpStatus(BAD_REQUEST)
                                .message(exp.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(UserNotFoundException e) {
        return ResponseEntity
                .status(NOT_FOUND)
                .body(
                        ErrorResponse.builder()
                                .time(new Date())
                                .httpStatus(NOT_FOUND)
                                .message(e.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleException(BadCredentialsException exp) {
        return ResponseEntity
                .status(UNAUTHORIZED)
                .body(
                        ErrorResponse.builder()
                                .time(new Date())
                                .httpStatus(UNAUTHORIZED)
                                .message(BAD_CREDENTIALS)
                                .build()
                );
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> emailExistException(EmailAlreadyExistsException e) {
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .time(new Date())
                                .message(e.getMessage())
                                .httpStatus(BAD_REQUEST)
                                .build()
                )
                ;
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> emailExistException(UsernameNotFoundException e) {
        return ResponseEntity
                .status(NOT_FOUND)
                .body(
                        ErrorResponse.builder()
                                .time(new Date())
                                .message(e.getMessage())
                                .httpStatus(NOT_FOUND)
                                .build()
                )
                ;
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleException(MethodArgumentNotValidException exp) {
        Set<String> errors = new HashSet<>();
        exp.getBindingResult().getAllErrors()
                .forEach(err -> {
                    var errMessage = err.getDefaultMessage();
                    errors.add(errMessage);
                });
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(
                        ErrorResponse.builder()
                                .time(new Date())
                                .httpStatus(BAD_REQUEST)
                                .validationErrors(errors)
                                .build()
                );
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception exp) {
        exp.printStackTrace();
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(
                        ErrorResponse.builder()
                                .message(INTERNAL_ERROR_CONTACT_THE_ADMIN)
                                .time(new Date())
                                .httpStatus(INTERNAL_SERVER_ERROR)
                                .build()
                );
    }


}
