package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.PsychiatricData;

import java.util.List;

public interface PsychiatricDataServ  {
    PsychiatricData savePsychiatricData(PsychiatricData psychiatricData);
    PsychiatricData getPsychiatricDataById(Long id);
    List<PsychiatricData> getPsychiatricDataByPatient(Patient patient);
    PsychiatricData update(PsychiatricData old, PsychiatricData newPsychiatric);
    void deletePsychiatricData(Long id);
}
