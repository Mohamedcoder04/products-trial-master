package com.product.trial.master.mapper;

import com.product.trial.master.dtos.ListEnvieDto;
import com.product.trial.master.entities.ListEnvie;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListEnvieMapper {


    private final UserMapper userMapper;
    private final ProductMapper productMapper;


    public ListEnvieDto toDto(ListEnvie entity) {
        return ListEnvieDto.builder()
                .userDto(userMapper.toDto(entity.getUser()))
                .productsDtos(entity.getProducts().stream().map(productMapper::toDto).toList())
                .build();
    }

}
