package com.example.airmed.Controller;

import com.example.airmed.Entity.Note;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.SocialContext;
import com.example.airmed.Service.Inteface.PatientServ;
import com.example.airmed.Service.Inteface.PsychiatristServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PsychiatristCtrl {
    @Autowired
    PsychiatristServ psychiatristServ;

    // method: POST
    // link: baseURL + "/psychiatrist", body: psychiatrist as json
    // receive: 201
    @PostMapping("/psychiatrist")
    public ResponseEntity<Psychiatrist> savePsychiatrist(@Validated @RequestBody Psychiatrist psychiatrist){
        return new ResponseEntity<>(psychiatristServ.savePsychiatrist(psychiatrist), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/psychiatrist/all"
    // receive: json list + 302
    @GetMapping("/psychiatrist/all")
    public ResponseEntity<List<Psychiatrist>> getAllPsychiatrists(){
        return  new ResponseEntity<>(psychiatristServ.getAllPsychiatists(), HttpStatus.FOUND);
    }

    // method: GET
    // link: baseURL + "/psychiatrist/" + id
    // receive: json + 302 or 404
    @GetMapping("/psychiatrist/{id}")
    public ResponseEntity<Psychiatrist> getPsychiatristById(@PathVariable("id") Long id){
        Psychiatrist psychiatrist = psychiatristServ.getPsychiatristById(id);
        if(psychiatrist != null)
            return  new ResponseEntity<>(psychiatrist, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/psychiatrist?medicalNumber=" + medicalNumber
    // receive: json + 302 or 404
    @GetMapping("/psychiatrist")
    public ResponseEntity<Psychiatrist> getPsychiatristByMedicalNumber(@PathVariable("id") String medicalNumber){
        Psychiatrist psychiatrist = psychiatristServ.getPsychiatristByMedicalNumber(medicalNumber);
        if(psychiatrist != null)
            return  new ResponseEntity<>(psychiatrist, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/psychiatrist?mail=" + mail + "&password=" + password
    // receive: json + 200 - mail and password good
    //          json + 302 - mail good, password don't
    //                 404 - mail not good
    @GetMapping("/psychiatrist")
    public ResponseEntity<Psychiatrist> getPsychiatristByMailAndPassword(@RequestParam("mail")String mail,@RequestParam("password")String password){
        Psychiatrist psychiatrist = psychiatristServ.getPsychiatristByMail(mail);
        if(psychiatrist != null){
            if(psychiatrist.getPassword().equals(password))
                return new ResponseEntity<>(psychiatrist,HttpStatus.OK);
            return new ResponseEntity<>(HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: PUT
    // link: baseURL + "/psychiatrist/" + id
    // receive: json + 302 or 404
    @PutMapping("/psychiatrist/{id}")
    public ResponseEntity<Psychiatrist> updatePsychiatrist(@Validated @RequestBody Psychiatrist newPsychiatrist, @PathVariable("id") Long id){
        Psychiatrist old = psychiatristServ.getPsychiatristById(id);
        if(old != null)
            return new ResponseEntity<>(psychiatristServ.updatePsychiatrist(old,newPsychiatrist),HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: DELETE
    // link: baseURL + "/psychiatrist/" + psychiatristId
    // receive: 200 or 500
    @DeleteMapping("/psychiatrist/{id}")
    public ResponseEntity<String> deletePsychiatrist(@PathVariable("id") Long id) {
        try {
            psychiatristServ.deletePsychiatrist(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            String errorMessage = "Error deleting question and answers: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
