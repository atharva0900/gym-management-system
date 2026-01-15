package com.atharva.models;



import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonIgnoreProperties("memberships")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "package_id")
    @JsonIgnoreProperties("memberships")
    private PackageEntity gymPackage;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    @JsonIgnoreProperties("memberships")
    private Trainer trainer;
}
