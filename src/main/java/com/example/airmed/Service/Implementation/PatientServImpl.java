package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import com.example.airmed.Repository.PatientRepo;
import com.example.airmed.Service.Inteface.PatientServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class PatientServImpl implements PatientServ {
    private final PatientRepo patientRepository;

    @Autowired
    public PatientServImpl(PatientRepo patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    @Override
    public Optional<Patient> getPatientByPNC(String pnc) {
        return patientRepository.findByPNC(pnc);
    }

    @Override
    public Optional<Patient> getPatientByMailAndPassword(String mail, String password) {
        return patientRepository.findByMailAndPassword(mail, password);
    }

    @Override
    public List<Patient> getPatientsByPsychiatrist(Psychiatrist psychiatrist) {
        return patientRepository.findByPsychiatrist(psychiatrist);
    }

    @Override
    public List<Patient> getPatientsByPsychotherapist(Psychotherapist psychotherapist) {
        return patientRepository.findByPsychotherapist(psychotherapist);
    }

    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}