package com.example.airmed.Repository;

import com.example.airmed.Entity.Psychiatrist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PsychiatristRepo extends JpaRepository<Psychiatrist, Long> {
    Optional<Psychiatrist> findByMedicalNumber(String medicalNumber);
    Optional<Psychiatrist> findByMail(String mail);
}
