import {Patient} from "./Patient.ts";

export class SocialContext{
    id: number;
    occupation: string;
    highestEdu: string;
    relationship: string;
    sexuallyActive: string;
    genderOrientation: string;
    legalProblems: string;
    adopted: boolean;
    family: string;
    familyPsychiatric: string;
    drugs: string;
    alcohol: string;
    abuseMeds: string;
    caffeine: string;
    exercise: string;
    patient: Patient;


    constructor(id: number, occupation: string, highestEdu: string, relationship: string, sexuallyActive: string, genderOrientation: string, legalProblems: string, adopted: boolean, family: string, familyPsychiatric: string, drugs: string, alcohol: string, abuseMeds: string, caffeine: string, exercise: string, patient: Patient) {
        this.id = id;
        this.occupation = occupation;
        this.highestEdu = highestEdu;
        this.relationship = relationship;
        this.sexuallyActive = sexuallyActive;
        this.genderOrientation = genderOrientation;
        this.legalProblems = legalProblems;
        this.adopted = adopted;
        this.family = family;
        this.familyPsychiatric = familyPsychiatric;
        this.drugs = drugs;
        this.alcohol = alcohol;
        this.abuseMeds = abuseMeds;
        this.caffeine = caffeine;
        this.exercise = exercise;

        this.patient = new Patient(patient.id,patient.PNC,patient.firstName,
            patient.lastName,patient.mail, patient.phone, patient.psychiatrist,
            patient.psychotherapist,patient.salts
        );
    }
}