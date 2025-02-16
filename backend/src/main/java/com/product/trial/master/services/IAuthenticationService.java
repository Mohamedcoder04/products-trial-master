package com.product.trial.master.services;

import com.product.trial.master.dtos.AuthenticationRequest;
import com.product.trial.master.dtos.AuthenticationResponse;
import com.product.trial.master.dtos.RegistrationRequest;

public interface IAuthenticationService {

    void createAccount(RegistrationRequest dto);

    AuthenticationResponse authenticate(AuthenticationRequest dto);

}
