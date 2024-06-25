package com.example.airmed.Repository;

import com.example.airmed.Entity.Answer;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface AnswerRepo extends JpaRepository<Answer,Long> {
    List<Answer> findByPatient(Patient patient);
    List<Answer> findByPatientOrderByCreatedAtDesc(Patient patient);

    List<Answer> findByPatientAndQuestionOrderByCreatedAtDesc(Patient patient, Question question);
}
