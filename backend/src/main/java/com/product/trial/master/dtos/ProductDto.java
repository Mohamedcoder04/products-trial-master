package com.product.trial.master.dtos;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.product.trial.master.enums.InventoryStatus;
import com.product.trial.master.utils.LocalDateTimeDeserializer;
import com.product.trial.master.utils.LocalDateTimeSerializer;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    Long id;
    String code;
    String name;
    String description;
    String image;
    String category;
    double price;
    Integer quantity;
    String internalReference;
    Integer shellId;
    InventoryStatus inventoryStatus;
    double rating;
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdAt;
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime updatedAt;
}
