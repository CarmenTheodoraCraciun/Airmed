package com.example.airmed.Service.Inteface;

import com.example.airmed.Entity.ContactPerson;
import com.example.airmed.Entity.Patient;

import java.util.List;

public interface ContactPersonServ {
    ContactPerson saveContactPerson(ContactPerson contactPerson);
    ContactPerson getContactPersonById(Long id);
    List<ContactPerson> getContactPersonByPatient(Patient patient);
    ContactPerson updateContactPerson(ContactPerson old,ContactPerson newContact);
    void deleteContactPerson(Long id);
}
