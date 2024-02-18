package com.example.airmed.Repository;

import com.example.airmed.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepo extends JpaRepository<Question,Long> {
}
