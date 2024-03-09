package com.example.airmed.Controller;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import com.example.airmed.Hashed;
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
public class PatientCtrl {
    @Autowired
    public PatientServ patientServ;
    @Autowired
    PsychiatristServ psychiatristServ;
    @Autowired
    PsychotherapistServ psychotherapistServ;
    // method: POST
    // link: baseURL + "/patient", body: patient as json
    // receive: 201
    @PostMapping("/patient")
    public ResponseEntity<Patient> savePatient(@Validated @RequestBody Patient patient){
        return new ResponseEntity<>(patientServ.savePatient(patient), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/patient/" + id
    // receive: json + 302 or 404
    @GetMapping("/patient/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable("id") Long id){
        Patient patient = patientServ.getPatientById(id);
        if(patient != null)
            return  new ResponseEntity<>(patient, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/patient/mail?mail=" + mail + "&password=" + password
    // receive: json + 200 - mail and password good
    //          json + 302 - mail good, password don't
    //                 404 - mail not good
    @GetMapping("/patient/mail")
    public ResponseEntity<Patient> getPatientByMailAndPassword(@RequestParam("mail") String mail, @RequestParam("password") String password) {
        Patient patient = patientServ.getPatientByMail(mail);
        if (patient != null) {
            if (Hashed.verifyHashData(password,patient.getSalts().get("password"),patient.getPassword())) {
                patient.setPassword("-");
                return new ResponseEntity<>(patient, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/patient/PNC?PNC=" + pnc
    // receive: json + 200 or 404
    @GetMapping("/patient/PNC")
    public ResponseEntity<Patient> getUserByPNC(@RequestParam("PNC")String pnc){
        Patient patient = patientServ.getPatientByPNC(pnc);
        if(patient != null)
            return new ResponseEntity<>(patient,HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/patient/psychiatrist?psychiatrist" + psychiatristId
    // receive: json list 302 or 404
    @GetMapping("/patient/psychiatrist")
    public ResponseEntity<List<Patient>> getPatientByPsychiatrist(@RequestParam("psychiatrist")Long id){
        Psychiatrist psychiatrist = psychiatristServ.getPsychiatristById(id);
        if(psychiatrist != null)
            return new ResponseEntity<>(patientServ.getPatientsByPsychiatrist(psychiatrist),HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/patient/psychotherapist?psychotherapist" + psychotherapistId
    // receive: json list 302 or 404
    @GetMapping("/patient/psychotherapist")
    public ResponseEntity<List<Patient>> getPatientByPsychotherapist(@RequestParam("psychotherapist")Long id){
        Psychotherapist psychotherapist = psychotherapistServ.getPsychotherapistById(id);
        if(psychotherapist != null)
            return new ResponseEntity<>(patientServ.getPatientsByPsychotherapist(psychotherapist),HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: PUT
    // link: baseURL + "/patient/" + id + json patient
    // receive: json + 302 or 404
    @PutMapping("/patient/{id}")
    public ResponseEntity<Patient> updatePatient(@Validated @RequestBody Patient newPatient, @PathVariable("id") Long id){
        Patient old = patientServ.getPatientById(id);
        if(old != null)
            return new ResponseEntity<>(patientServ.updatePatient(old,newPatient),HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: PUT
    // link: baseURL + "/patient/psychiatrist/" + id + json psychiatrist or null
    // receive: json + 302, 200 or 404
    @PutMapping("/patient/psychiatrist/{id}")
    public ResponseEntity<Patient> updatePsychiatristInPatient(@Validated @RequestBody(required = false) Psychiatrist psychiatrist, @PathVariable("id") Long id) {
        Patient patient = patientServ.getPatientById(id);
        if (patient != null) {
            if (psychiatrist != null)
                return new ResponseEntity<>(patientServ.updatePsychiatristInPatient(patient, psychiatrist), HttpStatus.OK);
            else {
                if (patient.getPsychiatrist() != null)
                    return new ResponseEntity<>(patientServ.removePsychiatristInPatient(patient), HttpStatus.OK);
                else
                    return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: PUT
    // link: baseURL + "/patient/psychotherapist/" + id + json psychotherapist or null
    // receive: json + 302, 200 or 404
    @PutMapping("/patient/psychotherapist/{id}")
    public ResponseEntity<Patient> updatePsychotherapistInPatient(@Validated @RequestBody(required = false) Psychotherapist psychotherapist, @PathVariable("id") Long id) {
        Patient patient = patientServ.getPatientById(id);
        if (patient != null) {
            if (psychotherapist != null)
                return new ResponseEntity<>(patientServ.updatePsychotherapistInPatient(patient, psychotherapist), HttpStatus.OK);
            else {
                if (patient.getPsychiatrist() != null)
                    return new ResponseEntity<>(patientServ.removePsychotherapistInPatient(patient), HttpStatus.OK);
                else
                    return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: DELETE, also deleting all the history of the patient
    // link: baseURL + "/patient/" + id
    // receive: 200 or 500
    @DeleteMapping("/patient/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable("id") Long id) {
        try {
            patientServ.deletePatient(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            String errorMessage = "Error deleting the patient data: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
