package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.InfoContent;
import com.example.airmed.Repository.InfoContentRepo;
import com.example.airmed.Service.Inteface.InfoContentServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InfoContentServImpl implements InfoContentServ {
    private final InfoContentRepo infoContentRepo;
    @Autowired
    public InfoContentServImpl(InfoContentRepo infoContentRepo) {
        this.infoContentRepo = infoContentRepo;
    }

    @Override
    public InfoContent saveInfoContact(InfoContent infoContent) {
        return infoContentRepo.save(infoContent);
    }

    @Override
    public List<InfoContent> getAll() {
        return infoContentRepo.findAll();
    }

    @Override
    public InfoContent getById(Long id) {
        return infoContentRepo.findById(id)
                .orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        infoContentRepo.deleteById(id);
    }
}
