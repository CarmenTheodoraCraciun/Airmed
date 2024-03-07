package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.Psychotherapist;
import com.example.airmed.Entity.Request;
import com.example.airmed.Repository.PsychotherapistRepo;
import com.example.airmed.Service.Inteface.PsychotherapistServ;
import com.example.airmed.Service.Inteface.RequestServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PsychotherapistServImpl implements PsychotherapistServ {
    private final PsychotherapistRepo psychotherapistRepo;
    @Autowired
    private RequestServ requestServ;
    @Autowired
    public PsychotherapistServImpl(PsychotherapistRepo psychotherapistRepo){
        this.psychotherapistRepo = psychotherapistRepo;
    }
    @Override
    public Psychotherapist savePsychotherapist(Psychotherapist psychotherapist){
        return psychotherapistRepo.save(psychotherapist);
    }
    @Override
    public List<Psychotherapist> getAllPsychotherapists(){
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
    public Psychotherapist updatePsychotherapist(Psychotherapist old, Psychotherapist newPsychotherapist) {
        if(old != null && psychotherapistRepo.existsById(old.getId())){
            if(newPsychotherapist.getFirstName() != null)
                old.setFirstName(newPsychotherapist.getFirstName());
            if(newPsychotherapist.getLastName() != null)
                old.setLastName(newPsychotherapist.getLastName());
            if(newPsychotherapist.getMail() != null)
                old.setMail(newPsychotherapist.getMail());
            if(newPsychotherapist.getPhone() != null)
                old.setPhone(newPsychotherapist.getPhone());
            if(newPsychotherapist.getPassword() != null)
                old.setPassword(newPsychotherapist.getPassword());
            if(newPsychotherapist.getCountry() != null)
                old.setCountry(newPsychotherapist.getCountry());
            if(newPsychotherapist.getLocality() != null)
                old.setLocality(newPsychotherapist.getLocality());
            if(newPsychotherapist.getCabinetLocation() != null)
                old.setCabinetLocation(newPsychotherapist.getCabinetLocation());
            if(newPsychotherapist.getLinkLocation() != null)
                old.setLinkLocation(newPsychotherapist.getLinkLocation());
            old.setPriceConsult(newPsychotherapist.getPriceConsult());
            old.setPriceConsultation(newPsychotherapist.getPriceConsultation());
            old.setOnline(newPsychotherapist.isOnline());
            old.setCNAS(newPsychotherapist.isCNAS());

            return psychotherapistRepo.save(old);
        }
        return null;
    }

    @Override
    public void deletePsychotherapist(Long id){
        Psychotherapist psychotherapist = getPsychotherapistById(id);
        List<Request> requests = requestServ.getRequestByPsychotherapist(psychotherapist);
        for(Request request: requests)
            requestServ.deleteRequest(request.getId());

        psychotherapistRepo.deleteById(id);
    }
}
