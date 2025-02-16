package com.product.trial.master.services;

import com.product.trial.master.dtos.ProductDto;

import java.util.List;

public interface IProductService {

    ProductDto createProduct(ProductDto productDto);

    List<ProductDto> findAllProducts();

    ProductDto findProductById(Long id);

    ProductDto updateProduct(Long id, ProductDto productDto);

    void deleteProduct(Long id);

}
