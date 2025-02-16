package com.product.trial.master.services;

import com.product.trial.master.dtos.UserDto;

public interface IUserService {

    UserDto findUserById(Long id);

}
