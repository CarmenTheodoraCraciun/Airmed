import {Question} from "./Question.ts";
import {Patient} from "./Patient.ts";

export class Answer{
    id: number;
    answer: number;
    question: Question;
    patient: Patient;
    createdAt: Date;

    constructor(id: number, answer: number,
                question: Question, patient: Patient) {
        this.id = id;
         this.answer = answer;

        this.question = new Question(question.id, question.content);
        this.patient = new Patient(patient.id,patient.pnc,patient.firstName,
            patient.lastName,patient.mail, patient.phone, patient.psychiatrist,
            patient.psychotherapist
        );
    }
}
