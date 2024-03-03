package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.Psychiatrist;

import java.util.List;

public interface PsychiatristServ {
    Psychiatrist savePsychiatrist(Psychiatrist psychiatrist);
    List<Psychiatrist> getAllPsychiatists();
    Psychiatrist getPsychiatristById(Long id);
    Psychiatrist getPsychiatristByMedicalNumber(String medicalNumber);
    Psychiatrist getPsychiatristByMail(String mail);
    Psychiatrist updatePsychiatrist(Psychiatrist old, Psychiatrist newPsychiatrist);

    void deletePsychiatrist(Long id);
}
