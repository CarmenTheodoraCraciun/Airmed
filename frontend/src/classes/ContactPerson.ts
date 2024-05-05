export class ContactPerson{
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    relationship: string;
    // patient: Patient;


    constructor(id: number, firstName: string, lastName: string, phone: string,
                relationship: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.relationship = relationship;
        // this.patient = new Patient(patient.id,patient.pnc,patient.firstName,
        //     patient.lastName,patient.mail, patient.phone, patient.psychiatrist,
        //     patient.psychotherapist
        // );

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