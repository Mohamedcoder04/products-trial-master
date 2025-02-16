package com.product.trial.master.services.impl;

import com.product.trial.master.dtos.ListEnvieDto;
import com.product.trial.master.dtos.ProductDto;
import com.product.trial.master.dtos.UserDto;
import com.product.trial.master.entities.ListEnvie;
import com.product.trial.master.entities.Product;
import com.product.trial.master.entities.User;
import com.product.trial.master.exceptions.ListEnvieNotFoundException;
import com.product.trial.master.exceptions.ProductAlreadyExist;
import com.product.trial.master.exceptions.ProductNotFoundException;
import com.product.trial.master.mapper.ListEnvieMapper;
import com.product.trial.master.mapper.ProductMapper;
import com.product.trial.master.mapper.UserMapper;
import com.product.trial.master.repositories.ListEnvieRepository;
import com.product.trial.master.services.IListEnvieService;
import com.product.trial.master.services.IProductService;
import com.product.trial.master.services.IUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ListEnvieServiceImpl implements IListEnvieService {

    private final IProductService productService;
    private final IUserService userService;
    private final ListEnvieRepository listEnvieRepository;
    private final UserMapper userMapper;
    private final ProductMapper productMapper;
    private final ListEnvieMapper listEnvieMapper;

    @Transactional
    @Override
    public void addProductToList(Long userId, Long productId) {
        UserDto userDto = userService.findUserById(userId);
        ProductDto productDto = productService.findProductById(productId);

        User user = userMapper.toEntity(userDto);
        Product product = productMapper.toEntity(productDto);

        ListEnvie listEnvie = listEnvieRepository.findByUserId(userId).orElse(null);

        if (listEnvie == null) {
            listEnvie = ListEnvie.builder()
                    .user(user)
                    .products(new ArrayList<>(List.of(product)))
                    .build();
            listEnvieRepository.save(listEnvie);
            return;
        }

        if (listEnvie.getProducts() == null) {
            listEnvie.setProducts(new ArrayList<>());
        } else if (!(listEnvie.getProducts() instanceof ArrayList)) {
            listEnvie.setProducts(new ArrayList<>(listEnvie.getProducts()));
        }

        if (listEnvie.getProducts().contains(product)) {
            throw new ProductAlreadyExist("The product already exists in the wishlist.");
        } else {
            listEnvie.getProducts().add(product);
            listEnvieRepository.save(listEnvie);
        }
    }

    @Override
    public void deleteProductFromList(Long userId, Long productId) {
        ListEnvie listEnvie = listEnvieRepository.findByUserId(userId)
                .orElseThrow(() -> new ListEnvieNotFoundException("Wishlist not found"));

        if (listEnvie.getProducts() == null || listEnvie.getProducts().isEmpty()) {
            throw new ProductNotFoundException("No products in the wishlist.");
        }

        if (!(listEnvie.getProducts() instanceof ArrayList)) {
            listEnvie.setProducts(new ArrayList<>(listEnvie.getProducts()));
        }

        listEnvie.getProducts().removeIf(product -> product.getId().equals(productId));

        listEnvieRepository.save(listEnvie);
    }

    @Override
    public ListEnvieDto findByUserId(Long userId) {
        userService.findUserById(userId);
        ListEnvie listEnvie = listEnvieRepository.findByUserId(userId).orElse(null);
        if (listEnvie == null) {
            return null;
        }
        return listEnvieMapper.toDto(listEnvie);
    }
}
