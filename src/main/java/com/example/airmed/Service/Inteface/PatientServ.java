package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;

import java.util.List;
// Creating a service interface for the 'Patient' entity
public interface PatientServ {
    // Method to save or update a patient in the database
    Patient savePatient(Patient patient);

    // Method to retrieve a patient by their unique identifier (ID)
    Patient getPatientById(Long id);

    // Method to retrieve a patient by their Personal Numeric Code (PNC)
    Patient getPatientByPNC(String pnc);

    // Method to retrieve a patient by their email address
    Patient getPatientByMail(String mail);

    // Method to retrieve a list of patients associated with a Psychiatrist
    List<Patient> getPatientsByPsychiatrist(Psychiatrist psychiatrist);

    // Method to retrieve a list of patients associated with a Psychotherapist
    List<Patient> getPatientsByPsychotherapist(Psychotherapist psychotherapist);

    // Method to delete a patient by their unique identifier (ID)
    void deletePatient(Long id);
}
