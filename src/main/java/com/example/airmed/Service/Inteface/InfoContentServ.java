package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.InfoContent;

import java.util.List;

public interface InfoContentServ {
    InfoContent saveInfoContact(InfoContent infoContent);
    List<InfoContent> getAll();
    InfoContent getById(Long id);
    void deleteById(Long id);
}
