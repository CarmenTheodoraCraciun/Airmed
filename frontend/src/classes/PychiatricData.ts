import {Patient} from "./Patient.ts";

export class PychiatricData{
    id: number;
    presant: boolean;
    diagnostics: string;
    hospitalization: boolean;
    antidepressant: string;
    moodStabilizers: string;
    antipsychotics: string;
    suicedeThoughts: string;
    patient: Patient;


    constructor(id: number, presant: boolean, diagnostics: string, hospitalization: boolean, antidepressant: string, moodStabilizers: string, antipsychotics: string, suicedeThoughts: string, patient: Patient) {
        this.id = id;
        this.presant = presant;
        this.diagnostics = diagnostics;
        this.hospitalization = hospitalization;
        this.antidepressant = antidepressant;
        this.moodStabilizers = moodStabilizers;
        this.antipsychotics = antipsychotics;
        this.suicedeThoughts = suicedeThoughts;

        this.patient = new Patient(patient.id,patient.pnc,patient.firstName,
            patient.lastName,patient.mail, patient.phone, patient.psychiatrist,
            patient.psychotherapist
        );
    }
}

export function convertToPychiatricData(data: any): PychiatricData {
    return new PychiatricData(
        data.id,
        data.presant,
        data.diagnostics,
        data.hospitalization,
        data.antidepressant,
        data.moodStabilizers,
        data.antipsychotics,
        data.suicedeThoughts,
        new Patient(
            data.patient.id,
            data.patient.pnc,
            data.patient.firstName,
            data.patient.lastName,
            data.patient.mail,
            data.patient.phone,
            data.patient.psychiatrist,
            data.patient.psychotherapist
        )
    );
}
