package com.example.airmed.Repository;

import com.example.airmed.Entity.Answer;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface AnswerRepo extends JpaRepository<Answer,Long> {
    List<Answer> findPatient(Patient patient);
    List<Answer> findPatientOrderByCreatedAtDesc(Patient patient);

    List<Answer> findPatientAndQuestionOrderByCreatedAtDesc(Patient patient, Question question);
}
