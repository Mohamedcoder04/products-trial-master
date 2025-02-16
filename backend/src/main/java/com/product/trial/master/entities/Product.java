package com.product.trial.master.entities;

import com.product.trial.master.enums.InventoryStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "product")
public class Product extends AbstractEntity {

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

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Product product = (Product) obj;
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

}

