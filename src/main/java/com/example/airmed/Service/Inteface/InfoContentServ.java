package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.InfoContent;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;

import java.util.List;

public interface InfoContentServ {
    InfoContent saveInfoContent(InfoContent infoContent);
    List<InfoContent> getAllInfoContent();
    InfoContent getInfoContentById(Long id);
    List<InfoContent> getInfoContentByPsychiatrist(Psychiatrist psychiatrist);
    List<InfoContent> getInfoContentByPsychotherapist(Psychotherapist psychotherapist);
    void deleteInfoContentById(Long id);
}
