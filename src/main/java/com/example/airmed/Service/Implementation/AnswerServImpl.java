package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.Answer;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Question;
import com.example.airmed.Repository.AnswerRepo;
import com.example.airmed.Repository.PatientRepo;
import com.example.airmed.Service.Inteface.AnswerServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerServImpl implements AnswerServ {
    private final AnswerRepo answerRepo;
    private final PatientRepo patientRepo;

    @Autowired
    public AnswerServImpl(AnswerRepo answerRepo, PatientRepo patientRepo) {
        this.answerRepo = answerRepo;
        this.patientRepo = patientRepo;
    }

    @Override
    public Answer saveAnswer(Answer answer) {
        return answerRepo.save(answer);
    }

    @Override
    public Answer getAnswerById(Long id) {
        return answerRepo.findById(id)
                .orElse(null);
    }

    @Override
    public List<Answer> getPatient(Patient patient) {
        return answerRepo.findPatient(patient);
    }

    @Override
    public List<Answer> getTopNAnswersByPatient(Patient patient, int limit) {
        List<Answer> answers = answerRepo.findPatientOrderByCreatedAtDesc(patient);
        if(limit != 0)
            while (answers.size() > limit)
                answers.remove(answers.size() - 1);
        return answers;
    }

    @Override
    public List<Answer> getTopNAnswersByPatientAndQuestion(Patient patient, Question question, int limit) {
        List<Answer> answers =  answerRepo.findPatientAndQuestionOrderByCreatedAtDesc(patient, question);
        if(limit != 0)
            while (answers.size() > limit)
                answers.remove(answers.size() - 1);
        return answers;
    }

    @Override
    public void deleteAnswer(Long id) {
        answerRepo.deleteById(id);
    }
}
