package com.example.airmed.Entity;

import com.example.airmed.Hashed;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Psychiatrist {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String medicalNumber;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String mail;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String locality;

    @Column
    private String cabinetLocation;

    @Column
    private String linkLocation;

    @Column(nullable = false)
    private int priceConsult;

    @Column(nullable = false)
    private int priceConsultation;

    @Column(columnDefinition = "boolean default false")
    @JsonProperty
    private boolean online;

    @Column(columnDefinition = "boolean default false")
    @JsonProperty
    private boolean CNAS;

//    @ElementCollection
//    private Map<String,String> salts = new HashMap<>();
//
//    public void setMedicalNumber(String medicalNumber) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("medicalNumber", salt);
//        this.medicalNumber = Hashed.createHashData(medicalNumber,salt);
//    }
//
//    public void setFirstName(String firstName) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("firstName",salt);
//        this.firstName = Hashed.createHashData(firstName,salt);
//    }
//
//    public void setLastName(String lastName) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("lastName",salt);
//        this.lastName = Hashed.createHashData(lastName,salt);
//    }
//
//    public void setMail(String mail) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("mail",salt);
//        this.mail = Hashed.createHashData(mail,salt);
//    }
//
//    public void setPhone(String phone) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("phone",salt);
//        this.phone = Hashed.createHashData(phone,salt);
//    }
//
//    public void setPassword(String password) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("password",salt);
//        this.password = Hashed.createHashData(password,salt);
//    }
//
//    public void setBio(String bio) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("bio",salt);
//        this.bio = Hashed.createHashData(bio,salt);
//    }
//
//    public void setCountry(String country) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("country",salt);
//        this.country = Hashed.createHashData(country,salt);
//    }
//
//    public void setLocality(String locality) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("locality",salt);
//        this.locality = Hashed.createHashData(locality,salt);
//    }
//
//    public void setCabinetLocation(String cabinetLocation) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("cabinetLocation",salt);
//        this.cabinetLocation = Hashed.createHashData(cabinetLocation,salt);
//    }
//
//    public void setLinkLocation(String linkLocation) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("linkLocation",salt);
//        this.linkLocation = Hashed.createHashData(linkLocation,salt);
//    }
}