package com.example.airmed.Repository;

import com.example.airmed.Entity.Answer;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepo extends JpaRepository<Answer,Long> {
    List<Answer> findByPatient(Patient patient);
    List<Answer> findByQuestion(Question question);
}
