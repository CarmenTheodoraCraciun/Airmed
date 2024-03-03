package com.example.airmed.Controller;

import com.example.airmed.Entity.Question;
import com.example.airmed.Service.Inteface.AnswerServ;
import com.example.airmed.Service.Inteface.QuestionServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class QuestionCtrl {
    @Autowired
    private QuestionServ questionServ;
    // method: POST
    // link: baseURL + "/question", body: json
    // receive: 201
    @PostMapping("/question")
    public ResponseEntity<Question> saveQuestion(@Validated @RequestBody Question question){
        return new ResponseEntity<>(questionServ.saveQuestion(question), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/question/" + questionId
    // receive: json + 302 or 404
    @GetMapping("/question/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable("id") Long id){
        Question question = questionServ.getQuestionById(id);
        if(question != null)
            return  new ResponseEntity<>(question, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: DELETE, also deleting all the answers
    // link: baseURL + "/question/" + questionId
    // receive: 200 or 500
    @DeleteMapping("/question/{id}")
    public ResponseEntity<String> deleteQuestionAndAnswers(@PathVariable("id") Long id) {
        try {
            questionServ.deleteQuestionAndAnswers(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            String errorMessage = "Error deleting question and answers: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
