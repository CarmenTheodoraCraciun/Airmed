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
        return new ResponseEntity<>(infoContentServ.saveInfoContent(infoContent), HttpStatus.CREATED);
    }

    // method: GET
    // link: baseURL + "/infoContent/all"
    // receive: json list + 302
    @GetMapping("/infoContent/all")
    public ResponseEntity<List<InfoContent>> getInfoContent(){
        return new ResponseEntity<>(infoContentServ.getAllInfoContent(),HttpStatus.FOUND);
    }

    // method: GET
    // link: baseURL + "/infoContent" + id
    // receive: json + 302 or 404
    @GetMapping("/infoContent/{id}")
    public ResponseEntity<InfoContent> getInfoContentById(@PathVariable("id") Long id){
        InfoContent infoContent = infoContentServ.getInfoContentById(id);
        if(infoContent != null)
            return new ResponseEntity<>(infoContent,HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/infoContent/psychiatrist?psychiatrist=" + psychiatristId
    // receive: json list + 302 or 404
    @GetMapping("/infoContent/psychiatrist")
    public ResponseEntity<List<InfoContent>> getInfoContentByPsychiatrist(@RequestParam("psychiatrist") Long id){
        Psychiatrist psychiatrist = psychiatristServ.getPsychiatristById(id);
        if(psychiatrist != null)
            return new ResponseEntity<>(infoContentServ.getInfoContentByPsychiatrist(psychiatrist), HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: GET
    // link: baseURL + "/infoContent/psychotherapist?psychotherapist=" + psychiatristId
    // receive: json list + 302 or 404
    @GetMapping("/infoContent/psychotherapist")
    public ResponseEntity<List<InfoContent>> getInfoContentByPsychotherapist(@RequestParam("psychotherapist") Long id){
        Psychotherapist psychotherapist = psychotherapistServ.getPsychotherapistById(id);
        if(psychotherapist != null)
            return new ResponseEntity<>(infoContentServ.getInfoContentByPsychotherapist(psychotherapist),HttpStatus.FOUND);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // method: DELETE
    // link: baseURL + "/infoContent/" + infoContentId
    // receive: 200 or 500
    @DeleteMapping("/infoContent/{id}")
    public ResponseEntity<String> deleteInfoContent(@PathVariable("id") Long id){
        try{
            infoContentServ.deleteInfoContentById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            String errorMessage = "Error deleting info content: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
