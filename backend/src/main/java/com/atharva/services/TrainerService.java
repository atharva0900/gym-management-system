//package com.atharva.services;
//
//
//
//import java.io.IOException;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.atharva.models.Trainer;
//import com.atharva.repositories.TrainerRepository;
//import com.atharva.responseWrapper.MyResponseWrapper;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//
////import com.fasterxml.jackson.databind.ObjectMapper;
////import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.io.FileSystemResource;
//import org.springframework.core.io.Resource;
//import org.springframework.http.HttpHeaders;
////import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
////import org.springframework.http.ResponseEntity;
////import org.springframework.stereotype.Service;
////import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
////import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//
//
//
//
//
//@Service
//public class TrainerService {
//
//    @Autowired
//    TrainerRepository trainerRepository;
//
//    @Autowired
//    MyResponseWrapper responseWrapper;
//    
//    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/trainers/";
//
//    // ✅ Add Trainer (Admin only)
//    public ResponseEntity<?> addTrainer(Trainer trainer) {
//        Trainer saved = trainerRepository.save(trainer);
//        responseWrapper.setMessage("Trainer added successfully!");
//        responseWrapper.setData(saved);
//        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
//    }
//
//    // ✅ Get All Trainers
//    public ResponseEntity<?> getAllTrainers() {
//        List<Trainer> trainers = trainerRepository.findAll();
//        if (!trainers.isEmpty()) {
//            responseWrapper.setMessage("Following trainers found");
//            responseWrapper.setData(trainers);
//            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
//        } else {
//            responseWrapper.setMessage("No trainers found");
//            responseWrapper.setData(null);
//            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
//        }
//    }
//
//    // ✅ Get Trainer by ID
//    public ResponseEntity<?> getTrainerById(Long id) {
//        Optional<Trainer> trainer = trainerRepository.findById(id);
//        if (trainer.isPresent()) {
//            responseWrapper.setMessage("Trainer found");
//            responseWrapper.setData(trainer.get());
//            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
//        } else {
//            responseWrapper.setMessage("Trainer not found with ID: " + id);
//            responseWrapper.setData(null);
//            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
//        }
//    }
//    
// // ------------------ Add Trainer with Image ------------------
//    public ResponseEntity<?> addTrainerWithImage(String trainerJson, MultipartFile file) throws IOException {
//        ObjectMapper mapper = new ObjectMapper();
//        Trainer trainer = mapper.readValue(trainerJson, Trainer.class);
//
//        // create uploads directory if not exists
//        File uploadDir = new File(UPLOAD_DIR);
//        if (!uploadDir.exists()) {
//            uploadDir.mkdirs();
//        }
//
//        // save file
//        String originalFilename = file.getOriginalFilename();
//        Path filePath = Paths.get(UPLOAD_DIR, originalFilename);
//        Files.write(filePath, file.getBytes());
//
//        // Save filename to trainer
//        trainer.setImageName(originalFilename);
//
//        Trainer savedTrainer = trainerRepository.save(trainer);
//
//        // Wrap response
//        responseWrapper.setMessage("Trainer registered with image successfully");
//        responseWrapper.setData(savedTrainer);
//        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
//    }
//
//    // ------------------ Get Trainer Image ------------------
//    public ResponseEntity<Resource> getTrainerImage(String fileName) throws IOException {
//        Path filePath = Paths.get(UPLOAD_DIR, fileName);
//        if (!Files.exists(filePath)) {
//            return ResponseEntity.notFound().build();
//        }
//
//        Resource resource = new FileSystemResource(filePath);
//        String contentType = Files.probeContentType(filePath);
//        if (contentType == null) {
//            contentType = "application/octet-stream";
//        }
//
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
//                .contentType(MediaType.parseMediaType(contentType))
//                .body(resource);
//    }
//
//
////    // ✅ Delete Trainer
////    public ResponseEntity<?> deleteTrainer(Long id) {
////        Optional<Trainer> trainer = trainerRepository.findById(id);
////        if (trainer.isPresent()) {
////            trainerRepository.deleteById(id);
////            responseWrapper.setMessage("Trainer deleted successfully!");
////            responseWrapper.setData(true);
////            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
////        } else {
////            responseWrapper.setMessage("Trainer not found with ID: " + id);
////            responseWrapper.setData(false);
////            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
////        }
////    }
//}

package com.atharva.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.atharva.models.Trainer;
import com.atharva.repositories.TrainerRepository;
import com.atharva.responseWrapper.MyResponseWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;


@Service
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private MyResponseWrapper responseWrapper;
    
    @Autowired
    private Cloudinary cloudinary;


    // ✅ SAFE upload directory (works locally + Render)
    private static final String UPLOAD_DIR = "/tmp/uploads/trainers/";

    // ------------------ Add Trainer (JSON only) ------------------
    public ResponseEntity<?> addTrainer(Trainer trainer) {
        Trainer saved = trainerRepository.save(trainer);
        responseWrapper.setMessage("Trainer added successfully");
        responseWrapper.setData(saved);
        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
    }

    // ------------------ Add Trainer with Image ------------------
    public ResponseEntity<?> addTrainerWithImage(String trainerJson, MultipartFile file) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Trainer trainer = mapper.readValue(trainerJson, Trainer.class);

        // upload to Cloudinary
        var uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", "gym/trainers"
                )
        );

        String imageUrl = uploadResult.get("secure_url").toString();

        trainer.setImageName(imageUrl); // now storing FULL URL

        Trainer savedTrainer = trainerRepository.save(trainer);

        responseWrapper.setMessage("Trainer added with image successfully");
        responseWrapper.setData(savedTrainer);

        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
    }


    // ------------------ Get All Trainers ------------------
    public ResponseEntity<?> getAllTrainers() {
        List<Trainer> list = trainerRepository.findAll();
        responseWrapper.setMessage(list.isEmpty() ? "No trainers found" : "Trainers found");
        responseWrapper.setData(list);
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }

    // ------------------ Get Trainer by ID ------------------
    public ResponseEntity<?> getTrainerById(Long id) {
        Optional<Trainer> trainer = trainerRepository.findById(id);
        if (trainer.isPresent()) {
            responseWrapper.setMessage("Trainer found");
            responseWrapper.setData(trainer.get());
            return ResponseEntity.ok(responseWrapper);
        }
        responseWrapper.setMessage("Trainer not found");
        responseWrapper.setData(null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseWrapper);
    }

    // ------------------ Get Trainer Image ------------------
    public ResponseEntity<Resource> getTrainerImage(String fileName) throws IOException {
        Path path = Paths.get(UPLOAD_DIR, fileName);

        if (!Files.exists(path)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(path);
        String contentType = Files.probeContentType(path);
        if (contentType == null) contentType = "application/octet-stream";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .body(resource);
    }
}

