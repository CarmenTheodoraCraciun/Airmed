import {Patient} from "./Patient.ts";
import {Salts} from "./Salt.ts";
import {Hashed} from "./Hashed.ts";

export class ContactPerson{
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    relationship: string;
    patient: Patient;
    salts: Salts;


    constructor(id: number, firstName: string, lastName: string, phone: string,
                relationship: string, patient: Patient, salts: Salts) {
        this.id = id;
        this.salts = salts;

        this.firstName = Hashed.extractDataFromHash(firstName,this.salts.firstName);
        this.lastName = Hashed.extractDataFromHash(lastName,this.salts.lastName);
        this.phone = Hashed.extractDataFromHash(phone,this.salts.phone);
        this.relationship = Hashed.extractDataFromHash(relationship,this.salts.relationship);


        this.patient = new Patient(patient.id,patient.PNC,patient.firstName,
            patient.lastName,patient.mail, patient.phone, patient.psychiatrist,
            patient.psychotherapist,patient.salts
        );

    }
}