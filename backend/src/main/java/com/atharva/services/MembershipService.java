package com.atharva.services;

import com.atharva.models.Membership;
import com.atharva.models.PackageEntity;
import com.atharva.repositories.CustomerRepository;
import com.atharva.repositories.MembershipRepository;
import com.atharva.repositories.PackageRepository;
import com.atharva.repositories.TrainerRepository;
import com.atharva.responseWrapper.MyResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MembershipService {

    @Autowired
    MembershipRepository membershipRepository;

    @Autowired
    MyResponseWrapper responseWrapper;
    
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    TrainerRepository trainerRepository;

    @Autowired
    PackageRepository packageRepository;

//    // ✅ Customer adds Membership (always default = PENDING)
//    public ResponseEntity<?> addMembership(Membership membership) {
//        membership.setStatus("PENDING"); // force set PENDING
//        Membership saved = membershipRepository.save(membership);
//        responseWrapper.setMessage("Membership created. Awaiting admin approval.");
//        responseWrapper.setData(saved);
//        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
//    }

//    public ResponseEntity<?> addMembership(Membership membership) {
//        // Validate and fetch customer
//        if (membership.getCustomer() != null && membership.getCustomer().getId() != null) {
//            membership.setCustomer(
//                customerRepository.findById(membership.getCustomer().getId())
//                    .orElseThrow(() -> new RuntimeException("Customer not found"))
//            );
//        }
//
//        // Validate and fetch trainer
//        if (membership.getTrainer() != null && membership.getTrainer().getId() != null) {
//            membership.setTrainer(
//                trainerRepository.findById(membership.getTrainer().getId())
//                    .orElseThrow(() -> new RuntimeException("Trainer not found"))
//            );
//        }
//
//        // Validate and fetch package
//        if (membership.getGymPackage() != null && membership.getGymPackage().getId() != null) {
//            membership.setGymPackage(
//                packageRepository.findById(membership.getGymPackage().getId())
//                    .orElseThrow(() -> new RuntimeException("Package not found"))
//            );
//        }
//
//        membership.setStatus("PENDING");
//        Membership saved = membershipRepository.save(membership);
//
//        responseWrapper.setMessage("Membership created. Awaiting admin approval.");
//        responseWrapper.setData(saved);
//        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
//    }
    
//    public ResponseEntity<?> addMembership(Membership membership) {
//        // Validate and fetch customer
//        if (membership.getCustomer() != null && membership.getCustomer().getId() != null) {
//            membership.setCustomer(
//                customerRepository.findById(membership.getCustomer().getId())
//                    .orElseThrow(() -> new RuntimeException("Customer not found"))
//            );
//        }
//
//        // ✅ Check if this customer already has ACTIVE membership
//        Optional<Membership> activeMembership =
//                membershipRepository.findByCustomerAndStatus(membership.getCustomer(), "PENDING");
//
//        if (activeMembership.isPresent()) {
//            responseWrapper.setMessage("Customer already has an pending membership");
//            responseWrapper.setData(null);
//            return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
//        }
//
//        // Validate and fetch trainer
//        if (membership.getTrainer() != null && membership.getTrainer().getId() != null) {
//            membership.setTrainer(
//                trainerRepository.findById(membership.getTrainer().getId())
//                    .orElseThrow(() -> new RuntimeException("Trainer not found"))
//            );
//        }
//
//        // Validate and fetch package
//        if (membership.getGymPackage() != null && membership.getGymPackage().getId() != null) {
//            membership.setGymPackage(
//                packageRepository.findById(membership.getGymPackage().getId())
//                    .orElseThrow(() -> new RuntimeException("Package not found"))
//            );
//        }
//
//        membership.setStatus("PENDING");
//        Membership saved = membershipRepository.save(membership);
//
//        responseWrapper.setMessage("Membership created. Awaiting admin approval.");
//        responseWrapper.setData(saved);
//        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
//    }
    
    public ResponseEntity<?> addMembership(Membership membership) {
        // Validate and fetch customer
        if (membership.getCustomer() != null && membership.getCustomer().getId() != null) {
            membership.setCustomer(
                customerRepository.findById(membership.getCustomer().getId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"))
            );
        }

        // ✅ Check if customer already has ACTIVE or PENDING membership
        List<Membership> existingMemberships = membershipRepository.findByCustomerId(membership.getCustomer().getId());
        for (Membership m : existingMemberships) {
            if ("ACTIVE".equalsIgnoreCase(m.getStatus())) {
                responseWrapper.setMessage("Customer already has an active membership.");
                responseWrapper.setData(null);
                return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
            }
            if ("PENDING".equalsIgnoreCase(m.getStatus())) {
                responseWrapper.setMessage("Membership already requested. Awaiting admin approval.");
                responseWrapper.setData(null);
                return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
            }
        }

        // Validate and fetch trainer
        if (membership.getTrainer() != null && membership.getTrainer().getId() != null) {
            membership.setTrainer(
                trainerRepository.findById(membership.getTrainer().getId())
                    .orElseThrow(() -> new RuntimeException("Trainer not found"))
            );
        }

        // Validate and fetch package
//        if (membership.getGymPackage() != null && membership.getGymPackage().getId() != null) {
//            membership.setGymPackage(
//                packageRepository.findById(membership.getGymPackage().getId())
//                    .orElseThrow(() -> new RuntimeException("Package not found"))
//            );
//        }
        if (membership.getGymPackage() != null && membership.getGymPackage().getId() != null) {
            PackageEntity gymPackage = packageRepository.findById(membership.getGymPackage().getId())
                .orElseThrow(() -> new RuntimeException("Package not found"));

            membership.setGymPackage(gymPackage); // set the package to membership

            // ✅ Set startDate and endDate
            LocalDate startDate = LocalDate.now();
            int durationByMonth = gymPackage.getDurationInMonths(); // Assuming this getter exists
            LocalDate endDate = startDate.plusMonths(durationByMonth);

            membership.setStartDate(startDate);
            membership.setEndDate(endDate);
        } else {
            throw new RuntimeException("Package is required for membership");
        }

        	
        
        // ✅ Always create new with PENDING
        membership.setStatus("PENDING");
        membership.setStartDate(LocalDate.now());
//        membership.setEndDate(LocalDate.now(startdate.plusMonths()));

        Membership saved = membershipRepository.save(membership);

        responseWrapper.setMessage("Membership created. Awaiting admin approval.");
        responseWrapper.setData(saved);
        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
    }

    // ✅ Customer views Membership by ID
    public ResponseEntity<?> getMembershipById(Long id) {
        Optional<Membership> membership = membershipRepository.findById(id);
        if (membership.isPresent()) {
            responseWrapper.setMessage("Membership found");
            responseWrapper.setData(membership.get());
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Membership not found with ID: " + id);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    // ✅ Admin updates membership status (ACTIVE / CANCELLED / EXPIRED etc.)
    public ResponseEntity<?> updateMembershipStatus(Long id, String newStatus) {
        Optional<Membership> membershipOpt = membershipRepository.findById(id);
        if (membershipOpt.isPresent()) {
            Membership membership = membershipOpt.get();
            membership.setStatus(newStatus); // Admin changes status
            membershipRepository.save(membership);

            responseWrapper.setMessage("Membership status updated to: " + newStatus);
            responseWrapper.setData(membership);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Membership not found with ID: " + id);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    // ✅ Get all memberships (for Admin use)
    public ResponseEntity<?> getAllMemberships() {
        List<Membership> memberships = membershipRepository.findAll();
        if (memberships.isEmpty()) {
            responseWrapper.setMessage("No memberships found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        } else {
            responseWrapper.setMessage("List of all memberships");
            responseWrapper.setData(memberships);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        }
    }
    
    // ✅ Delete Membership
    public ResponseEntity<?> deleteMembership(Long id) {
        Optional<Membership> membership = membershipRepository.findById(id);
        if (membership.isPresent()) {
            membershipRepository.deleteById(id);
            responseWrapper.setMessage("Membership deleted successfully!");
            responseWrapper.setData(true);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Membership not found with ID: " + id);
            responseWrapper.setData(false);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }
}
