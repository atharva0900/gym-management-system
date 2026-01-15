package com.atharva.models;



import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PackageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String packageName;  // e.g. Weight Loss Plan
    private String description;
    private double price;
    private int durationInMonths;

    @OneToMany(mappedBy = "gymPackage", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Membership> memberships;
}
