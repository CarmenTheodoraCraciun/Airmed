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
    // link: baseURL + "/note/psychiatrist?psychiatrist=" + psychiatristId + "&patient=" + patientID
    // receive: json list + 302 or 404
    @GetMapping("/note/psychiatrist")
    public ResponseEntity<List<Note>> getNotesByPsychiatristAndPatient(@RequestParam("psychiatrist") Long psychiatristId,
                                                                       @RequestParam("patient") Long patientId) {
        Psychiatrist psychiatrist = psychiatristServ.getPsychiatristById(psychiatristId);
        Patient patient = patientServ.getPatientById(patientId);

        if (psychiatrist != null && patient != null) {
            List<Note> notes = noteServ.getNoteByPsychiatrist(psychiatrist, patient);
            if (!notes.isEmpty()) {
                return new ResponseEntity<>(notes, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/note/psychotherapist?psychotherapist=" + psychotherapistId + "&patient=" + patientID
    // receive: json list + 302 or 404
    @GetMapping("/note/psychotherapist")
    public ResponseEntity<List<Note>> getNotesByPsychotherapistAndPatient(@RequestParam("psychotherapist") Long psychotherapistId,
                                                                       @RequestParam("patient") Long patientId) {
        Psychotherapist psychotherapist = psychotherapistServ.getPsychotherapistById(psychotherapistId);
        Patient patient = patientServ.getPatientById(patientId);

        if (psychotherapist != null && patient != null) {
            List<Note> notes = noteServ.getNoteByPsychotherapist(psychotherapist, patient);
            if (!notes.isEmpty()) {
                return new ResponseEntity<>(notes, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/note/shared-with-patient?patient=" + patientID
    // receive: json list + 302 or 404
    @GetMapping("/note/shared-with-patient?patient=")
    public ResponseEntity<List<Note>> getAllSharedAllNotesWithPatient(@RequestParam("patient") Long patientId){
        Patient patient = patientServ.getPatientById(patientId);
        if(patient != null)
            return  new ResponseEntity<>(noteServ.getAllSharedAllNotesWithPatient(patient), HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/note/shared-with-specilist?specialist=" + specialistId + "&type=" + type + "&patient="  + patientID
    // receive: json list + 302 or 404
    @GetMapping("/note/shared-with-specialist")
    public ResponseEntity<List<Note>> findNotesSharedWithSpecialists(
            @RequestParam("specialist") Long specialistId,
            @RequestParam("type") String type,
            @RequestParam("patient") Long patientId) {
        Patient patient = patientServ.getPatientById(patientId);
        if (patient == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Note> notes;
        if ("psychiatrist".equalsIgnoreCase(type)) {
            Psychiatrist psychiatrist = psychiatristServ.getPsychiatristById(specialistId);
            if (psychiatrist == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            notes = noteServ.findNotesSharedWithSpecialists(patient, psychiatrist, null);
        } else if ("psychotherapist".equalsIgnoreCase(type)) {
            Psychotherapist psychotherapist = psychotherapistServ.getPsychotherapistById(specialistId);
            if (psychotherapist == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            notes = noteServ.findNotesSharedWithSpecialists(patient, null, psychotherapist);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (notes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }
}
