package com.product.trial.master.mapper;

import com.product.trial.master.dtos.PanierDto;
import com.product.trial.master.entities.Panier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PanierMapper {


    private final UserMapper userMapper;
    private final ProductMapper productMapper;


    public PanierDto toDto(Panier entity) {
        return PanierDto.builder()
                .userDto(userMapper.toDto(entity.getUser()))
                .productsDtos(entity.getProducts().stream().map(productMapper::toDto).toList())
                .build();
    }

}
