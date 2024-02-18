package com.example.airmed.Repository;

import com.example.airmed.Entity.Note;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepo extends JpaRepository<Note,Long> {
    List<Note> findByPatient(Patient patient);
    List<Note> findByPsychiatrist(Psychiatrist psychiatrist);
    List<Note> findByPsychotherapist(Psychotherapist psychotherapist);
}
