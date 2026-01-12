package com.atharva.services;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.atharva.models.Customer;
import com.atharva.repositories.CustomerRepository;
import com.atharva.responseWrapper.MyResponseWrapper;



@Service
public class CustomerService {

    @Autowired
     CustomerRepository customerRepository;

    @Autowired
    MyResponseWrapper responseWrapper;;

    // Register new Customer
    public ResponseEntity<?> register(Customer customer) {
        Optional<Customer> existing = customerRepository.findByEmail(customer.getEmail());
        if (existing.isPresent()) {
            responseWrapper.setMessage("Email - " + customer.getEmail() + " already exists");
            responseWrapper.setData(true);
            return new ResponseEntity<>(responseWrapper, HttpStatus.CONFLICT);
        } else {
            Customer saved = customerRepository.save(customer);
            responseWrapper.setMessage("Registration Success!");
            responseWrapper.setData(saved);
            return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
        }
    }

    // Login Customer
    public ResponseEntity<?> login(String email, String password) {
        Optional<Customer> existing = customerRepository.findByEmailAndPassword(email, password);
        if (existing.isPresent()) {
            responseWrapper.setMessage("Login Success!");
            responseWrapper.setData(existing.get());
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Wrong Credentials");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    // Get all customers
    public ResponseEntity<?> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        if (!customers.isEmpty()) {
            responseWrapper.setMessage("Following customers found");
            responseWrapper.setData(customers);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("There are no customers found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    // Get customer by ID
    public ResponseEntity<?> getCustomerById(Long id) {
        Optional<Customer> c = customerRepository.findById(id);
        if (c.isPresent()) {
            responseWrapper.setMessage("Customer found");
            responseWrapper.setData(c.get());
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Customer not found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }
    
    // ✅ Update profile
    public ResponseEntity<?> updateProfile(Long id, Customer updatedCustomer) {
        Optional<Customer> existing = customerRepository.findById(id);

        if (existing.isPresent()) {
            Customer c = existing.get();
            c.setName(updatedCustomer.getName());
            c.setAge(updatedCustomer.getAge());
            c.setSex(updatedCustomer.getSex());
            c.setWeight(updatedCustomer.getWeight());
            c.setPhone(updatedCustomer.getPhone());
            c.setEmail(updatedCustomer.getEmail()); 
            // Password change optional
            customerRepository.save(c);

            responseWrapper.setMessage("Profile updated successfully!");
            responseWrapper.setData(c);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Customer not found!");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }
}

