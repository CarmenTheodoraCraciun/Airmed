export class Psychotherapist{
    id: number;
    medicalNumber: string;
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
    bio: string;
    country: string;
    locality: string;
    cabinetLocation: string;
    linkLocation: string;
    priceConsult: number;
    priceConsultation: number;
    online: boolean;
    CNAS: boolean;

    constructor(id: number,
                medicalNumber: string,
                firstName: string,
                lastName: string,
                mail: string,
                bio: string,
                phone: string,
                country: string,
                locality: string,
                cabinetLocation: string,
                linkLocation: string,
                priceConsult: number,
                priceConsultation: number,
                online: boolean,
                CNAS: boolean) {
        this.id = id;
        this.priceConsultation = priceConsultation;
        this.priceConsult = priceConsult;
        this.CNAS = CNAS;
        this.online = online;
        this.bio = bio;
        this.medicalNumber = medicalNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mail = mail;
        this.phone = phone;
        this.country = country;
        this.locality = locality;
        this.cabinetLocation = cabinetLocation;
        this.linkLocation = linkLocation;
    }

    static jsonToPsychotherapist(json: string) {
        const data = JSON.parse(json);
        // console.log("Data ", data);
        return new Psychotherapist(
            data.id,
            data.medicalNumber,
            data.firstName,
            data.lastName,
            data.mail,
            data.bio,
            data.phone,
            data.country,
            data.locality,
            data.cabinetLocation,
            data.linkLocation,
            data.priceConsult,
            data.priceConsultation,
            data.online,
            data.CNAS
        );
    }
}

export default function psychotherapistToJson(psychotherapist: Psychotherapist): string {
    const json = JSON.stringify({
        id: psychotherapist.id,
        medicalNumber: psychotherapist.medicalNumber,
        firstName: psychotherapist.firstName,
        lastName: psychotherapist.lastName,
        bio: psychotherapist.bio,
        mail: psychotherapist.mail,
        phone: psychotherapist.phone,
        country: psychotherapist.country,
        locality: psychotherapist.locality,
        cabinetLocation: psychotherapist.cabinetLocation,
        linkLocation: psychotherapist.linkLocation,
        priceConsult: psychotherapist.priceConsult,
        priceConsultation: psychotherapist.priceConsultation,
        online: psychotherapist.online,
        CNAS: psychotherapist.CNAS
    });
    return json;
}