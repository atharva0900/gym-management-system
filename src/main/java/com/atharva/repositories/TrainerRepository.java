package com.atharva.repositories;

import com.atharva.models.Trainer;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
	Optional<Trainer> findByEmail(String email);

    Optional<Trainer> findByEmailAndPassword(String email, String password);
	
}
