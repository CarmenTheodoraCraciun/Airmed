package com.example.airmed.Controller;

import com.example.airmed.Entity.*;
import com.example.airmed.Service.Inteface.NoteServ;
import com.example.airmed.Service.Inteface.PatientServ;
import com.example.airmed.Service.Inteface.PsychiatristServ;
import com.example.airmed.Service.Inteface.PsychotherapistServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class NoteCtrl {
    @Autowired
    NoteServ noteServ;
    @Autowired
    PatientServ patientServ;
    @Autowired
    PsychiatristServ psychiatristServ;
    @Autowired
    PsychotherapistServ psychotherapistServ;

    // method: POST
    // link: baseURL + "/note", body: json
    // receive: 201
    @PostMapping("/note")
    public ResponseEntity<Note> saveNote(@Validated @RequestBody Note note){
        return new ResponseEntity<>(noteServ.saveNote(note), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/note/" + id
    // receive: json + 302 or 404
    @GetMapping("/note/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable("id") Long id){
        Note note = noteServ.getNoteById(id);
        if(note != null)
            return  new ResponseEntity<>(note, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/note/patient?patient=" + patientId
    // receive: json list + 302 or 404
    @GetMapping("/note/patient")
    public ResponseEntity<List<Note>> getNoteByPatient(@RequestParam("patient") Long id){
        Patient patient = patientServ.getPatientById(id);
        if(patient != null)
            return new ResponseEntity<>(noteServ.getNoteByPatient(patient),HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/note/psychiatrist?psychiatrist=" + psychiatristId
    // receive: json list + 302 or 404
    @GetMapping("/note/psychiatrist")
    public ResponseEntity<List<Note>> getNoteByPsychiatrist(@RequestParam("psychiatrist") Long id){
        Psychiatrist psychiatrist = psychiatristServ.getPsychiatristById(id);
        if(psychiatrist != null)
            return new ResponseEntity<>(noteServ.getNoteByPsychiatrist(psychiatrist),HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/note/pychotherapist?pychotherapist=" + pychotherapistId
    // receive: json list + 302 or 404
    @GetMapping("/note/pychotherapist")
    public ResponseEntity<List<Note>> getNoteByPsychotherapist(@RequestParam("psychotherapist") Long id){
        Psychotherapist psychotherapist = psychotherapistServ.getPsychotherapistById(id);
        if(psychotherapist != null)
            return new ResponseEntity<>(noteServ.getNoteByPsychotherapist(psychotherapist),HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
