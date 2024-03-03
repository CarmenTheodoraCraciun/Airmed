package com.example.airmed.Service.Implementation;

import com.example.airmed.Entity.ContactPerson;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Repository.ContactPersonRepo;
import com.example.airmed.Service.Inteface.ContactPersonServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactPersonServImpl implements ContactPersonServ {
    private final ContactPersonRepo contactPersonRepo;
    @Autowired
    public ContactPersonServImpl(ContactPersonRepo contactPersonRepo) {
        this.contactPersonRepo = contactPersonRepo;
    }

    @Override
    public ContactPerson saveContactPerson(ContactPerson contactPerson) {
        return contactPersonRepo.save(contactPerson);
    }

    @Override
    public ContactPerson getContactPersonById(Long id) {
        return contactPersonRepo.findById(id)
                .orElse(null);
    }

    @Override
    public List<ContactPerson> getContactPersonByPatient(Patient patient) {
        return contactPersonRepo.findByPatient(patient);
    }

    @Override
    public ContactPerson updateContactPerson(ContactPerson old, ContactPerson newContact) {
        if(old != null && contactPersonRepo.existsById(old.getId())){
            if(newContact.getFirstName() != null)
                old.setFirstName(newContact.getFirstName());
            if(newContact.getLastName() != null)
                old.setLastName(newContact.getLastName());
            if(newContact.getPhone() != null)
                old.setPhone(newContact.getPhone());
            if(newContact.getRelationship() != null)
                old.setRelationship(newContact.getRelationship());

            return contactPersonRepo.save(old);
        }
        return null;
    }

    @Override
    public void deletePatient(Long id) {
        contactPersonRepo.deleteById(id);
    }
}
