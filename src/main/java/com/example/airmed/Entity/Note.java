package com.example.airmed.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false, length = 9999999)
    private String content;

    @Column(columnDefinition = "boolean default false")
    private boolean sharedSpecialist;

    @Column(columnDefinition = "boolean default false")
    private boolean sharedAll;

    @ManyToOne
    @JoinColumn(name = "psychotherapist")
    private Psychotherapist psychotherapist;

    @ManyToOne
    @JoinColumn(name = "psychiatrist")
    private Psychiatrist psychiatrist;

    @ManyToOne
    @JoinColumn(name = "pacient", nullable = false)
    private Patient patient;
}
