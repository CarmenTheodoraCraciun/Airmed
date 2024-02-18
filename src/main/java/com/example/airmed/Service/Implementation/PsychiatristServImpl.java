package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Repository.PsychiatristRepo;
import com.example.airmed.Service.Inteface.PsychiatristServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PsychiatristServImpl implements PsychiatristServ {
    private final PsychiatristRepo psychiatristRepo;
    @Autowired
    public PsychiatristServImpl(PsychiatristRepo psychiatristRepo){
        this.psychiatristRepo = psychiatristRepo;
    }
    @Override
    public Psychiatrist savePsychiatrist(Psychiatrist psychiatrist){
        return psychiatristRepo.save(psychiatrist);
    }
    @Override
    public List<Psychiatrist> getAll(){
        return psychiatristRepo.findAll();
    }
    @Override
    public Psychiatrist getPsychiatristById(Long id){
        return psychiatristRepo.findById(id)
                .orElse(null);
    }
    @Override
    public Psychiatrist getPsychiatristByMedicalNumber(String medicalNumber){
        return psychiatristRepo.findByMedicalNumber(medicalNumber)
                .orElse(null);
    }
    @Override
    public Psychiatrist getPsychiatristByMail(String mail){
        return psychiatristRepo.findByMail(mail)
                .orElse(null);
    }
    @Override
    public void deletePsychiatrist(Long id){
        psychiatristRepo.deleteById(id);
    }
}
