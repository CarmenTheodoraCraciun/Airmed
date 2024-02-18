package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.Psychotherapist;

import java.util.List;

public interface PsychotherapistServ {
    Psychotherapist savePsychotherapist(Psychotherapist psychotherapist);
    List<Psychotherapist> getAll();
    Psychotherapist getPsychotherapistById(Long id);
    Psychotherapist getPsychotherapistByMedicalNumber(String medicalNumber);
    Psychotherapist getPsychotherapistByMail(String mail);
    void deletePsychotherapist(Long id);
}
