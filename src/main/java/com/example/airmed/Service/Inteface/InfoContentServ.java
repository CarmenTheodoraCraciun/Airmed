package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.InfoContent;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;

import java.util.List;

public interface InfoContentServ {
    InfoContent saveInfoContact(InfoContent infoContent);
    List<InfoContent> getAllInfoContact();
    InfoContent getInfoContactById(Long id);
    List<InfoContent> getInfoContactByPsychiatrist(Psychiatrist psychiatrist);
    List<InfoContent> getInfoContactByPsychotherapist(Psychotherapist psychotherapist);
    void deleteInfoContactById(Long id);
}
