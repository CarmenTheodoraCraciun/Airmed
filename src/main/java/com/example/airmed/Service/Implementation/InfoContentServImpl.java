package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.InfoContent;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
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
    public InfoContent saveInfoContent(InfoContent infoContent) {
        return infoContentRepo.save(infoContent);
    }

    @Override
    public List<InfoContent> getAllInfoContent() {
        return infoContentRepo.findAll();
    }

    @Override
    public InfoContent getInfoContentById(Long id) {
        return infoContentRepo.findById(id)
                .orElse(null);
    }

    @Override
    public List<InfoContent> getInfoContentByPsychiatrist(Psychiatrist psychiatrist) {
        return infoContentRepo.findByPsychiatrist(psychiatrist);
    }

    @Override
    public List<InfoContent> getInfoContentByPsychotherapist(Psychotherapist psychotherapist) {
        return infoContentRepo.findByPsychotherapist(psychotherapist);
    }

    @Override
    public void deleteInfoContentById(Long id) {
        infoContentRepo.deleteById(id);
    }
}
