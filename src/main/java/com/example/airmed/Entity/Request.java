package com.example.airmed.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Request {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(columnDefinition = "boolean default false")
    private boolean status;

    @Column(nullable = false)
    private String type;

    @ManyToOne
    @JoinColumn(name = "psychiatrist")
    private Psychiatrist psychiatrist;

    @ManyToOne
    @JoinColumn(name = "psychotherapist")
    private Psychotherapist psychotherapist;

    @ManyToOne
    @JoinColumn(name = "patient")
    private Patient patient;
}
