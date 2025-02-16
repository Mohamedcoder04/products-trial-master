package com.product.trial.master.repositories;

import com.product.trial.master.entities.Panier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PanierRepository extends JpaRepository<Panier, Long> {

    Optional<Panier> findByUserId(Long userId);
}
