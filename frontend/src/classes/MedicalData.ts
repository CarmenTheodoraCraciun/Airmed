import {Patient} from "./Patient.ts";

export class MedicalData{
    id: number;
    allergies: string;
    weight: string;
    height: string;
    diseases: string;
    medicamentation: string;
    pregnant: boolean;
    patient: Patient;


    constructor(id: number, allergies: string, weight: string, height: string,
                diseases: string, medicamentation: string, pregnant: boolean,
                patient: Patient) {
        this.id = id;
        this.allergies = allergies;
        this.weight = weight;
        this.height = height;
        this.diseases = diseases;
        this.medicamentation = medicamentation;
        this.pregnant = pregnant;

        this.patient = new Patient(patient.id,patient.PNC,patient.firstName,
            patient.lastName,patient.mail, patient.phone, patient.psychiatrist,
            patient.psychotherapist,patient.salts
        );
    }
}