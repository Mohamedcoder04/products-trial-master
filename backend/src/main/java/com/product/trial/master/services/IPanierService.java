package com.product.trial.master.services;

import com.product.trial.master.dtos.PanierDto;

public interface IPanierService {

    void addProductToPanier(Long userId, Long productId);

    void deleteProductFromPanier(Long userId, Long productId);

    PanierDto findByUserId(Long userId);
}
