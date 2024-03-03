package com.example.airmed.Service.Inteface;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.SocialContext;

public interface SocialContextServ {
    SocialContext saveSocialContext(SocialContext socialContext);
    SocialContext getSocialConetextById(Long id);
    SocialContext findSocialContextByPatient(Patient patient);
    SocialContext updateSocialContext(SocialContext oldSocialContext, SocialContext newSocialContext);
    void deleteSocialContext(Long id);
}