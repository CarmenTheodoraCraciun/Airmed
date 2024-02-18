package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.Question;

import java.util.List;

public interface QuestionServ {
    Question saveQuestion(Question question);
    List<Question> getAll();
    Question getQuestionById(Long id);
    void deleteQuestion(Long id);
}
