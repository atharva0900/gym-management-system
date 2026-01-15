package com.atharva.services;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.atharva.models.Admin;
import com.atharva.models.Membership;
import com.atharva.models.PackageEntity;
import com.atharva.repositories.AdminRepository;
import com.atharva.repositories.CustomerRepository;
import com.atharva.repositories.MembershipRepository;
import com.atharva.repositories.PackageRepository;
import com.atharva.repositories.TrainerRepository;
import com.atharva.responseWrapper.MyResponseWrapper;


@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    TrainerRepository trainerRepository;

    @Autowired
     CustomerRepository customerRepository;

    @Autowired
     MembershipRepository membershipRepository;
    
    @Autowired
     PackageRepository packageRepository;
    
   

    @Autowired
     MyResponseWrapper responseWrapper;

    // ✅ Register Admin
    public ResponseEntity<?> register(Admin admin) {
        Optional<Admin> existing = adminRepository.findByEmail(admin.getEmail());
        if (existing.isPresent()) {
            responseWrapper.setMessage("Email - " + admin.getEmail() + " already exists");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.CONFLICT);
        } else {
            Admin saved = adminRepository.save(admin);
            responseWrapper.setMessage("Registration Success");
            responseWrapper.setData(saved);
            return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
        }
    }
    
    
 //  Admin aahe ki nhi
    public ResponseEntity<?> checkIfAdminExists() {
        boolean exists = adminRepository.count() > 0;
        if (exists) {
            responseWrapper.setMessage("Admin account already exists");
            responseWrapper.setData(true);
        } else {
            responseWrapper.setMessage("No admin registered yet");
            responseWrapper.setData(false);
        }
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }

    
    

    //  Login Admin
    public ResponseEntity<?> login(String email, String password) {
        Optional<Admin> existing = adminRepository.findByEmailAndPassword(email, password);
        if (existing.isPresent()) {
            responseWrapper.setMessage("Login Success");
            responseWrapper.setData(existing.get());
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Wrong Credentials");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    //  Delete Trainer
    public ResponseEntity<?> deleteTrainer(Long id) {
        if (trainerRepository.existsById(id)) {
            trainerRepository.deleteById(id);
            responseWrapper.setMessage("Trainer deleted");
            responseWrapper.setData(true);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Trainer not found");
            responseWrapper.setData(false);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    //  Delete Customer
    public ResponseEntity<?> deleteCustomer(Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            responseWrapper.setMessage("Customer deleted");
            responseWrapper.setData(true);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Customer not found");
            responseWrapper.setData(false);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }
    
//      Delete Package
  public ResponseEntity<?> deletePackage(Long id) {
      Optional<PackageEntity> pkg = packageRepository.findById(id);
      if (pkg.isPresent()) {
          packageRepository.deleteById(id);
          responseWrapper.setMessage("Package deleted successfully!");
          responseWrapper.setData(true);
          return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
      } else {
          responseWrapper.setMessage("Package not found with ID: " + id);
          responseWrapper.setData(false);
          return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
      }
  }

    //  Update Membership Status
    public ResponseEntity<?> updateMembershipStatus(Long membershipId, String status) {
        Optional<Membership> member = membershipRepository.findById(membershipId);
        if (member.isPresent()) {
            Membership m = member.get();
            m.setStatus(status);
            membershipRepository.save(m);
            responseWrapper.setMessage("Membership status updated");
            responseWrapper.setData(m);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Membership not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    //  Delete Membership
    public ResponseEntity<?> deleteMembership(Long id) {
        if (membershipRepository.existsById(id)) {
            membershipRepository.deleteById(id);
            responseWrapper.setMessage("Membership deleted");
            responseWrapper.setData(true);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Membership not found");
            responseWrapper.setData(false);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }
}

