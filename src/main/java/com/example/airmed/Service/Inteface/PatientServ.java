package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;

import java.util.List;
import java.util.Optional;

public interface PatientServ {
    Patient savePatient(Patient patient);
    Patient getPatientById(Long id);
    Optional<Patient> getPatientByPNC(String pnc);
    Optional<Patient> getPatientByMailAndPassword(String mail, String password);
    List<Patient> getPatientsByPsychiatrist(Psychiatrist psychiatrist);
    List<Patient> getPatientsByPsychotherapist(Psychotherapist psychotherapist);
    void deletePatient(Long id);
}
