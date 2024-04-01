import {Patient} from "./Patient.ts";

export class PychiatricData{
    id: number;
    presant: boolean;
    diagnostics: string;
    hospitalization: string;
    antidepressant: string;
    moodStabilizers: string;
    antipsychotics: string;
    suicedeThoughts: string;
    patient: Patient;


    constructor(id: number, presant: boolean, diagnostics: string, hospitalization: string, antidepressant: string, moodStabilizers: string, antipsychotics: string, suicedeThoughts: string, patient: Patient) {
        this.id = id;
        this.presant = presant;
        this.diagnostics = diagnostics;
        this.hospitalization = hospitalization;
        this.antidepressant = antidepressant;
        this.moodStabilizers = moodStabilizers;
        this.antipsychotics = antipsychotics;
        this.suicedeThoughts = suicedeThoughts;

        this.patient = new Patient(patient.id,patient.PNC,patient.firstName,
            patient.lastName,patient.mail, patient.phone, patient.psychiatrist,
            patient.psychotherapist,patient.salts
        );
    }
}