package com.product.trial.master.services.impl;

import com.product.trial.master.dtos.PanierDto;
import com.product.trial.master.dtos.ProductDto;
import com.product.trial.master.dtos.UserDto;
import com.product.trial.master.entities.Panier;
import com.product.trial.master.entities.Product;
import com.product.trial.master.entities.User;
import com.product.trial.master.exceptions.PanierNotFoundException;
import com.product.trial.master.exceptions.ProductNotFoundException;
import com.product.trial.master.mapper.PanierMapper;
import com.product.trial.master.mapper.ProductMapper;
import com.product.trial.master.mapper.UserMapper;
import com.product.trial.master.repositories.PanierRepository;
import com.product.trial.master.services.IPanierService;
import com.product.trial.master.services.IProductService;
import com.product.trial.master.services.IUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PanierServiceImpl implements IPanierService {

    private final PanierRepository panierRepository;
    private final IProductService productService;
    private final IUserService userService;
    private final ProductMapper productMapper;
    private final UserMapper userMapper;
    private final PanierMapper panierMapper;

    @Transactional
    @Override
    public void addProductToPanier(Long userId, Long productId) {
        UserDto userDto = userService.findUserById(userId);
        ProductDto productDto = productService.findProductById(productId);


        User user = userMapper.toEntity(userDto);
        Product product = productMapper.toEntity(productDto);

        Panier panier = panierRepository.findByUserId(userId).orElseGet(
                () -> {
                    Panier newPanier = Panier.builder()
                            .user(user)
                            .products(new ArrayList<>(List.of(product)))
                            .build();
                    return panierRepository.save(newPanier);
                });

        if (panier.getProducts() == null) {
            panier.setProducts(new ArrayList<>());
        } else if (!(panier.getProducts() instanceof ArrayList)) {
            panier.setProducts(new ArrayList<>(panier.getProducts()));
        }

        if (!panier.getProducts().contains(product)) {
            panier.getProducts().add(product);
            panierRepository.save(panier);
        }
    }

    @Override
    public void deleteProductFromPanier(Long userId, Long productId) {
        Panier panier = panierRepository.findByUserId(userId)
                .orElseThrow(() -> new PanierNotFoundException("Cart not found"));

        if (panier.getProducts() == null || panier.getProducts().isEmpty()) {
            throw new ProductNotFoundException("No products in the Cart .");
        }

        if (!(panier.getProducts() instanceof ArrayList)) {
            panier.setProducts(new ArrayList<>(panier.getProducts()));
        }

        panier.getProducts().removeIf(product -> product.getId().equals(productId));

        panierRepository.save(panier);
    }

    @Override
    public PanierDto findByUserId(Long userId) {
        userService.findUserById(userId);
        Panier panier = panierRepository.findByUserId(userId).orElse(null);
        if (panier == null) {
            return null;
        }
        return panierMapper.toDto(panier);
    }
}
