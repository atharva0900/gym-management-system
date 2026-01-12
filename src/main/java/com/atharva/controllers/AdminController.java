package com.atharva.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.atharva.models.Admin;
import com.atharva.responseWrapper.MyResponseWrapper;
import com.atharva.services.AdminService;



@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
     AdminService adminService;
    

    // ✅ Register Admin
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Admin admin) {
        return adminService.register(admin);
    }
    
    // ✅ Check if admin exists
    @GetMapping("/exists")
    public ResponseEntity<?> checkIfAdminExists() {
        return adminService.checkIfAdminExists();
    }



    // ✅ Login Admin
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
//        return adminService.login(email, password);
//    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        return adminService.login(admin.getEmail(), admin.getPassword());
    }

    // ✅ Delete Trainer
    @DeleteMapping("/trainer/{id}")
    public ResponseEntity<?> deleteTrainer(@PathVariable Long id) {
        return adminService.deleteTrainer(id);
    }
    
    // ✅ Delete a package by ID
    @DeleteMapping("/package/{id}")
    public ResponseEntity<?> deletePackage(@PathVariable Long id) {
        return adminService.deletePackage(id);
    }

    // ✅ Delete Customer
    @DeleteMapping("/customer/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        return adminService.deleteCustomer(id);
    }

    // ✅ Update Membership Status
    @PutMapping("/membership/{id}/status")
    public ResponseEntity<?> updateMembershipStatus(@PathVariable Long id, @RequestParam String status) {
        return adminService.updateMembershipStatus(id, status);
    }

    // ✅ Delete Membership
    @DeleteMapping("/membership/{id}")
    public ResponseEntity<?> deleteMembership(@PathVariable Long id) {
        return adminService.deleteMembership(id);
    }
}

