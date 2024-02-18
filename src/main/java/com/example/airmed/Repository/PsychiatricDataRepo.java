package com.example.airmed.Repository;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.PsychiatricData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PsychiatricDataRepo extends JpaRepository<PsychiatricData,Long> {
    List<PsychiatricData> findByPatient(Patient patient);
}