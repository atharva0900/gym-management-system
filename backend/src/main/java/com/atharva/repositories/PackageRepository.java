package com.atharva.repositories;


import com.atharva.models.PackageEntity;



import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//	 List<PackageEntity> findByDurationInMonths(int durationInMonths);

public interface PackageRepository extends JpaRepository<PackageEntity, Long> {
	 Optional<PackageEntity> findByDurationInMonths(int durationInMonths);
//	 Optional<Membership> findByCustomerAndStatus(Customer customer, String status);
}
