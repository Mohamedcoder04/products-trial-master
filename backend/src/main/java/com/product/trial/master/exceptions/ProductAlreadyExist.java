package com.product.trial.master.exceptions;

public class ProductAlreadyExist extends RuntimeException {
    public ProductAlreadyExist(String s) {
        super(s);
    }
}
