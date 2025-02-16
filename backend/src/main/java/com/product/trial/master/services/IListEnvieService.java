package com.product.trial.master.services;

import com.product.trial.master.dtos.ListEnvieDto;

public interface IListEnvieService {

    void addProductToList(Long userId, Long productId);

    void deleteProductFromList(Long userId, Long productId);

    ListEnvieDto findByUserId(Long userId);
}
