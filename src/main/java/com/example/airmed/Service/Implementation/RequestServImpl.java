package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import com.example.airmed.Entity.Request;
import com.example.airmed.Repository.RequestRepo;
import com.example.airmed.Service.Inteface.RequestServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestServImpl implements RequestServ {
    private final RequestRepo requestRepo;
    @Autowired
    public RequestServImpl(RequestRepo requestRepo) {
        this.requestRepo = requestRepo;
    }

    @Override
    public Request saveRequest(Request request) {
        return requestRepo.save(request);
    }

    @Override
    public Request getRequestById(Long id) {
        return requestRepo.findById(id).orElse(null);
    }

    @Override
    public List<Request> getRequestByPatient(Patient patient) {
        return requestRepo.findRequestByPatient(patient);
    }

    @Override
    public List<Request> getRequestByPsychotherapist(Psychotherapist psychotherapist) {
        return requestRepo.findRequestByPsychotherapist(psychotherapist);
    }

    @Override
    public List<Request> getRequestByPsychiatrist(Psychiatrist psychiatrist) {
        return requestRepo.findRequestByPsychiatrist(psychiatrist);
    }

    @Override
    public Request updateRequest(Request old, Request newRequest) {
        if(old != null && requestRepo.existsById(old.getId())){
            old.setStatus(newRequest.isStatus());
            return requestRepo.save(old);
        }
        return null;
    }

    @Override
    public void deleteRequest(Long id) {
        requestRepo.deleteById(id);
    }
}
