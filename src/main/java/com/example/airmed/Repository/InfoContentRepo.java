package com.example.airmed.Repository;

import com.example.airmed.Entity.InfoContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InfoContentRepo extends JpaRepository<InfoContent,Long> {
}
