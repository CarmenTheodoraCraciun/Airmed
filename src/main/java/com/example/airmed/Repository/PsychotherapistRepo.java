package com.example.airmed.Repository;

import com.example.airmed.Entity.Psychotherapist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PsychotherapistRepo extends JpaRepository<Psychotherapist, Long> {
    Optional<Psychotherapist> findByMedicalNumber(String medicalNumber);
    Optional<Psychotherapist> findByMail(String mail);
}
