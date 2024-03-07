package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Request;
import com.example.airmed.Repository.PsychiatristRepo;
import com.example.airmed.Service.Inteface.PsychiatristServ;
import com.example.airmed.Service.Inteface.RequestServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PsychiatristServImpl implements PsychiatristServ {
    private final PsychiatristRepo psychiatristRepo;
    @Autowired
    private RequestServ requestServ;
    @Autowired
    public PsychiatristServImpl(PsychiatristRepo psychiatristRepo){
        this.psychiatristRepo = psychiatristRepo;
    }
    @Override
    public Psychiatrist savePsychiatrist(Psychiatrist psychiatrist){
        return psychiatristRepo.save(psychiatrist);
    }
    @Override
    public List<Psychiatrist> getAllPsychiatists(){
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
    public Psychiatrist updatePsychiatrist(Psychiatrist old, Psychiatrist newPsychiatrist) {
        if(old != null && psychiatristRepo.existsById(old.getId())){
            if(newPsychiatrist.getFirstName() != null)
                old.setFirstName(newPsychiatrist.getFirstName());
            if(newPsychiatrist.getLastName() != null)
                old.setLastName(newPsychiatrist.getLastName());
            if(newPsychiatrist.getMail() != null)
                old.setMail(newPsychiatrist.getMail());
            if(newPsychiatrist.getPhone() != null)
                old.setPhone(newPsychiatrist.getPhone());
            if(newPsychiatrist.getPassword() != null)
                old.setPassword(newPsychiatrist.getPassword());
            if(newPsychiatrist.getCountry() != null)
                old.setCountry(newPsychiatrist.getCountry());
            if(newPsychiatrist.getLocality() != null)
                old.setLocality(newPsychiatrist.getLocality());
            if(newPsychiatrist.getCabinetLocation() != null)
                old.setCabinetLocation(newPsychiatrist.getCabinetLocation());
            if(newPsychiatrist.getLinkLocation() != null)
                old.setLinkLocation(newPsychiatrist.getLinkLocation());
            old.setPriceConsult(newPsychiatrist.getPriceConsult());
            old.setPriceConsultation(newPsychiatrist.getPriceConsultation());
            old.setOnline(newPsychiatrist.isOnline());
            old.setCNAS(newPsychiatrist.isCNAS());

            return psychiatristRepo.save(old);
        }
        return null;
    }

    @Override
    public void deletePsychiatrist(Long id){
        Psychiatrist psychiatrist = getPsychiatristById(id);
        if(psychiatrist != null){
            List<Request> requests = requestServ.getRequestByPsychiatrist(psychiatrist);
            for(Request request: requests)
                requestServ.deleteRequest(request.getId());

            psychiatristRepo.deleteById(id);
        }

    }
}
