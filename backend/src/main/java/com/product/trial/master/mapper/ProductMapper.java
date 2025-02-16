package com.product.trial.master.mapper;

import com.product.trial.master.dtos.ProductDto;
import com.product.trial.master.entities.Product;
import org.springframework.stereotype.Service;

@Service
public class ProductMapper {

    public Product toEntity(ProductDto dto) {
        return Product.builder()
                .id(dto.getId() != null ? dto.getId() : null)
                .code(dto.getCode())
                .name(dto.getName())
                .description(dto.getDescription())
                .image(dto.getImage())
                .category(dto.getCategory())
                .price(dto.getPrice())
                .quantity(dto.getQuantity())
                .internalReference(dto.getInternalReference())
                .shellId(dto.getShellId())
                .inventoryStatus(dto.getInventoryStatus())
                .rating(dto.getRating())
                .build();
    }

    public ProductDto toDto(Product entity) {
        return ProductDto.builder()
                .id(entity.getId())
                .code(entity.getCode())
                .name(entity.getName())
                .description(entity.getDescription())
                .image(entity.getImage())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .quantity(entity.getQuantity())
                .internalReference(entity.getInternalReference())
                .shellId(entity.getShellId())
                .inventoryStatus(entity.getInventoryStatus())
                .rating(entity.getRating())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

}
