package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.Note;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;

import java.util.List;

public interface NoteServ {
    Note saveNote(Note note);
    Note getNoteById(Long id);
    List<Note> getNoteByPatient(Patient patient);
    List<Note> getNoteByPsychotherapist(Psychotherapist psychotherapist);
    List<Note> getNoteByPsychiatrist(Psychiatrist psychiatrist);
    void deleteNote(Long id);
}
