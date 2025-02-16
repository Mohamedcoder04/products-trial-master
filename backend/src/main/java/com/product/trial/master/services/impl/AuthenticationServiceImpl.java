package com.product.trial.master.services.impl;

import com.product.trial.master.dtos.AuthenticationRequest;
import com.product.trial.master.dtos.AuthenticationResponse;
import com.product.trial.master.dtos.RegistrationRequest;
import com.product.trial.master.entities.User;
import com.product.trial.master.exceptions.EmailAlreadyExistsException;
import com.product.trial.master.repositories.UserRepository;
import com.product.trial.master.security.JwtService;
import com.product.trial.master.services.IAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements IAuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public void createAccount(RegistrationRequest dto) {
        userRepository.findByEmail(dto.getEmail()).ifPresent(user -> {
            throw new EmailAlreadyExistsException("User already exists");
        });
        var user = User.builder()
                .firstname(dto.getFirstname())
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .build();
        userRepository.save(user);
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest dto) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()
                )
        );
        var claims = new HashMap<String, Object>();
        var user = (User) auth.getPrincipal();
        claims.put("name", user.getFirstname());
        claims.put("email", user.getEmail());
        claims.put("userId", user.getId());
        var jwtToken = jwtService.generateToken(claims, user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
