package com.product.trial.master.services.impl;

import com.product.trial.master.dtos.ProductDto;
import com.product.trial.master.entities.Product;
import com.product.trial.master.exceptions.ProductNotFoundException;
import com.product.trial.master.mapper.ProductMapper;
import com.product.trial.master.repositories.ProductRepository;
import com.product.trial.master.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductMapper productMapper;
    private final ProductRepository repository;

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        Product product = productMapper.toEntity(productDto);
        return productMapper.toDto(repository.save(product));
    }

    @Override
    public List<ProductDto> findAllProducts() {
        return repository.findAll().stream().map(productMapper::toDto)
                .sorted(Comparator.comparingLong(ProductDto::getId).reversed())
                .toList();
    }

    @Override
    public ProductDto findProductById(Long id) {
        Product product = repository.findById(id).orElseThrow(
                () -> new ProductNotFoundException("Product not found with id: " + id)
        );
        return productMapper.toDto(product);
    }

    @Override
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        findProductById(id);
        Product product = productMapper.toEntity(productDto);
        product.setId(id);
        return productMapper.toDto(repository.save(product));
    }

    @Override
    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }
}
