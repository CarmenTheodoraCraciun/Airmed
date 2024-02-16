package com.example.airmed.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PsychiatricData {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private boolean presant;

    @Column(nullable = false)
    private String diagnostics;

    @Column(columnDefinition = "boolean default false")
    private boolean hospitalization;

    @Column
    private String antidepressant;

    @Column
    private String moodStabilizers;

    @Column
    private String antipsychotics;

    @Column
    private String suicideThoughts;

    @ManyToOne
    @JoinColumn(name = "patient", nullable = false)
    private Patient patient;
}
