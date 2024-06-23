package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.Answer;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Question;

import java.util.List;

public interface AnswerServ {
    Answer saveAnswer(Answer answer);
    Answer getAnswerById(Long id);

    List<Answer> getPatient(Patient patient);

    List<Answer> getTopNAnswersByPatient(Patient patient, int limit);

    List<Answer> getTopNAnswersByPatientAndQuestion(Patient patient, Question question, int limit);

    void deleteAnswer(Long id);
}
