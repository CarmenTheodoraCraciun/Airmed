package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.MedicalData;
import com.example.airmed.Entity.Patient;

public interface MedicalDataServ {
    MedicalData save(MedicalData medicalData);
    MedicalData getMedicalDataById(Long id);
    MedicalData getMedicalDataByPatient(Patient patient);
    MedicalData updateMedicalData(MedicalData old, MedicalData newMedicalData);
    void deleteMedicalData(Long id);
}
