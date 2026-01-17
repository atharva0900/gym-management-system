package com.atharva.repositories;

import com.atharva.models.Customer;
import com.atharva.models.Membership;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;



public interface MembershipRepository extends JpaRepository<Membership, Long> {
	 Optional<Membership> findByCustomerAndStatus(Customer customer, String status);
	 List<Membership> findByCustomerId(Long customerId);

   
}
