package com.atharva.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.atharva.models.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

	 Optional<Customer> findByEmail(String email);
	 Optional<Customer> findByEmailAndPassword(String email, String password);
}
