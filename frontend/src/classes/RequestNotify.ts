import { Psychiatrist } from './Psychiatrist';
import { Psychotherapist } from './Psychotherapist';
import { Patient } from './Patient';

export class RequestNotify {
    id: number;
    status: boolean;
    type: string;
    psychiatrist: Psychiatrist;
    psychotherapist: Psychotherapist | null;
    patient: Patient;

    constructor(
        id: number,
        status: boolean,
        type: string,
        psychiatrist: Psychiatrist,
        psychotherapist: Psychotherapist | null,
        patient: Patient
    ) {
        this.id = id;
        this.status = status;
        this.type = type;
        this.psychiatrist = psychiatrist;
        this.psychotherapist = psychotherapist;
        this.patient = patient;
    }

    static jsonToRequest(json: string): RequestNotify {
        const data = JSON.parse(json);
        return new RequestNotify(
            data.id,
            data.status,
            data.type,
            data.psychiatrist,
            data.psychotherapist,
            data.patient
        );
    }
}