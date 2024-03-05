package com.example.airmed.Controller;

import com.example.airmed.Entity.MedicalData;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Question;
import com.example.airmed.Entity.SocialContext;
import com.example.airmed.Service.Inteface.MedicalDataServ;
import com.example.airmed.Service.Inteface.PatientServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class MedicalDataCtrl {
    @Autowired
    private MedicalDataServ medicalDataServ;
    @Autowired
    private PatientServ patientServ;
    // method: POST
    // link: baseURL + "/medicalData", body: json
    // receive: 201
    @PostMapping("/medicalData")
    public ResponseEntity<MedicalData> saveMedicalData(@Validated @RequestBody MedicalData medicalData){
        return new ResponseEntity<>(medicalDataServ.saveMedicalData(medicalData), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/medicalData/" + medicalDataId
    // receive: json + 302 or 404
    @GetMapping("/medicalData/{id}")
    public ResponseEntity<MedicalData> getMedicalDataById(@PathVariable("id") Long id){
        MedicalData medicalData = medicalDataServ.getMedicalDataById(id);
        if(medicalData != null)
            return  new ResponseEntity<>(medicalData, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/medicalData/" + patientId
    // receive: json list + 302 or 404
    @GetMapping("/medicalData")
    public ResponseEntity<MedicalData> getMedicalDataByPatient(@PathVariable("patient") Long id){
        Patient patient = patientServ.getPatientById(id);
        if(patient != null) {
            MedicalData medicalData = medicalDataServ.getMedicalDataByPatient(patient);
            if (medicalData != null)
                return new ResponseEntity<>(medicalData, HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: PUT
    // link: baseURL + "/medicalData/" + id
    // receive: json + 302 or 404
    @PutMapping("/medicalData/{id}")
    public ResponseEntity<MedicalData> updateMedical(@Validated @RequestBody MedicalData newMedicalData, @PathVariable("id") Long id){
        MedicalData old = medicalDataServ.getMedicalDataById(id);
        if(old != null)
            return new ResponseEntity<>(medicalDataServ.updateMedicalData(old,newMedicalData),HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
