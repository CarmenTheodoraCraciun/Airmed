package com.example.airmed.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class InfoContent {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false, length = 9999999)
    private String content;

    @Column(nullable = false)
    private String imgLink;

    @Column(nullable = false)
    private String tags;

    @ManyToOne
    @JoinColumn(name = "specialist", nullable = false)
    private Psychiatrist psychiatrist;

    @ManyToOne
    @JoinColumn(name = "specialist", nullable = false)
    private Psychotherapist psychotherapist;
}
