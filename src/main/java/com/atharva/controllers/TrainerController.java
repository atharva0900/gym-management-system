package com.atharva.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.atharva.models.Trainer;
import com.atharva.services.TrainerService;

@RestController
@RequestMapping("/api/trainer")
@CrossOrigin("*")
public class TrainerController {

    @Autowired
    TrainerService trainerService;

    // ✅ Add Trainer
    @PostMapping("/add-trainer")
    public ResponseEntity<?> addTrainer(@RequestBody Trainer trainer) {
        return trainerService.addTrainer(trainer);
    }

    // ✅ Get All Trainers
    @GetMapping("/all-trainer")
    public ResponseEntity<?> getAllTrainers() {
        return trainerService.getAllTrainers();
    }

    // ✅ Get Trainer by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTrainerById(@PathVariable Long id) {
        return trainerService.getTrainerById(id);
    }
    
    @PostMapping("/with-image")
    public ResponseEntity<?> addTrainerWithImage(@RequestPart("trainer") String trainerJson,@RequestParam("file") MultipartFile file) throws IOException {
        return trainerService.addTrainerWithImage(trainerJson, file);
    }

    @GetMapping("/images/{fileName}")
    public ResponseEntity<?> getTrainerImage(@PathVariable String fileName) throws IOException {
        return trainerService.getTrainerImage(fileName);
    }


//    // ✅ Delete Trainer
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteTrainer(@PathVariable Long id) {
//        return trainerService.deleteTrainer(id);
//    }
}

