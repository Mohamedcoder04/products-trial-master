package com.product.trial.master.mapper;

import com.product.trial.master.dtos.UserDto;
import com.product.trial.master.entities.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public User toEntity(UserDto dto) {
        return User.builder()
                .id(dto.getId() != null ? dto.getId() : null)
                .email(dto.getEmail())
                .username(dto.getUsername())
                .firstname(dto.getFirstname())
                .build();
    }

    public UserDto toDto(User entity) {
        return UserDto.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .username(entity.getUsername())
                .firstname(entity.getFirstname())
                .build();
    }

}
