package com.example.airmed.Repository;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import com.example.airmed.Entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepo extends JpaRepository<Request, Long> {
    List<Request> findRequestByPatient(Patient patient);
    List<Request> findRequestByPsychiatrist(Psychiatrist psychiatrist);
    List<Request> findRequestByPsychotherapist(Psychotherapist psychotherapist);
}
