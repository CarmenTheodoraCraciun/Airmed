package com.example.airmed.Repository;

import com.example.airmed.Entity.Note;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NoteRepo extends JpaRepository<Note,Long> {
    List<Note> findByPatient(Patient patient);

    List<Note> findByPatientAndPsychiatristIsNullAndPsychotherapistIsNull(Patient patient);

    List<Note> findByPsychiatristAndPatient(Psychiatrist psychiatrist, Patient patient);

    List<Note> findByPsychotherapistAndPatient(Psychotherapist psychotherapist, Patient patient);

    // Metoda pentru a găsi toate notele unui pacient în care sharedAll este true
    // și una dintre coloanele psychotherapist și psychiatrist nu este null.
    @Query("SELECT n FROM Note n WHERE n.patient = :patient " +
            "AND n.sharedAll = true " +
            "AND (n.psychotherapist IS NOT NULL OR n.psychiatrist IS NOT NULL)")
    List<Note> findAllSharedAllNotesWithSpecialists(@Param("patient") Patient patient);

    // Metoda pentru a găsi toate notele despre un pacient, în care sharedSpecialist este true
    // și care aparțin unui psiholog sau psihiatru, excluzând un anumit psihiatru.
    @Query("SELECT n FROM Note n WHERE n.patient = :patient " +
            "AND n.sharedSpecialist = true " +
            "AND (n.psychotherapist IS NOT NULL OR n.psychiatrist IS NOT NULL) " +
            "AND (n.psychiatrist IS NULL OR n.psychiatrist <> :psychiatrist)")
    List<Note> findNotesSharedWithSpecialistsExcludingPsychiatrist(
            @Param("patient") Patient patient,
            @Param("psychiatrist") Psychiatrist psychiatrist
    );

    // Metoda pentru a găsi toate notele despre un pacient, în care sharedSpecialist este true
    // și care aparțin unui psiholog sau psihiatru, excluzând un anumit psihoterapeut.
    @Query("SELECT n FROM Note n WHERE n.patient = :patient " +
            "AND n.sharedSpecialist = true " +
            "AND (n.psychotherapist IS NOT NULL OR n.psychiatrist IS NOT NULL) " +
            "AND (n.psychotherapist IS NULL OR n.psychotherapist <> :psychotherapist)")
    List<Note> findNotesSharedWithSpecialistsExcludingPsychotherapist(
            @Param("patient") Patient patient,
            @Param("psychotherapist") Psychotherapist psychotherapist
    );
}
