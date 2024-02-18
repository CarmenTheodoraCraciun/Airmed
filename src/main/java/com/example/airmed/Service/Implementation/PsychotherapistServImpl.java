package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.Psychotherapist;
import com.example.airmed.Repository.PsychotherapistRepo;
import com.example.airmed.Service.Inteface.PsychotherapistServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PsychotherapistServImpl implements PsychotherapistServ {
    private final PsychotherapistRepo psychotherapistRepo;
    @Autowired
    public PsychotherapistServImpl(PsychotherapistRepo psychotherapistRepo){
        this.psychotherapistRepo = psychotherapistRepo;
    }
    @Override
    public Psychotherapist savePsychotherapist(Psychotherapist psychotherapist){
        return psychotherapistRepo.save(psychotherapist);
    }
    @Override
    public List<Psychotherapist> getAll(){
        return psychotherapistRepo.findAll();
    }
    @Override
    public Psychotherapist getPsychotherapistById(Long id){
        return psychotherapistRepo.findById(id)
                .orElse(null);
    }
    @Override
    public Psychotherapist getPsychotherapistByMedicalNumber(String medicalNumber){
        return psychotherapistRepo.findByMedicalNumber(medicalNumber)
                .orElse(null);
    }
    @Override
    public Psychotherapist getPsychotherapistByMail(String mail){
        return psychotherapistRepo.findByMail(mail)
                .orElse(null);
    }
    @Override
    public void deletePsychotherapist(Long id){
        psychotherapistRepo.deleteById(id);
    }
}
