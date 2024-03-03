package com.example.airmed.Controller;

import com.example.airmed.Entity.InfoContent;
import com.example.airmed.Entity.Psychiatrist;
import com.example.airmed.Entity.Psychotherapist;
import com.example.airmed.Service.Inteface.InfoContentServ;
import com.example.airmed.Service.Inteface.PsychiatristServ;
import com.example.airmed.Service.Inteface.PsychotherapistServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ResourceBundle;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class InfoContentCtrl {
    @Autowired
    private InfoContentServ infoContentServ;
    @Autowired
    private PsychiatristServ psychiatristServ;
    @Autowired
    private PsychotherapistServ psychotherapistServ;

    // method: POST
    // link: baseURL + "/indoContent", body: json
    // receive: 201
    @PostMapping("/infoContent")
    public ResponseEntity<InfoContent> addInfoContent(@Validated @RequestBody InfoContent infoContent){
        return new ResponseEntity<>(infoContentServ.saveInfoContact(infoContent), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/infoContent/all"
    // receive: json list + 302
    @GetMapping("/infoContent/all")
    public ResponseEntity<List<InfoContent>> getInfoContent(){
        return new ResponseEntity<>(infoContentServ.getAllInfoContact(),HttpStatus.FOUND);
    }

    // method: GET
    // link: baseURL + "/infoContent" + id
    // receive: json + 302 or 404
    @GetMapping("/infoContent/{id}")
    public ResponseEntity<InfoContent> getInfoContentById(@PathVariable("id") Long id){
        InfoContent infoContent = infoContentServ.getInfoContactById(id);
        if(infoContent != null)
            return new ResponseEntity<>(infoContent,HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/infoContact?psychiatrist=" + psychiatristId
    // receive: json list + 302 or 404
    @GetMapping("/infoContact")
    public ResponseEntity<List<InfoContent>> getInfoContactByPsychiatrist(@RequestParam("psychiatrist") Long id){
        Psychiatrist psychiatrist = psychiatristServ.getPsychiatristById(id);
        if(psychiatrist != null){
            List<InfoContent> infoContents = infoContentServ.getInfoContactByPsychiatrist(psychiatrist);
            if(!infoContents.isEmpty())
                return new ResponseEntity<>(infoContents,HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/infoContact?psychotherapist=" + psychiatristId
    // receive: json list + 302 or 404
    @GetMapping("/infoContact")
    public ResponseEntity<List<InfoContent>> getInfoContactByPsychotherapist(@RequestParam("psychotherapist") Long id){
        Psychotherapist psychotherapist = psychotherapistServ.getPsychotherapistById(id);
        if(psychotherapist != null){
            List<InfoContent> infoContents = infoContentServ.getInfoContactByPsychotherapist(psychotherapist);
            if(!infoContents.isEmpty())
                return new ResponseEntity<>(infoContents,HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: DELETE, also deleting all the answers
    // link: baseURL + "/infoContact/" + infoContactId
    // receive: 200 or 500
    @DeleteMapping("/infoContact/{id}")
    public ResponseEntity<String> deleteInfoContact(@PathVariable("id") Long id){
        try{
            infoContentServ.deleteInfoContactById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            String errorMessage = "Error deleting question and answers: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
