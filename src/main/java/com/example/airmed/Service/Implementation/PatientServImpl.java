package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.*;
import com.example.airmed.Repository.*;
import com.example.airmed.Service.Inteface.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// Service implementation for the Patient entity
@Service
public class PatientServImpl implements PatientServ {
    // Injecting the PatientRepo dependency using constructor injection
    private final PatientRepo patientRepo;
    @Autowired
    private AnswerServ answerServ;
    @Autowired
    private ContactPersonServ contactPersonServ;
    @Autowired
    private MedicalDataServ medicalDataServ;
    @Autowired
    private NoteServ noteServ;
    @Autowired
    private PsychiatricDataServ psychiatricDataServ;
    @Autowired
    private RequestServ requestServ;
    @Autowired
    private SocialContextServ socialContextServ;

    @Autowired
    public PatientServImpl(PatientRepo patientRepository) {
        this.patientRepo = patientRepository;
    }

    // Method to save or update a patient in the database
    @Override
    public Patient savePatient(Patient patient) {
        return patientRepo.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }

    // Method to retrieve a patient by their unique identifier (ID)
    // Return the patient data or null if not exist
    @Override
    public Patient getPatientById(Long id) {
        return patientRepo.findById(id)
                .orElse(null);
    }

    // Method to retrieve a patient by their Personal Numeric Code (PNC)
    @Override
    public Patient getPatientByPNC(String pnc) {
        return patientRepo.findByPNC(pnc).orElse(null);
    }

    // Method to retrieve a patient by their email address
    @Override
    public Patient getPatientByMail(String mail) {
        return patientRepo.findByMail(mail).orElse(null);
    }

    // Method to retrieve a list of patients associated with a Psychiatrist
    @Override
    public List<Patient> getPatientsByPsychiatrist(Psychiatrist psychiatrist) {
        return patientRepo.findByPsychiatrist(psychiatrist);
    }

    // Method to retrieve a list of patients associated with a Psychotherapist
    @Override
    public List<Patient> getPatientsByPsychotherapist(Psychotherapist psychotherapist) {
        return patientRepo.findByPsychotherapist(psychotherapist);
    }

    @Override
    public Patient updatePatient(Patient old, Patient newPatient) {
        if(old != null && patientRepo.existsById(old.getId())){
            // Updating the
            if(newPatient.getPNC() != null)
                old.setPNC(newPatient.getPNC());
            if(newPatient.getFirstName() != null)
                old.setFirstName(newPatient.getFirstName());
            if(newPatient.getLastName() != null)
                old.setLastName(newPatient.getLastName());
            if(newPatient.getMail() != null)
                old.setMail(newPatient.getMail());
            if(newPatient.getPhone() != null)
                old.setPhone(newPatient.getPhone());
            if(newPatient.getPassword() != null)
                old.setPassword(newPatient.getPassword());
            return patientRepo.save(old);
        }
        return null;
    }

    @Override
    public Patient updatePsychiatristInPatient(Patient patient, Psychiatrist psychiatrist) {
        if(patient != null && patientRepo.existsById(patient.getId())){
            patient.setPsychiatrist(psychiatrist);
            return patientRepo.save(patient);
        }
        return null;
    }

    @Override
    public Patient removePsychiatristInPatient(Patient patient) {
        if(patient != null && patientRepo.existsById(patient.getId())){
            patient.setPsychiatrist(null);
            return patientRepo.save(patient);
        }
        return null;
    }

    @Override
    public Patient updatePsychotherapistInPatient(Patient patient, Psychotherapist psychotherapist) {
        if(patient != null && patientRepo.existsById(patient.getId())){
            patient.setPsychotherapist(psychotherapist);
            return patientRepo.save(patient);
        }
        return null;
    }

    @Override
    public Patient removePsychotherapistInPatient(Patient patient) {
        if(patient != null && patientRepo.existsById(patient.getId())){
            patient.setPsychotherapist(null);
            return patientRepo.save(patient);
        }
        return null;
    }


    // Method to delete a patient by their unique identifier (ID)
    @Override
    public void deletePatient(Long id) {
        Patient patient = getPatientById(id);
        if(patient != null){
            // deleting all data associated with the patient
            List<Answer> answers = answerServ.getAnswerByPatient(patient);
            for(Answer answer : answers)
                answerServ.deleteAnswer(answer.getId());

            List<ContactPerson> contactPeople = contactPersonServ.getContactPersonByPatient(patient);
            for(ContactPerson contactPerson: contactPeople)
                contactPersonServ.deleteContactPerson(contactPerson.getId());

            MedicalData medicalData = medicalDataServ.getMedicalDataByPatient(patient);
            medicalDataServ.deleteMedicalData(medicalData.getId());

            List<Note> notes = noteServ.getNoteByPatient(patient);
            for(Note note: notes)
                noteServ.deleteNote(note.getId());

            List<PsychiatricData> psychiatricData = psychiatricDataServ.getPsychiatricDataByPatient(patient);
            for(PsychiatricData pData: psychiatricData)
                psychiatricDataServ.deletePsychiatricData(pData.getId());

            List<Request> requests = requestServ.getRequestByPatient(patient);
            for(Request request: requests)
                requestServ.deleteRequest(request.getId());

            SocialContext socialContext = socialContextServ.getSocialContextByPatient(patient);
            socialContextServ.deleteSocialContext(socialContext.getId());

            patientRepo.deleteById(id);
        }
    }
}