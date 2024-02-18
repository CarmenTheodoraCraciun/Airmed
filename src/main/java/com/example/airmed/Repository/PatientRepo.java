package com.example.airmed.Repository;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
// Creating a repository interface for the 'Patient' entity, extending JpaRepository
public interface PatientRepo extends JpaRepository<Patient, Long> {
    // Query method to find a patient by Personal Numeric Code (PNC)
    Optional<Patient> findByPNC(String pnc);

    // Query method to find a patient by email
    Optional<Patient> findByMail(String mail);

    // Query method to find a list of patients associated with a Psychiatrist
    List<Patient> findByPsychiatrist(Psychiatrist psychiatrist);

    // Query method to find a list of patients associated with a Psychotherapist
    List<Patient> findByPsychotherapist(Psychotherapist psychotherapist);
}
