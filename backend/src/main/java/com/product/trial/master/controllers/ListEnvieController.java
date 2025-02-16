package com.product.trial.master.controllers;

import com.product.trial.master.dtos.ListEnvieDto;
import com.product.trial.master.services.IListEnvieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/list-envie")
@RequiredArgsConstructor
public class ListEnvieController {

    private final IListEnvieService listEnvieService;

    @PostMapping("/{userId}/{productId}")
    public ResponseEntity<?> addProductToList(
            @PathVariable Long userId,
            @PathVariable Long productId
    ) {
        listEnvieService.addProductToList(userId, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public ResponseEntity<?> deleteProductFromList(
            @PathVariable Long userId,
            @PathVariable Long productId
    ) {
        listEnvieService.deleteProductFromList(userId, productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ListEnvieDto> findByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok().body(listEnvieService.findByUserId(userId));
    }

}
