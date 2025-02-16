package com.product.trial.master.repositories;

import com.product.trial.master.entities.ListEnvie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListEnvieRepository extends JpaRepository<ListEnvie, Long> {

    Optional<ListEnvie> findByUserId(Long userId);

}
