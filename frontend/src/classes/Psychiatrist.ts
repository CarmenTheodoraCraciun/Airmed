export class Psychiatrist{

    id: number;
    medicalNumber: string;
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
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

    static jsonToPsychiatrist(json: string) {
        const data = JSON.parse(json);
        // console.log("Data ", data);
        return new Psychiatrist(
            data.id,
            data.medicalNumber,
            data.firstName,
            data.lastName,
            data.mail,
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

export default function psychiatristToJson(psychiatrist: Psychiatrist): string {
    const json = JSON.stringify({
        id: psychiatrist.id,
        medicalNumber: psychiatrist.medicalNumber,
        firstName: psychiatrist.firstName,
        lastName: psychiatrist.lastName,
        mail: psychiatrist.mail,
        phone: psychiatrist.phone,
        country: psychiatrist.country,
        locality: psychiatrist.locality,
        cabinetLocation: psychiatrist.cabinetLocation,
        linkLocation: psychiatrist.linkLocation,
        priceConsult: psychiatrist.priceConsult,
        priceConsultation: psychiatrist.priceConsultation,
        online: psychiatrist.online,
        CNAS: psychiatrist.CNAS
    });
    return json;
}