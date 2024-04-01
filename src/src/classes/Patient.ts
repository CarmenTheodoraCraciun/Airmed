// Import necessary classes and interfaces
import { Salts } from './Salt';
import { Hashed } from "./Hashed.ts";
import { Psychiatrist } from "./Psychiatrist.ts";
import { Psychotherapist } from "./Psychotherapist.ts";

// Define the Patient class
export class Patient {
    // Define properties of the Patient class
    id: number;
    pnc: string;
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
    password: string | null;
    psychiatrist: Psychiatrist | null;
    psychotherapist: Psychotherapist | null;
    salts: Salts | null;

    // Constructor to initialize the Patient object
    constructor(id: number,
                PNC: string,
                firstName: string,
                lastName: string,
                mail: string,
                phone: string,
                password: string | null,
                psychiatrist?: Psychiatrist | null,
                psychotherapist?: Psychotherapist | null,
                salts?: Salts | null) {
        if(!psychiatrist && !psychotherapist && !salts){
            // datele vin din frontend
            this.id = id;
            this.password = password;
            this.pnc = PNC;
            this.firstName = firstName;
            this.lastName = lastName;
            this.mail = mail;
            this.phone = phone;
            this.salts = null;
            this.psychiatrist = null;
            this.psychotherapist = null;
        }
        else{
            // datele vin din backend
            this.id = id;
            this.salts = salts || null;

            // Extract and assign PNC, firstName, lastName, mail, and phone using hash functions
            this.password = null;
            this.pnc = Hashed.extractDataFromHash(PNC, this.salts?.PNC || "");
            this.firstName = Hashed.extractDataFromHash(firstName, this.salts?.firstName || "");
            this.lastName = Hashed.extractDataFromHash(lastName, this.salts?.lastName || "");
            this.mail = Hashed.extractDataFromHash(mail, this.salts?.mail || "");
            this.phone = Hashed.extractDataFromHash(phone, this.salts?.phone || "");

            // Create a new Psychiatrist instance with extracted data and salts
            this.psychiatrist = psychiatrist ? new Psychiatrist(
                psychiatrist.id, psychiatrist.medicalNumber, psychiatrist.firstName,
                psychiatrist.lastName, psychiatrist.mail, psychiatrist.phone,
                psychiatrist.country, psychiatrist.locality, psychiatrist.cabinetLocation,
                psychiatrist.linkLocation, psychiatrist.priceConsult, psychiatrist.priceConsultation,
                psychiatrist.online, psychiatrist.CNAS, psychiatrist.salts
            ) : null;

            // Create a new Psychotherapist instance with extracted data and salts
            this.psychotherapist = psychotherapist ? new Psychotherapist(
                psychotherapist.id, psychotherapist.medicalNumber, psychotherapist.firstName,
                psychotherapist.lastName, psychotherapist.mail, psychotherapist.phone,
                psychotherapist.country, psychotherapist.locality, psychotherapist.cabinetLocation,
                psychotherapist.linkLocation, psychotherapist.priceConsult, psychotherapist.priceConsultation,
                psychotherapist.online, psychotherapist.CNAS, psychotherapist.salts
            ) : null;
        }
    }

}