package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import com.example.airmed.Repository.PatientRepo;
import com.example.airmed.Service.Inteface.PatientServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
// Service implementation for the Patient entity
@Service
public class PatientServImpl implements PatientServ {
    // Injecting the PatientRepo dependency using constructor injection
    private final PatientRepo patientRepo;

    @Autowired
    public PatientServImpl(PatientRepo patientRepository) {
        this.patientRepo = patientRepository;
    }

    // Method to save or update a patient in the database
    @Override
    public Patient savePatient(Patient patient) {
        return patientRepo.save(patient);
    }

    // Method to retrieve a patient by their unique identifier (ID)
    // Return the patient data or null if not exist
    @Override
    public Patient getPatientById(Long id) {
        return patientRepo.findById(id)
                .orElse(null);
    }

    // Method to retrieve a patient by their Personal Numeric Code (PNC)
    @Override
    public Patient getPatientByPNC(String pnc) {
        return patientRepo.findByPNC(pnc)
                .orElse(null);
    }

    // Method to retrieve a patient by their email address
    @Override
    public Patient getPatientByMail(String mail) {
        return patientRepo.findByMail(mail)
                .orElse(null);
    }

    // Method to retrieve a list of patients associated with a Psychiatrist
    @Override
    public List<Patient> getPatientsByPsychiatrist(Psychiatrist psychiatrist) {
        return patientRepo.findByPsychiatrist(psychiatrist);
    }

    // Method to retrieve a list of patients associated with a Psychotherapist
    @Override
    public List<Patient> getPatientsByPsychotherapist(Psychotherapist psychotherapist) {
        return patientRepo.findByPsychotherapist(psychotherapist);
    }

    // Method to delete a patient by their unique identifier (ID)
    @Override
    public void deletePatient(Long id) {
        patientRepo.deleteById(id);
    }
}