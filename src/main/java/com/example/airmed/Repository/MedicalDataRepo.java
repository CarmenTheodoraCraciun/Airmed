package com.example.airmed.Repository;

import com.example.airmed.Entity.MedicalData;
import com.example.airmed.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedicalDataRepo extends JpaRepository<MedicalData,Long> {
    Optional<MedicalData> findByPatient(Patient patient);
}
