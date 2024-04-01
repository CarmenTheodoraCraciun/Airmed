import {Psychiatrist} from "./Psychiatrist.ts";
import {Psychotherapist} from "./Psychotherapist.ts";
import {Patient} from "./Patient.ts";

export class Request{
    id: number;
    status: boolean;
    type: string;
    psychiatrist: Psychiatrist;
    psychotherapist: Psychotherapist;
    patient: Patient;


    constructor(id: number, status: boolean, type: string, psychiatrist: Psychiatrist, psychotherapist: Psychotherapist, patient: Patient) {
        this.id = id;
        this.status = status;
        this.type = type;

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