package com.product.trial.master.dtos;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ListEnvieDto {

    private UserDto userDto;
    private List<ProductDto> productsDtos;

}
