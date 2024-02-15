package com.example.airmed.Repository;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatientRepo extends JpaRepository<Patient, Long> {
    Optional<Patient> findByPNC(String pnc);
    Optional<Patient> findByMailAndPassword(String mail, String password);
    List<Patient> findByPsychiatrist(Psychiatrist psychiatrist);
    List<Patient> findByPsychotherapist(Psychotherapist psychotherapist);
}
