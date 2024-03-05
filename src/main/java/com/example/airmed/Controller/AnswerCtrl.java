package com.example.airmed.Controller;

import com.example.airmed.Entity.Answer;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Service.Inteface.AnswerServ;
import com.example.airmed.Service.Inteface.PatientServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AnswerCtrl {
    @Autowired
    private AnswerServ answerServ;
    @Autowired
    private PatientServ patientServ;

    // method: POST
    // link: baseURL + "/answer", body: json
    // receive: 201
    @PostMapping("/answer")
    public ResponseEntity<Answer> addAnswer(@Validated @RequestBody Answer answer){
        return new ResponseEntity<>(answerServ.saveAnswer(answer), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/answer" + id
    // receive: json + 302 or 404
    @GetMapping("/answer/{id}")
    public ResponseEntity<Answer> getAnswerById(@PathVariable("id") Long id){
        Answer answer = answerServ.getAnswerById(id);
        if(answer != null)
            return new ResponseEntity<>(answer,HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/answer?patient=" + patientId
    // receive: json list + 302 or 404
    @GetMapping("/answer")
    public ResponseEntity<List<Answer>> getAnswerByPatient(@RequestParam("patient") Long id){
        Patient patient = patientServ.getPatientById(id);
        if(patient != null)
            return new ResponseEntity<>(answerServ.getAnswerByPatient(patient),HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
