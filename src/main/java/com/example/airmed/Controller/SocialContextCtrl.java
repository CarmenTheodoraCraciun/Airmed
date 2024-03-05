package com.example.airmed.Controller;

import com.example.airmed.Entity.Answer;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Question;
import com.example.airmed.Entity.SocialContext;
import com.example.airmed.Service.Inteface.PatientServ;
import com.example.airmed.Service.Inteface.SocialContextServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class SocialContextCtrl {
    @Autowired
    private SocialContextServ socialContextServ;
    @Autowired
    private PatientServ patientServ;

    // method: POST
    // link: baseURL + "/socialContext", body: json
    // receive: 201
    @PostMapping("/socialContext")
    public ResponseEntity<SocialContext> saveSocialContext(@Validated @RequestBody SocialContext socialContext){
        return new ResponseEntity<>(socialContextServ.saveSocialContext(socialContext), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/socialContext/" + id
    // receive: json + 302 or 404
    @GetMapping("/socialContext/{id}")
    public ResponseEntity<SocialContext> getSocialContextById(@PathVariable("id") Long id){
        SocialContext context = socialContextServ.getSocialConetextById(id);
        if(context != null)
            return  new ResponseEntity<>(context, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    // method: GET
    // link: baseURL + "/socialContext?patient=" + patientId
    // receive: json list + 302 or 404
    @GetMapping("/socialContext")
    public ResponseEntity<SocialContext> getSocialContextByPatient(@RequestParam("patient") Long id){
        Patient patient = patientServ.getPatientById(id);
        if(patient != null){
            SocialContext socialContexts = socialContextServ.findSocialContextByPatient(patient);
            if(socialContexts != null)
                return new ResponseEntity<>(socialContexts,HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: PUT
    // link: baseURL + "/socialContext/" + id
    // receive: json + 302 or 404
    @PutMapping("/socialContext/{id}")
    public ResponseEntity<SocialContext> updateSocialContext(@Validated @RequestBody SocialContext newSocialContext,@PathVariable("id") Long id){
        SocialContext oldSocialContext = socialContextServ.getSocialConetextById(id);
        if(oldSocialContext != null)
            return new ResponseEntity<>(socialContextServ.updateSocialContext(oldSocialContext,newSocialContext),HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
