package com.example.airmed.Controller;

import com.example.airmed.Entity.ContactPerson;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.PsychiatricData;
import com.example.airmed.Service.Inteface.PatientServ;
import com.example.airmed.Service.Inteface.PsychiatricDataServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PsychiatricDataCtrl {
    @Autowired
    private PsychiatricDataServ psychiatricDataServ;
    @Autowired
    private PatientServ patientServ;

    // method: POST
    // link: baseURL + "/psychiatricData", body: json
    // receive: 201
    @PostMapping("/psychiatricData")
    public ResponseEntity<PsychiatricData> savePsychiatricData(@Validated @RequestBody PsychiatricData psychiatricData){
        return new ResponseEntity<>(psychiatricDataServ.savePsychiatricData(psychiatricData), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/psychiatricData/" + id
    // receive: json + 302 or 404
    @GetMapping("/psychiatricData/{id}")
    public ResponseEntity<PsychiatricData> getPsychiatricDataById(@PathVariable("id") Long id){
        PsychiatricData psychiatricData = psychiatricDataServ.getPsychiatricDataById(id);
        if(psychiatricData != null)
            return  new ResponseEntity<>(psychiatricData, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/psychiatricData?patient=" + patientId
    // receive: json list + 302 or 404
    @GetMapping("/psychiatricData")
    public ResponseEntity<List<PsychiatricData>> getContactPersonByPatient(@RequestParam("patient") Long id){
        Patient patient = patientServ.getPatientById(id);
        if(patient != null)
            return new ResponseEntity<>(psychiatricDataServ.getPsychiatricDataByPatient(patient),HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: PUT
    // link: baseURL + "/psychiatricData/" + id
    // receive: json + 302 or 404
    @PutMapping("/psychiatricData/{id}")
    public ResponseEntity<PsychiatricData> updatePsychiatricData(@Validated @RequestBody PsychiatricData newPsychiatricData,@PathVariable("id") Long id){
        PsychiatricData old = psychiatricDataServ.getPsychiatricDataById(id);
        if(old != null)
            return new ResponseEntity<>(psychiatricDataServ.updatePsychiatricData(old,newPsychiatricData),HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
