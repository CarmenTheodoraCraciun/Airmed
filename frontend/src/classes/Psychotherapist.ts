export class Psychotherapist{
    id: number;
    medicalNumber: string;
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
    bio: string;
    country: string;
    locality: string;
    cabinetLocation: string;
    linkLocation: string;
    priceConsult: number;
    priceConsultation: number;
    online: boolean;
    CNAS: boolean;

    constructor(id: number, medicalNumber: string, firstName: string, lastName: string, mail: string,
                bio: string, phone: string, country: string, locality: string, cabinetLocation: string,
                linkLocation: string, priceConsult: number, priceConsultation: number, online: boolean,
                CNAS: boolean) {
        this.id = id;
        this.priceConsultation = priceConsultation;
        this.priceConsult = priceConsult;
        this.CNAS = CNAS;
        this.online = online;
        this.bio = bio;
        this.medicalNumber = medicalNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.phone = phone;
        this.country = country;
        this.locality = locality;
        this.cabinetLocation = cabinetLocation;
        this.linkLocation = linkLocation;
    }
}