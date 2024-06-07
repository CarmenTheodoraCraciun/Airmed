import patientToJson, {Patient} from "./Patient.ts";

export class ContactPerson{
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    relationship: string;


    constructor(id: number, firstName: string, lastName: string, phone: string,
                relationship: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.relationship = relationship;
    }

    changeContactPerson(firstName: string, lastName: string, phone: string, relationship: string) : ContactPerson{
        if(firstName !== '') this.firstName = firstName;
        if(lastName !== '') this.lastName = lastName;
        if(relationship !== '') this.phone = phone;
        if(relationship !== this.relationship) this.relationship = relationship;
        return this;
    }

    static jsonToContactPersons(data: any[]): ContactPerson[] {
        const contactPersons: ContactPerson[] = [];
        for (let i = 0; i < 2; i++) {
            const item = data[i] || {};
            const contactPerson = new ContactPerson(
                item.id || -1,
                item.firstName || "",
                item.lastName || "",
                item.phone || "",
                item.relationship || ""
            );
            contactPersons.push(contactPerson);
        }

        return contactPersons;
    }
}

export default function contactPersonToJson(contact: ContactPerson, patient: Patient): string {
    const json = JSON.stringify({
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        relationship: contact.relationship,
        patient: patientToJson(patient)
    });
    return json;
}