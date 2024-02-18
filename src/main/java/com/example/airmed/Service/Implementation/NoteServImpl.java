package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.Note;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import com.example.airmed.Repository.NoteRepo;
import com.example.airmed.Service.Inteface.NoteServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteServImpl implements NoteServ {
    private final NoteRepo noteRepo;
    @Autowired
    public NoteServImpl(NoteRepo noteRepo) {
        this.noteRepo = noteRepo;
    }

    @Override
    public Note saveNote(Note note) {
        return noteRepo.save(note);
    }

    @Override
    public Note getNoteById(Long id) {
        return noteRepo.findById(id)
                .orElse(null);
    }

    @Override
    public List<Note> getNoteByPatient(Patient patient) {
        return noteRepo.findByPatient(patient);
    }

    @Override
    public List<Note> getNoteByPsychotherapist(Psychotherapist psychotherapist) {
        return noteRepo.findByPsychotherapist(psychotherapist);
    }

    @Override
    public List<Note> getNoteByPsychiatrist(Psychiatrist psychiatrist) {
        return noteRepo.findByPsychiatrist(psychiatrist);
    }

    @Override
    public void deleteNote(Long id) {
        noteRepo.deleteById(id);
    }
}
