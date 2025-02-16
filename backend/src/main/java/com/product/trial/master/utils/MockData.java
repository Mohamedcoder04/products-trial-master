package com.product.trial.master.utils;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.product.trial.master.entities.Product;
import com.product.trial.master.repositories.ProductRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MockData {

    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper;

    @PostConstruct
    public void loadProducts() {
        try {
            if (productRepository.count() == 0) {
                InputStream inputStream = new ClassPathResource("products.json").getInputStream();
                List<Product> products = objectMapper.readValue(inputStream, new TypeReference<>() {
                });
                productRepository.saveAll(products);
                System.out.println("Produits chargés avec succès !");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
