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

    static jsonToPatient(json: string): Patient {
        const data = JSON.parse(json);
        // console.log("Data ", data);
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