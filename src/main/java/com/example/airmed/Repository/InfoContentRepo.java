package com.example.airmed.Repository;

import com.example.airmed.Entity.InfoContent;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InfoContentRepo extends JpaRepository<InfoContent,Long> {
    List<InfoContent> findByPsychotherapist(Psychotherapist psychotherapist);
    List<InfoContent> findByPsychiatrist(Psychiatrist psychiatrist);
}
