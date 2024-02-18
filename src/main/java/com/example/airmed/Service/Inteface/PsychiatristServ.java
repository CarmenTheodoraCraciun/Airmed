package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.Psychiatrist;

import java.util.List;

public interface PsychiatristServ {
    Psychiatrist savePsychiatrist(Psychiatrist psychiatrist);
    List<Psychiatrist> getAll();
    Psychiatrist getPsychiatristById(Long id);
    Psychiatrist getPsychiatristByMedicalNumber(String medicalNumber);
    Psychiatrist getPsychiatristByMail(String mail);
    void deletePsychiatrist(Long id);
}
