package com.product.trial.master.controllers;

import com.product.trial.master.dtos.PanierDto;
import com.product.trial.master.services.IPanierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/panier")
@RequiredArgsConstructor
public class PanierController {

    private final IPanierService panierService;

    @PostMapping("/{userId}/{productId}")
    public ResponseEntity<?> addProductToPanier(
            @PathVariable Long userId,
            @PathVariable Long productId
    ) {
        panierService.addProductToPanier(userId, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public ResponseEntity<?> deleteProductFromPanier(
            @PathVariable Long userId,
            @PathVariable Long productId
    ) {
        panierService.deleteProductFromPanier(userId, productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<PanierDto> findByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok().body(panierService.findByUserId(userId));
    }

}
