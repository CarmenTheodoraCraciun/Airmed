package com.example.airmed.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MedicalData {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private String allergies;

    @Column(nullable = false)
    private String weight;

    @Column(nullable = false)
    private String height;

    @Column
    private String diseases;

    @Column
    private String medecamentation;

    @Column
    private boolean pregnant;

    @ManyToOne
    @JoinColumn(name = "patient", nullable = false)
    private Patient patient;
}
