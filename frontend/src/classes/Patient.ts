// Import necessary classes and interfaces
import { Salts } from './Salt';
import { Hashed } from "./Hashed.ts";
import { Psychiatrist } from "./Psychiatrist.ts";
import { Psychotherapist } from "./Psychotherapist.ts";

// Define the Patient class
export class Patient {
    // Define properties of the Patient class
    id: number;
    PNC: string;
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
    psychiatrist: Psychiatrist;
    psychotherapist: Psychotherapist;
    salts: Salts;

    // Constructor to initialize the Patient object
    constructor(id: number, PNC: string, firstName: string, lastName: string, mail: string,
                phone: string, psychiatrist: Psychiatrist, psychotherapist: Psychotherapist,
                salts: Salts) {
        // Initialize basic properties
        this.id = id;
        this.psychotherapist = psychotherapist;
        this.salts = salts;

        // Extract and assign PNC, firstName, lastName, mail, and phone using hash functions
        this.PNC = Hashed.extractDataFromHash(PNC, this.salts.PNC);
        this.firstName = Hashed.extractDataFromHash(firstName, this.salts.firstName);
        this.lastName = Hashed.extractDataFromHash(lastName, this.salts.lastName);
        this.mail = Hashed.extractDataFromHash(mail, this.salts.mail);
        this.phone = Hashed.extractDataFromHash(phone, this.salts.phone);

        // Create a new Psychiatrist instance with extracted data and salts
        this.psychiatrist = new Psychiatrist(
            psychiatrist.id, psychiatrist.medicalNumber, psychiatrist.firstName,
            psychiatrist.lastName, psychiatrist.mail, psychiatrist.phone,
            psychiatrist.country, psychiatrist.locality, psychiatrist.cabinetLocation,
            psychiatrist.linkLocation, psychiatrist.priceConsult, psychiatrist.priceConsultation,
            psychiatrist.online, psychiatrist.CNAS, psychiatrist.salts
        );

        // Create a new Psychotherapist instance with extracted data and salts
        this.psychotherapist = new Psychotherapist(
            psychotherapist.id, psychotherapist.medicalNumber, psychotherapist.firstName,
            psychotherapist.lastName, psychotherapist.mail, psychotherapist.phone,
            psychotherapist.country, psychotherapist.locality, psychotherapist.cabinetLocation,
            psychotherapist.linkLocation, psychotherapist.priceConsult, psychotherapist.priceConsultation,
            psychotherapist.online, psychotherapist.CNAS, psychotherapist.salts
        );
    }
}