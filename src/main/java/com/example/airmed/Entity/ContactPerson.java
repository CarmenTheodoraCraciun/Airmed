package com.example.airmed.Entity;
import com.example.airmed.Hashed;
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
public class ContactPerson {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String relationship;

    @ManyToOne
    @JoinColumn(name = "patient", nullable = false)
    private Patient patient;

//    @ElementCollection
//    private Map<String,String> salts = new HashMap<>();
//
//    public void setFirstName(String firstName) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("firstName", salt);
//        this.firstName = Hashed.createHashData(firstName,salt);
//    }
//
//    public void setLastName(String lastName) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("lastName", salt);
//        this.lastName = Hashed.createHashData(lastName,salt);
//    }
//
//    public void setPhone(String phone) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("phone", salt);
//        this.phone = Hashed.createHashData(phone,salt);
//    }
//
//    public void setRelationship(String relationship) {
//        String salt = Hashed.generateSalt();
//        this.salts.put("relationship", salt);
//        this.relationship = Hashed.createHashData(relationship,salt);
//    }
}
