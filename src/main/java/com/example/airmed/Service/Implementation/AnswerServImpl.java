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
    @Autowired
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
    public List<Answer> getAnswerByPatient(Patient patient) {
        return answerRepo.findByPatient(patient);
    }

    @Override
    public List<Answer> getAnswerByPatientAndQuestion(Patient patient, Question question) {
        return answerRepo.findByPatientAndQuestion(patient, question);
    }
    @Override
    public void deleteAnswer(Long id) {
        answerRepo.deleteById(id);
    }
}
