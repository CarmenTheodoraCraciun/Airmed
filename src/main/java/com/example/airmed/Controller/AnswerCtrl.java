package com.example.airmed.Controller;

import com.example.airmed.Entity.Answer;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Question;
import com.example.airmed.Service.Inteface.AnswerServ;
import com.example.airmed.Service.Inteface.PatientServ;
import com.example.airmed.Service.Inteface.QuestionServ;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AnswerCtrl {
    @Data
    public static class AnswerListRequest {
        private List<Answer> answers;

        public List<Answer> getAnswers() {
            return answers;
        }

        public void setAnswers(List<Answer> answers) {
            this.answers = answers;
        }
    }

    @Autowired
    private AnswerServ answerServ;
    @Autowired
    private PatientServ patientServ;
    @Autowired
    private QuestionServ questionServ;

    // method: POST
    // link: baseURL + "/answer", body: json
    // receive: 201
    @PostMapping("/answer")
    public ResponseEntity<Answer> addAnswer(@Validated @RequestBody Answer answer){
        return new ResponseEntity<>(answerServ.saveAnswer(answer), HttpStatus.CREATED);
    }

    // method: POST
    // link: baseURL + "/answers", body: json
    // receive: 201
    @PostMapping("/answers")
    public ResponseEntity<List<Answer>> addAnswers(@Validated @RequestBody AnswerListRequest request) {
        List<Answer> savedAnswers = new ArrayList<>();
        for (Answer answer : request.getAnswers()) {
            savedAnswers.add(answerServ.saveAnswer(answer));
        }
        return new ResponseEntity<>(savedAnswers, HttpStatus.CREATED);
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
    // link: baseURL + "/answer/patient?patient=" + patientId + "&questionId=" + questionId
    // receive: json list + 302 or 404
    @GetMapping("/answer/patient")
    public ResponseEntity<List<Answer>> getAnswerByPatient(@RequestParam("patient") Long patientId, @RequestParam("question") Long questionId, @RequestParam("limit") int limit){
        Patient patient = patientServ.getPatientById(patientId);
        Question question = questionServ.getQuestionById(questionId);
        if(patient != null)
            return new ResponseEntity<>(answerServ.getTopNAnswersByPatientAndQuestion(patient,question, limit),HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
