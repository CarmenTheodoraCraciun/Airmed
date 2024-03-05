package com.example.airmed.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Declaring the entity class for 'Patient'
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Patient {
    // Declaring primary key field with auto-generation strategy
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    // Declaring columns for various patient attributes with constraints
    // nullable = false - this attribute can't be null
    // unique = true - this attribute has unique values for all of this records
    @Column(nullable = false, unique = true)
    private String PNC; // Personal Numeric Code

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

    // Establishing many-to-one relationship with a Psychiatrist entity
    @ManyToOne
    @JoinColumn(name = "psychiatrist")
    private Psychiatrist psychiatrist;
    // TODO: try only with the id

    // Establishing many-to-one relationship with a Psychotherapist entity
    @ManyToOne
    @JoinColumn(name = "psychotherapist")
    private Psychotherapist psychotherapist;
}