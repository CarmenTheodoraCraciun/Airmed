package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.Question;
import com.example.airmed.Repository.QuestionRepo;
import com.example.airmed.Service.Inteface.QuestionServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServImpl implements QuestionServ {
    private final QuestionRepo questionRepo;
    @Autowired
    public QuestionServImpl(QuestionRepo questionRepo){
        this.questionRepo = questionRepo;
    }
    @Override
    public Question saveQuestion(Question question){
        return questionRepo.save(question);
    }
    @Override
    public List<Question> getAll(){
        return questionRepo.findAll();
    }
    @Override
    public Question getQuestionById(Long id){
        return questionRepo.findById(id).orElse(null);
    }
    @Override
    public void deleteQuestion(Long id){
        questionRepo.deleteById(id);
    }
}
