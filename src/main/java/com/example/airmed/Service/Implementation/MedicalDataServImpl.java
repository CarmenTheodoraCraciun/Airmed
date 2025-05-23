package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.MedicalData;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Repository.MedicalDataRepo;
import com.example.airmed.Service.Inteface.MedicalDataServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicalDataServImpl implements MedicalDataServ {
    private final MedicalDataRepo medicalDataRepo;
    @Autowired
    public MedicalDataServImpl(MedicalDataRepo medicalDataRepo) {
        this.medicalDataRepo = medicalDataRepo;
    }

    @Override
    public MedicalData saveMedicalData(MedicalData medicalData) {
        return medicalDataRepo.save(medicalData);
    }

    @Override
    public MedicalData getMedicalDataById(Long id) {
        return medicalDataRepo.findById(id)
                .orElse(null);
    }

    @Override
    public MedicalData getMedicalDataByPatient(Patient patient) {
        return medicalDataRepo.findByPatient(patient)
                .orElse(null);
    }

    @Override
    public MedicalData updateMedicalData(MedicalData old, MedicalData newMedicalData) {
        if(old != null && medicalDataRepo.existsById(old.getId())){
            if(newMedicalData.getAllergies() != null)
                old.setAllergies(newMedicalData.getAllergies());
            if(newMedicalData.getWeight() != null)
                old.setWeight(newMedicalData.getWeight());
            if(newMedicalData.getHeight() != null)
                old.setHeight(newMedicalData.getHeight());
            old.setDiseases(newMedicalData.getDiseases());
            old.setMedecamentation(newMedicalData.getMedecamentation());
            old.setPregnant(newMedicalData.isPregnant());

            return medicalDataRepo.save(old);
        }
        return null;
    }

    @Override
    public void deleteMedicalData(Long id) {
        medicalDataRepo.deleteById(id);
    }
}
