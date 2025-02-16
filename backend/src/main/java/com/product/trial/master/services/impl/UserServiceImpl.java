package com.product.trial.master.services.impl;

import com.product.trial.master.dtos.UserDto;
import com.product.trial.master.entities.User;
import com.product.trial.master.exceptions.UserNotFoundException;
import com.product.trial.master.mapper.UserMapper;
import com.product.trial.master.repositories.UserRepository;
import com.product.trial.master.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDto findUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UserNotFoundException("User with id " + id + " not found")
        );
        return userMapper.toDto(user);
    }
}
