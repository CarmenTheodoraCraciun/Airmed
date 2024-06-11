// Define the Patient class
import {Psychiatrist} from "./Psychiatrist.ts";
import {Psychotherapist} from "./Psychotherapist.ts";

export class Patient {
    id: number;
    pnc: string;
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
    psychiatrist: Psychiatrist;
    psychotherapist: Psychotherapist;

    constructor(id: number, pnc: string, firstName: string, lastName: string, mail: string,
                phone: string, psychiatrist: Psychiatrist, psychotherapist: Psychotherapist) {
        this.id = id;
        this.pnc = pnc;
        this.psychiatrist = psychiatrist;
        this.psychotherapist = psychotherapist;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.phone = phone;
    }

    changeMailOrPhone(mail: string, phone:string) :Patient{
        if(mail !== '') this.mail = mail;
        if(phone !== '') this.phone = phone;
        return this;
    }

    static jsonToPatient(json: string): Patient {
        const data = JSON.parse(json);
        return new Patient(
            data.id,
            data.pnc,
            data.firstName,
            data.lastName,
            data.mail,
            data.phone,
            data.psychiatrist,
            data.psychotherapist
        );
    }

}

export default function patientToJson(patient: Patient): string {
    const json = JSON.stringify({
        id: patient.id,
        pnc: patient.pnc,
        firstName: patient.firstName,
        lastName: patient.lastName,
        mail: patient.mail,
        phone: patient.phone,
        psychiatrist: patient.psychiatrist,
        psychotherapist: patient.psychotherapist
    });
    return json;
}