package com.example.airmed.Entity;
import com.example.airmed.Hashed;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

// Declaring the entity class for 'Patient'
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Patient {
    // Declaring primary key field with auto-generation strategy
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    // Declaring columns for various patient attributes with constraints
    // nullable = false - this attribute can't be null
    // unique = true - this attribute has unique values for all of this records
    @Column(nullable = false, unique = true)
    private String PNC; // Personal Numeric Code

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String mail;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column
    private String password;

    // Establishing many-to-one relationship with a Psychiatrist entity
    @ManyToOne
    @JoinColumn(name = "psychiatrist")
    private Psychiatrist psychiatrist;

    // Establishing many-to-one relationship with a Psychotherapist entity
    @ManyToOne
    @JoinColumn(name = "psychotherapist")
    private Psychotherapist psychotherapist;

//    // Map of salts associated with the entity
//    @ElementCollection
//    private Map<String,String> salts = new HashMap<>();
//
//    public Patient(Long id, String PNC, String firstName, String lastName, String mail, String phone, String password, Psychiatrist psychiatrist, Psychotherapist psychotherapist, Map<String, String> salts) {
//        if(salts == null){
//            this.id = id;
//            this.PNC = PNC;
//            this.firstName = firstName;
//            this.lastName = lastName;
//            this.mail = mail;
//            this.phone = phone;
//            this.password = password;
//            this.psychiatrist = psychiatrist;
//            this.psychotherapist = psychotherapist;
//            this.salts = null;
//        }
//    }
//
//    // Hash and set the Personal Numeric Code (PNC) with a generated salt
//    public void setPNC(String PNC) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("pnc", salt);
//        this.PNC = Hashed.createHashData(PNC, salt);
//    }
//
//    // Hash and set the first name with a generated salt
//    public void setFirstName(String firstName) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("firstName", salt);
//        this.firstName = Hashed.createHashData(firstName, salt);
//    }
//
//    // Hash and set the last name with a generated salt
//    public void setLastName(String lastName) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("lastName", salt);
//        this.lastName = Hashed.createHashData(lastName, salt);
//    }
//
//    // Hash and set the email with a generated salt
//    public void setMail(String mail) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("mail", salt);
//        this.mail = Hashed.createHashData(mail, salt);
//    }
//
//    // Hash and set the phone number with a generated salt
//    public void setPhone(String phone) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("phone", salt);
//        this.phone = Hashed.createHashData(phone, salt);
//    }
//
//    // Hash and set the password with a generated salt
//    public void setPassword(String password) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("password", salt);
//        this.password = Hashed.createHashData(password, salt);
//    }

//    public Patient patientWithoutHashing(){
//        return new Patient(
//            this.id,
//            Hashed.extractDataFromHash(this.PNC, this.salts.get("pnc")),
//            Hashed.extractDataFromHash(this.firstName, this.salts.get("firstName")),
//            Hashed.extractDataFromHash(this.lastName, this.salts.get("lastName")),
//            Hashed.extractDataFromHash(this.mail, this.salts.get("mail")),
//            Hashed.extractDataFromHash(this.phone, this.salts.get("phone")),
//            "-",
//            this.psychiatrist,
//            this.psychotherapist,
//            null
//        );
//    }
}