import { Salts } from './Salt';
import {Hashed} from "./Hashed.ts";
export class Psychotherapist{
    id: number;
    medicalNumber: string;
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
    country: string;
    locality: string;
    cabinetLocation: string;
    linkLocation: string;
    priceConsult: number;
    priceConsultation: number;
    online: boolean;
    CNAS: boolean;
    salts: Salts;

    constructor(id: number, medicalNumber: string, firstName: string, lastName: string, mail: string,
                phone: string, country: string, locality: string, cabinetLocation: string,
                linkLocation: string, priceConsult: number, priceConsultation: number, online: boolean,
                CNAS: boolean, salts: Salts) {
        this.salts = salts;
        this.id = id;
        this.priceConsultation = priceConsultation;
        this.priceConsult = priceConsult;
        this.CNAS = CNAS;
        this.online = online;

        // Reversing the hash
        this.medicalNumber = Hashed.extractDataFromHash(medicalNumber,this.salts.medicalNumber);
        this.firstName = Hashed.extractDataFromHash(firstName,this.salts.firstName);
        this.lastName = Hashed.extractDataFromHash(lastName,this.salts.lastName);
        this.mail = Hashed.extractDataFromHash(mail,this.salts.mail);
        this.phone = Hashed.extractDataFromHash(phone,this.salts.phone);
        this.country = Hashed.extractDataFromHash(country,this.salts.country);
        this.locality = Hashed.extractDataFromHash(locality,this.salts.locality);
        this.cabinetLocation = Hashed.extractDataFromHash(cabinetLocation,this.salts.cabinetLocation);
        this.linkLocation = Hashed.extractDataFromHash(linkLocation,this.salts.linkLocation);
    }
}