package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import com.example.airmed.Entity.Request;

import java.util.List;

public interface RequestServ {
    Request saveRequest(Request request);
    Request getRequestById(Long id);
    List<Request> getRequestByPatient(Patient patient);
    List<Request> getRequestByPsychotherapist(Psychotherapist psychotherapist);
    List<Request> getRequestByPsychiatrist(Psychiatrist psychiatrist);
    Request updateRequest(Request old,Request newRequest);
    void deleteRequest(Long id);
}
