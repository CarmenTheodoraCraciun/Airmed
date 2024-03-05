package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.PsychiatricData;
import com.example.airmed.Repository.PsychiatricDataRepo;
import com.example.airmed.Service.Inteface.PsychiatricDataServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PsychiatricDataServImpl implements PsychiatricDataServ {
    private final PsychiatricDataRepo psychiatricDataRepo;
    @Autowired
    public PsychiatricDataServImpl(PsychiatricDataRepo psychiatricDataRepo) {
        this.psychiatricDataRepo = psychiatricDataRepo;
    }

    @Override
    public PsychiatricData savePsychiatricData(PsychiatricData psychiatricData) {
        return psychiatricDataRepo.save(psychiatricData);
    }

    @Override
    public PsychiatricData getPsychiatricDataById(Long id) {
        return psychiatricDataRepo.findById(id)
                .orElse(null);
    }

    @Override
    public List<PsychiatricData> getPsychiatricDataByPatient(Patient patient) {
        return psychiatricDataRepo.findByPatient(patient);
    }

    @Override
    public PsychiatricData updatePsychiatricData(PsychiatricData old, PsychiatricData newPsychiatric) {
        if(old != null && psychiatricDataRepo.existsById(old.getId())){
            old.setDiagnostics(newPsychiatric.getDiagnostics());
            old.setHospitalization(newPsychiatric.isHospitalization());
            old.setAntidepressant(newPsychiatric.getAntidepressant());
            old.setMoodStabilizers(newPsychiatric.getMoodStabilizers());
            old.setAntipsychotics(newPsychiatric.getAntipsychotics());
            old.setSuicideThoughts(newPsychiatric.getSuicideThoughts());

            return psychiatricDataRepo.save(old);
        }
        return null;
    }

    @Override
    public void deletePsychiatricData(Long id) {
        psychiatricDataRepo.deleteById(id);
    }
}
