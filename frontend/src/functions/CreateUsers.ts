import {Patient} from "../classes/Patient.ts";

export function createPatientFromJSON(patientDataString: string): Patient | null {
    try {
        const patientData = JSON.parse(patientDataString);
        // Extrage datele
        const { id, PNC, firstName, lastName, mail, phone, psychiatrist, psychotherapist } = patientData;
        return new Patient(id, PNC, firstName, lastName, mail, phone, psychiatrist, psychotherapist);
    } catch (error) {
        console.error('Eroare la parsarea datelor JSON:', error);
        return null;
    }
}