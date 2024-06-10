package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.Psychotherapist;

import java.util.List;

public interface PsychotherapistServ {
    Psychotherapist savePsychotherapist(Psychotherapist psychotherapist);
    List<Psychotherapist> getAllPsychotherapists();
    Psychotherapist getPsychotherapistById(Long id);
    Psychotherapist getPsychotherapistByMedicalNumber(String medicalNumber);
    Psychotherapist getPsychotherapistByMail(String mail);
    Psychotherapist updatePsychotherapist(Psychotherapist old, Psychotherapist newPsychotherapist);

    Psychotherapist updatPsychotherapistPassword(Psychotherapist old, String password);

    void deletePsychotherapist(Long id);
}
