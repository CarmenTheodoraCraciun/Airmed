package com.example.airmed.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Psychotherapist {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String medicalNumber;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String mail;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String locality;

    @Column
    private String cabinetLocation;

    @Column
    private String linkLocation;

    @Column(nullable = false)
    private int priceConsult;

    @Column(nullable = false)
    private int priceConsultation;

    @Column(columnDefinition = "boolean default false")
    private boolean online;

    @Column(columnDefinition = "boolean default false")
    private boolean CNAS;
}
