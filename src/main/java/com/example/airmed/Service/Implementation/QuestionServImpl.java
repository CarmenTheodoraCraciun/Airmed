package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.Answer;
import com.example.airmed.Entity.Question;
import com.example.airmed.Repository.QuestionRepo;
import com.example.airmed.Service.Inteface.AnswerServ;
import com.example.airmed.Service.Inteface.QuestionServ;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServImpl implements QuestionServ {
    private final QuestionRepo questionRepo;
    @Autowired
    private AnswerServ answerServ;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    public QuestionServImpl(QuestionRepo questionRepo){
        this.questionRepo = questionRepo;
    }
    @Override
    public Question saveQuestion(Question question){
        return questionRepo.save(question);
    }
    @Override
    public List<Question> getAllQuestions(){
        return questionRepo.findAll();
    }
    @Override
    public Question getQuestionById(Long id){
        return questionRepo.findById(id).orElse(null);
    }
    @Override
    @Transactional
    public void deleteQuestionAndAnswers(Long id) {
        Question question = getQuestionById(id);
        if (question != null) {
            List<Answer> answers = answerServ.getAnswerByQuestion(question);
            for (Answer answer : answers) {
                answerServ.deleteAnswer(answer.getId());
            }
            questionRepo.delete(question);
        }
    }
}
