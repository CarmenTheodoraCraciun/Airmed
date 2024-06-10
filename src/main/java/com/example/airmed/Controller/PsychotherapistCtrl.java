package com.example.airmed.Controller;

import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Hashed;
import com.example.airmed.Entity.Psychotherapist;
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
public class PsychotherapistCtrl {
    @Autowired
    PsychotherapistServ psychotherapistServ;
    @Autowired
    PsychiatristServ psychiatristServ;
    @Autowired
    PatientServ patientServ;
    // method: POST
    // link: baseURL + "/psychotherapist", body: psychotherapist as json
    // receive: 201 - created
    //          208 - medicalNumber already in tha db
    //          302 - mail already in the db
    @PostMapping("/psychotherapist")
    public ResponseEntity<Psychotherapist> savePsychotherapist(@Validated @RequestBody Psychotherapist psychotherapist){
        return new ResponseEntity<>(psychotherapistServ.savePsychotherapist(psychotherapist), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/psychotherapist/all"
    // receive: json list + 302
    @GetMapping("/psychotherapist/all")
    public ResponseEntity<List<Psychotherapist>> getAllPsychotherapists(){
        return  new ResponseEntity<>(psychotherapistServ.getAllPsychotherapists(), HttpStatus.FOUND);
    }

    // method: GET
    // link: baseURL + "/psychotherapist/" + id
    // receive: json + 302 or 404
    @GetMapping("/psychotherapist/{id}")
    public ResponseEntity<Psychotherapist> getPsychotherapistById(@PathVariable("id") Long id){
        Psychotherapist psychotherapist = psychotherapistServ.getPsychotherapistById(id);
        if(psychotherapist != null)
            return  new ResponseEntity<>(psychotherapist, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/psychotherapist/medicalNumber?medicalNumber=" + medicalNumber
    // receive: json + 302 or 404
    @GetMapping("/psychotherapist/medicalNumber")
    public ResponseEntity<Psychotherapist> getPsychotherapistByMedicalNumber(@RequestParam("medicalNumber") String medicalNumber){
        Psychotherapist psychotherapist = psychotherapistServ.getPsychotherapistByMedicalNumber(medicalNumber);
        if(psychotherapist != null)
            return  new ResponseEntity<>(psychotherapist, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/psychotherapist/mail?mail=" + mail + "&password=" + password
    // receive: json + 200 - mail and password good
    //          json + 302 - mail good, password don't
    //                 404 - mail not good
    @GetMapping("/psychotherapist/mail")
    public ResponseEntity<Psychotherapist> getPsychotherapistByMailAndPassword(@RequestParam("mail")String mail,@RequestParam("password")String password){
        Psychotherapist psychotherapist = psychotherapistServ.getPsychotherapistByMail(mail);
        if(psychotherapist != null){
            if(psychotherapist.getPassword().equals(password)){
                psychotherapist.setPassword("-");
                return new ResponseEntity<>(psychotherapist,HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: PUT
    // link: baseURL + "/psychotherapist/" + id
    // receive: json + 302 or 404
    @PutMapping("/psychotherapist/{id}")
    public ResponseEntity<Psychotherapist> updatePsychotherapist(@Validated @RequestBody Psychotherapist newPsychotherapist, @PathVariable("id") Long id){
        Psychotherapist old = psychotherapistServ.getPsychotherapistById(id);
        if(old != null)
            return new ResponseEntity<>(psychotherapistServ.updatePsychotherapist(old,newPsychotherapist),HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: PUT
    // link: baseURL + "/patient/" + id + "/password??newPassword=" + password
    // receive: json + 302 or 404
    @PutMapping("/psychotherapist/{id}/password")
    public ResponseEntity<Psychotherapist> updatePasswordPsychotherapist(@PathVariable("id") Long id, @PathVariable("newPassword") String password){
        Psychotherapist old = psychotherapistServ.getPsychotherapistById(id);
        if(old != null && password != null)
            return new ResponseEntity<>(psychotherapistServ.updatPsychotherapistPassword(old,password),HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: DELETE
    // link: baseURL + "/psychotherapist/" + psychotherapistId
    // receive: 200 or 500
    @DeleteMapping("/psychotherapist/{id}")
    public ResponseEntity<String> deletePsychotherapist(@PathVariable("id") Long id) {
        try {
            psychotherapistServ.deletePsychotherapist(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            String errorMessage = "Error deleting question and answers: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
