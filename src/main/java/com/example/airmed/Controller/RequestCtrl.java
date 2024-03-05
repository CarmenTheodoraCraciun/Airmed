package com.example.airmed.Controller;

import com.example.airmed.Entity.*;
import com.example.airmed.Service.Inteface.PatientServ;
import com.example.airmed.Service.Inteface.PsychiatristServ;
import com.example.airmed.Service.Inteface.PsychotherapistServ;
import com.example.airmed.Service.Inteface.RequestServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class RequestCtrl {
    @Autowired
    private RequestServ requestServ;
    @Autowired
    PatientServ patientServ;
    @Autowired
    PsychiatristServ psychiatristServ;
    @Autowired
    PsychotherapistServ psychotherapistServ;

    // method: POST
    // link: baseURL + "/request", body: json
    // receive: 201
    @PostMapping("/request")
    public ResponseEntity<Request> saveRequest(@Validated @RequestBody Request request){
        return new ResponseEntity<>(requestServ.saveRequest(request), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/request/" + id
    // receive: json + 302 or 404
    @GetMapping("/request/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable("id") Long id){
        Request request = requestServ.getRequestById(id);
        if(request != null)
            return new ResponseEntity<>(request, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/request/" + patientId
    // receive: json list + 302 or 404
    @GetMapping("/request")
    public ResponseEntity<List<Request>> getRequestByPatient(@PathVariable("patient") Long id){
        Patient patient = patientServ.getPatientById(id);
        if(patient != null)
            return new ResponseEntity<>(requestServ.getRequestByPatient(patient), HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/request/" + psychiatrisId
    // receive: json list + 302 or 404
    @GetMapping("/request")
    public ResponseEntity<List<Request>> getRequestByPsychiatrist(@PathVariable("psychiatrist") Long id){
        Psychiatrist psychiatrist = psychiatristServ.getPsychiatristById(id);
        if(psychiatrist != null)
            return new ResponseEntity<>(requestServ.getRequestByPsychiatrist(psychiatrist), HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/request/" + psychtherapistId
    // receive: json list + 302 or 404
    @GetMapping("/request")
    public ResponseEntity<List<Request>> getRequestByPsychotherapist(@PathVariable("psychotherapist") Long id){
        Psychotherapist psychotherapist = psychotherapistServ.getPsychotherapistById(id);
        if(psychotherapist != null)
            return new ResponseEntity<>(requestServ.getRequestByPsychotherapist(psychotherapist), HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: PUT
    // link: baseURL + "/request/" + id
    // receive: json + 302 or 404
    @PutMapping("/request/{id}")
    public ResponseEntity<Request> updateRequest(@Validated @RequestBody Request newRequest,@PathVariable("id") Long id){
        Request old = requestServ.getRequestById(id);
        if(old != null)
            return new ResponseEntity<>(requestServ.updateRequest(old,newRequest),HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: DELETE
    // link: baseURL + "/request/" + infoContentId
    // receive: 200 or 500
    @DeleteMapping("/request/{id}")
    public ResponseEntity<String> deleteInfoContent(@PathVariable("id") Long id){
        try{
            requestServ.deleteRequest(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            String errorMessage = "Error deleting request: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
