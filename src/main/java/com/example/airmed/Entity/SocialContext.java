package com.example.airmed.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SocialContext {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String occupation;

    @Column(nullable = false)
    private String highestEdu;

    @Column(nullable = false)
    private String relationship;

    @Column(nullable = false)
    private boolean sexuallyActive;

    @Column(nullable = false)
    private String genderOrientatin;

    @Column(nullable = false)
    private String legalProblems;

    @Column(columnDefinition = "boolean default false")
    private boolean adopted;

    @Column
    private String family;

    @Column
    private String familyPsychiatric;

    @Column
    private String drugs;

    @Column
    private String alcohol;

    @Column
    private String abuseMeds;

    @Column
    private String caffeine;

    @Column
    private String cigarettes;

    @Column
    private String exercise;

    @ManyToOne
    @JoinColumn(name = "patient", nullable = false)
    private Patient patient;
}
