import {Psychotherapist} from "./Psychotherapist.ts";
import {Psychiatrist} from "./Psychiatrist.ts";
import {Patient} from "./Patient.ts";

export class Note{
    id: number;
    content: string;
    sharedSpecialist: boolean;
    sharedAll: boolean;
    psychotherapist: Psychotherapist;
    psychiatrist: Psychiatrist;
    patient: Patient;

    constructor(id: number, content: string, sharedSpecialist: boolean, sharedAll: boolean, psychotherapist: Psychotherapist, psychiatrist: Psychiatrist, patient: Patient) {
        this.id = id;
        this.content = content;
        this.sharedSpecialist = sharedSpecialist;
        this.sharedAll = sharedAll;

        this.psychiatrist = new Psychiatrist(
            psychiatrist.id, psychiatrist.medicalNumber, psychiatrist.firstName,
            psychiatrist.lastName, psychiatrist.mail, psychiatrist.phone,
            psychiatrist.country, psychiatrist.locality, psychiatrist.cabinetLocation,
            psychiatrist.linkLocation, psychiatrist.priceConsult, psychiatrist.priceConsultation,
            psychiatrist.online, psychiatrist.CNAS, psychiatrist.salts
        );

        this.psychotherapist = new Psychotherapist(
            psychotherapist.id, psychotherapist.medicalNumber, psychotherapist.firstName,
            psychotherapist.lastName, psychotherapist.mail, psychotherapist.phone,
            psychotherapist.country, psychotherapist.locality, psychotherapist.cabinetLocation,
            psychotherapist.linkLocation, psychotherapist.priceConsult, psychotherapist.priceConsultation,
            psychotherapist.online, psychotherapist.CNAS, psychotherapist.salts
        );

        this.patient = new Patient(patient.id,patient.PNC,patient.firstName,
            patient.lastName,patient.mail, patient.phone, patient.psychiatrist,
            patient.psychotherapist,patient.salts
        );
    }
}