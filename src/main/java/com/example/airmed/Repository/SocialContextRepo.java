package com.example.airmed.Repository;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.SocialContext;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SocialContextRepo extends JpaRepository<SocialContext,Long> {
    Optional<SocialContext> findByPatient(Patient patient);
}
