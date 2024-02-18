package com.example.airmed.Service.Inteface;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.SocialContext;

public interface SocialContextServ {
    SocialContext saveSocialContext(SocialContext socialContext);
    SocialContext getSocialConetextById(Long id);
    SocialContext findByPatient(Patient patient);
    void deleteSocialContext(Long id);
}
