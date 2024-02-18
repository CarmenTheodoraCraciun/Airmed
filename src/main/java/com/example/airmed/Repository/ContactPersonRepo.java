package com.example.airmed.Repository;

import com.example.airmed.Entity.ContactPerson;
import com.example.airmed.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactPersonRepo  extends JpaRepository<ContactPerson,Long> {
    List<ContactPerson> findByPatient(Patient patient);
}
