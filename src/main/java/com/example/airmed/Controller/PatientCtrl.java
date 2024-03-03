package com.example.airmed.Controller;

import com.example.airmed.Entity.Patient;
import com.example.airmed.Service.Inteface.PatientServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PatientCtrl {
    @Autowired
    public PatientServ patientServ;

    // method: POST, link: baseURL + "/patient", body: patient as json
    // receive: 201
    @PostMapping("/patient")
    public ResponseEntity<Patient> savePatient(@Validated @RequestBody Patient patient){
        return new ResponseEntity<>(patientServ.savePatient(patient), HttpStatus.CREATED);
    }

    @GetMapping("/patient")
    public ResponseEntity<Patient> getUserByMail(@RequestParam("mail")String mail,@RequestParam("password")String password){
        Patient patient = patientServ.getPatientByMail(mail);
        if(patient != null){
            if(patient.getPassword().equals(password))
                return new ResponseEntity<>(patient.getPatient(),HttpStatus.OK);
            return new ResponseEntity<>(HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
