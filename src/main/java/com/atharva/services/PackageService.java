package com.atharva.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.atharva.models.PackageEntity;   // ✅ updated import
import com.atharva.repositories.PackageRepository;
import com.atharva.responseWrapper.MyResponseWrapper;

@Service
public class PackageService {

    @Autowired
     PackageRepository packageRepository;

    @Autowired
    MyResponseWrapper responseWrapper;

    // ✅ Add Package
    public ResponseEntity<?> addPackage(PackageEntity gymPackage) {
        PackageEntity saved = packageRepository.save(gymPackage);
        responseWrapper.setMessage("Package added successfully!");
        responseWrapper.setData(saved);
        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
    }

    // ✅ Get All Packages
    public ResponseEntity<?> getAllPackages() {
        List<PackageEntity> packages = packageRepository.findAll();
        if (!packages.isEmpty()) {
            responseWrapper.setMessage("Following packages found");
            responseWrapper.setData(packages);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("No packages found");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    // ✅ Get Package by ID
    public ResponseEntity<?> getPackageById(Long id) {
        Optional<PackageEntity> pkg = packageRepository.findById(id);
        if (pkg.isPresent()) {
            responseWrapper.setMessage("Package found");
            responseWrapper.setData(pkg.get());
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("Package not found with ID: " + id);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

//   
}
