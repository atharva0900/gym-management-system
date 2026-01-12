package com.atharva.controllers;

import com.atharva.models.PackageEntity;
import com.atharva.services.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/packages")   // Base URL for packages
@CrossOrigin("*")
public class PackageController {

    @Autowired
    private PackageService packageService;

    // ✅ Add a new package
    @PostMapping("/add")
    public ResponseEntity<?> addPackage(@RequestBody PackageEntity gymPackage) {
        return packageService.addPackage(gymPackage);
    }

    // ✅ Get all packages
    @GetMapping()
    public ResponseEntity<?> getAllPackages() {
        return packageService.getAllPackages();
    }

    // ✅ Get a package by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getPackageById(@PathVariable Long id) {
        return packageService.getPackageById(id);
    }

  
}
