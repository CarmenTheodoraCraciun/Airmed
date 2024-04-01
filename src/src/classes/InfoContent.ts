import {Psychiatrist} from "./Psychiatrist.ts";
import {Psychotherapist} from "./Psychotherapist.ts";

export class InfoContent{
    id: number;
    content: string;
    imgLink: string;
    tags: string;
    psychiatrist: Psychiatrist;
    psychotherapist: Psychotherapist;


    constructor(id: number, content: string, imgLink: string, tags: string, psychiatrist: Psychiatrist, psychotherapist: Psychotherapist) {
        this.id = id;
        this.content = content;
        this.imgLink = imgLink;
        this.tags = tags;
        this.psychiatrist = new Psychiatrist(
            psychiatrist.id, psychiatrist.medicalNumber, psychiatrist.firstName,
            psychiatrist.lastName, psychiatrist.mail, psychiatrist.phone,
            psychiatrist.country, psychiatrist.locality, psychiatrist.cabinetLocation,
            psychiatrist.linkLocation, psychiatrist.priceConsult, psychiatrist.priceConsultation,
            psychiatrist.online, psychiatrist.CNAS, psychiatrist.salts
        );

        this.psychotherapist = new Psychotherapist(
            psychotherapist.id, psychotherapist.medicalNumber, psychotherapist.firstName,
            psychotherapist.lastName, psychotherapist.mail, psychotherapist.phone,
            psychotherapist.country, psychotherapist.locality, psychotherapist.cabinetLocation,
            psychotherapist.linkLocation, psychotherapist.priceConsult, psychotherapist.priceConsultation,
            psychotherapist.online, psychotherapist.CNAS, psychotherapist.salts
        );
    }
}