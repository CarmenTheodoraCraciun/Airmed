package com.example.airmed.Controller;

import com.example.airmed.Entity.ContactPerson;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.SocialContext;
import com.example.airmed.Service.Inteface.ContactPersonServ;
import com.example.airmed.Service.Inteface.PatientServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ContactPersonCtrl {
    @Autowired
    private ContactPersonServ contactPersonServ;
    @Autowired
    private PatientServ patientServ;

    // method: POST
    // link: baseURL + "/contactPerson", body: json
    // receive: 201
    @PostMapping("/contactPerson")
    public ResponseEntity<ContactPerson> saveQuestion(@Validated @RequestBody ContactPerson contactPerson){
        return new ResponseEntity<>(contactPersonServ.saveContactPerson(contactPerson), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/contactPerson/" + id
    // receive: json + 302 or 404
    @GetMapping("/contactPerson/{id}")
    public ResponseEntity<ContactPerson> getQuestionById(@PathVariable("id") Long id){
        ContactPerson contactPerson = contactPersonServ.getContactPersonById(id);
        if(contactPerson != null)
            return  new ResponseEntity<>(contactPerson, HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    // method: GET
    // link: baseURL + "/contactPerson?patient=" + patientId
    // receive: json list + 302 or 404
    @GetMapping("/contactPerson")
    public ResponseEntity<List<ContactPerson>> getAnswerByPatient(@RequestParam("patient") Long id){
        Patient patient = patientServ.getPatientById(id);
        if(patient != null){
            List<ContactPerson> contactPeople= contactPersonServ.getContactPersonByPatient(patient);
            if(!contactPeople.isEmpty())
                return new ResponseEntity<>(contactPeople,HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: PUT
}
