package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.Answer;
import com.example.airmed.Entity.Patient;

import java.util.List;

public interface AnswerServ {
    Answer saveAnswer(Answer answer);
    Answer getAnswerById(Long id);
    List<Answer> getAnswerByPatient(Patient patient);
    void deleteAnswer(Long id);
}
