import Header from "../components/Header.tsx";
import patientToJson, {Patient} from "../classes/Patient.ts";
import Aside from "../components/Aside.tsx";
import React, { useEffect, useState} from "react";
import MFInput from "../components/MFInput.tsx";
import {ContactPerson} from "../classes/ContactPerson.ts";
interface Props {
    patient: Patient;
}

function MFContactData({ patient }: Props) {
    const relationshipOptions = ['Sot/ Sotie', 'Tata/ Mama', 'Frate/ Sora', 'Iubit/ Iubita', 'Copil', 'Bunic/ Bunica', 'Unchi/ Matusa','Nas/ Nasa', 'Fin/ Fina', 'Prieten/ Prietena', 'Var/ Verisoara', 'Altceva'];
    const baseURL: string = "http://localhost:8080";
    const patientDataString = sessionStorage.getItem('patient');

    const [phone, setPhone] = useState<string>('');
    const [mail, setMail] = useState<string>('');

    const [contactPerson0,setContactPerson0] = useState<ContactPerson | null>(null);
    const [contactPerson1,setContactPerson1] = useState<ContactPerson | null>(null);
    const [elContactPerson0, setElContactPerson0] = useState<(JSX.Element | null)>(null);
    const [elContactPerson1, setElContactPerson1] = useState<(JSX.Element | null)>(null);

    const [firstName0, setFirstName0] = useState<string>('');
    const [lastNames0, setLastName0] = useState<string>('');
    const [relationship0, setRelationship0] = useState<string>('');
    const [phone0, setPhone0] = useState<string>('');
    const [firstName1, setFirstName1] = useState<string>('');
    const [lastNames1, setLastName1] = useState<string>('');
    const [relationship1, setRelationship1] = useState<string>('');
    const [phone1, setPhone1] = useState<string>('');

    const handleInputChange = (name: string, value: string | null) => {
        const sanitizedValue = value !== null ? value : '';
        switch (name) {
            case 'phone':
                setPhone(sanitizedValue);
                break;
            case 'mail':
                setMail(sanitizedValue);
                break;
            case 'firstName0':
                setFirstName1(sanitizedValue);
                break;
            case 'lastName0':
                setLastName0(sanitizedValue);
                break;
            case 'relationship0':
                setRelationship0(sanitizedValue);
                break;
            case 'phone0':
                setPhone0(sanitizedValue);
                break;
            case 'firstName1':
                setFirstName1(sanitizedValue);
                break;
            case 'lastName1':
                setLastName1(sanitizedValue);
                break;
            case 'relationship1':
                setRelationship1(sanitizedValue);
                break;
            case 'phone1':
                setPhone1(sanitizedValue);
                break;
            default:
                break;
        }
    };
    const handleSelectChange = (name: string, event: React.ChangeEvent<HTMLSelectElement>) => {
        switch (name){
            case 'r0':
                setRelationship0(event.target.value);
                break;
            case 'r1':
                setRelationship1(event.target.value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
            const getContactPerson = async () => {
                const response = await fetch(baseURL + '/contactPerson/patient?patient=' + patient.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:5173'
                    }
                });
                let data = null;
                if( response.status === 302)
                    data = await response.json();
                const contact = ContactPerson.jsonToContactPersons(data);
                setContactPerson0(contact[0]);
                setContactPerson1(contact[1]);
                var element = <>
                    <span className="mf-title">Contact persoană 1</span>
                    <MFInput inputName="Prenume" initialValue={contact[0].firstName}
                             onChange={(value) => handleInputChange('firstName0', value)}/>
                    <MFInput inputName="Nume" initialValue={contact[0].lastName}
                             onChange={(value) => handleInputChange('lastName0', value)}/>
                    <div className="input-group-mf">
                        <span className="input-span">Relatie</span><br/>
                        <select id="relationship" className="select-mf" onChange={
                            (value) => handleSelectChange('r0', value)}
                                defaultValue={contact[0].relationship}>
                            {relationshipOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <MFInput inputName="Telefon" initialValue={contact[0].phone}
                             onChange={(value) => handleInputChange('phone0', value)}/>
                </>;
                setElContactPerson0(element);
                var element = <>
                    <span className="mf-title">Contact persoană 2</span>
                    <MFInput inputName="Prenume" initialValue={contact[1].firstName}
                             onChange={(value) => handleInputChange('firstName1', value)}/>
                    <MFInput inputName="Nume" initialValue={contact[1].lastName}
                             onChange={(value) => handleInputChange('lastName1', value)}/>
                    <div className="input-group-mf">
                        <span className="input-span">Relatie</span><br/>
                        <select id="relationship" className="select-mf" onChange={
                            (value) => handleSelectChange('r1', value)}
                                defaultValue={contact[0].relationship}>
                            {relationshipOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <MFInput inputName="Telefon" initialValue={contact[1].phone}
                             onChange={(value) => handleInputChange('phone1', value)}/>
                </>;
                setElContactPerson1(element);
            }
            getContactPerson();
        }, [patient !== null]);

    const handleSaveButtonClick = async () => {
        // update patient
        if(patient !== null && (phone !== '' || mail !== '')){
            patient.changeMailOrPhone(mail, phone);
            const patientJson = patientToJson(patient);
            const url = `${baseURL}/patient/${patient.id}`;
            await updateData(url,patientJson);
        }
        // if(patient !== null && contactPerson1 !== null && (
        //     firstName0 !== '' || lastName0 !== '' || phone0 !== '' || relationship0 !== contactPerson1.relationship
        // )){
        //     contactPerson1.changeContactPerson(firstName0,lastName0,phone0,relationship0);
        //     const contactPersonJson = contactPersonToJson(contactPerson1, patient);
        //     console.log(contactPersonJson);
        // }
    };

    return (
        <>
            <Header/>
            <main className="horizontal-1 ten-px-gap">
                <Aside patientId={patient.id} patientFirstName={patient.firstName}
                       patientLastName={patient.lastName} idAside={1}/>
                <div className="vertical ten-px-gap">
                    <span className="mf-title">Date de contact personal</span>
                    <MFInput inputName="Număr de telefon" initialValue={patient.phone}
                             onChange={(value) => handleInputChange('phone', value)}/>
                    <MFInput inputName="Mail" initialValue={patient.mail}
                             onChange={(value) => handleInputChange('phone', value)}/>
                    {elContactPerson0}
                </div>
                <div className="vertical ten-px-gap">
                    {elContactPerson1}
                    {patientDataString !== null ?
                        <button className="button-1" onClick={handleSaveButtonClick}>Salvează</button>
                        : null}
                </div>
            </main>
        </>
    );
}

export default MFContactData;