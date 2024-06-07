import {Question} from "./Question.ts";
import {Patient} from "./Patient.ts";

export class Answer{
    id: number;
    expirationDate: Date;
    answer: number;
    question: Question;
    patient: Patient;


    constructor(id: number, expirationDate: Date, answer: number,
                question: Question, patient: Patient) {
        this.id = id;
        this.expirationDate = expirationDate;
        this.answer = answer;

        this.question = new Question(question.id, question.content);
        this.patient = new Patient(patient.id,patient.pnc,patient.firstName,
            patient.lastName,patient.mail, patient.phone, patient.psychiatrist,
            patient.psychotherapist
        );
    }
}
