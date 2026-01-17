package com.atharva.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.atharva.models.Customer;
import com.atharva.services.CustomerService;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
     CustomerService customerService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Customer customer) {
        return customerService.register(customer);
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
//        return customerService.login(email, password);
//    }
    @PostMapping("/login")
    public ResponseEntity<?>login(@RequestBody Customer customer){
    	return customerService.login(customer.getEmail(),customer.getPassword());
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }
     
    // Update Profile
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody Customer customer) {
        return customerService.updateProfile(id, customer);
    }
}
