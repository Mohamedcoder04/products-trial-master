package com.product.trial.master.controllers;

import com.product.trial.master.dtos.AuthenticationRequest;
import com.product.trial.master.dtos.AuthenticationResponse;
import com.product.trial.master.dtos.RegistrationRequest;
import com.product.trial.master.services.IAuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final IAuthenticationService authenticationService;

    @PostMapping("/account")
    public ResponseEntity<?> createAccount(
            @RequestBody @Valid RegistrationRequest registrationRequest
    ) {
        authenticationService.createAccount(registrationRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/token")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody @Valid AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

}
