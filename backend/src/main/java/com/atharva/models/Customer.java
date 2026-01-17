package com.atharva.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;

    private String password;

    // Extra details
    private int age;
    private String sex; // Male/Female/Other
    private double weight;

   

    // One Customer → Many Memberships
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Membership> memberships;
}

