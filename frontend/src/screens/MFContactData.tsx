import Header from "../components/Header.tsx";
import { Patient } from "../classes/Patient.ts";
import Aside from "../components/Aside.tsx";
import React, {useEffect, useState} from "react";
import {ContactPerson} from "../classes/ContactPerson.ts";
import {getData, postData, updateData} from "../functions/EndPoints.ts";
import MFDisableInput from "../components/MFDisableInput.tsx";
import Loading from "../components/Loading.tsx";
import {isValidEmail, isValidName, isValidPhoneNumber} from "../functions/CheckInputs.ts";
import InputGroup from "../components/InputGroup.tsx";

interface Props {
    patient: Patient;
}

function MFContactData({ patient }: Props) {
    const isPatientSession = sessionStorage.getItem('patient') !== null;
    const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);
    const [getResponse,setGetResponse] = useState<boolean>(false);
    const [contactPerson0, setContactPerson0] = useState<ContactPerson | null>(null);
    const [contactPerson1, setContactPerson1] = useState<ContactPerson | null>(null);
    function handleEditData() {setIsEditEnabled(true);}
    // get contaact people
    useEffect(() => {
        const getContactPerson = async () => {
            try {
                const response = await getData('/contactPerson/patient?patient=' + patient.id);
                if(response !== 404) {
                    setContactPerson0(response[0]);
                    setContactPerson1(response[1]);
                }
                setGetResponse(true);
            } catch (error) {
                console.error('Failed to fetch contact person data:', error);
            }
        };

        getContactPerson();
    }, [patient]);

    const relationshipOptions = ['Sot/ Sotie', 'Tata/ Mama', 'Frate/ Sora', 'Iubit/ Iubita', 'Copil', 'Bunic/ Bunica', 'Unchi/ Matusa','Nas/ Nasa', 'Fin/ Fina', 'Prieten/ Prietena', 'Var/ Verisoara', 'Altceva'];

    const [mailValue, setMailValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [firstName0Value, setFirstName0Value] = useState("");
    const [lastName0Value, setLastName0Value] = useState("");
    const [rel0Value, setRel0Value] = useState("");
    const [phone0Value, setPhone0Value] = useState("");
    const [firstName1Value, setFirstName1Value] = useState("");
    const [lastName1Value, setLastName1Value] = useState("");
    const [rel1Value, setRel1Value] = useState("");
    const [phone1Value, setPhone1Value] = useState("");

    const [mailErrorValue, setMailErrorValue] = useState("");
    const [phoneErrorValue, setPhoneErrorValue] = useState("");
    const [firstName0ErrorValue, setFirstName0ErrorValue] = useState("");
    const [lastName0ErrorValue, setLastName0ErrorValue] = useState("");
    const [phone0ErrorValue, setPhone0ErrorValue] = useState("");
    const [firstName1ErrorValue, setFirstName1ErrorValue] = useState("");
    const [lastName1ErrorValue, setLastName1ErrorValue] = useState("");
    const [phone1ErrorValue, setPhone1ErrorValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case 'mail':
                setMailValue(value);
                setMailErrorValue(isValidEmail(value.trim()) ? '' : 'Nu este un mail valid');
                break;
            case 'phone':
                setPhoneValue(value);
                setPhoneErrorValue(isValidPhoneNumber(value.trim()) ? '' : 'Nu este un telefon valid');
                break;
            case 'firstName0':
                setFirstName0Value(value);
                setFirstName0ErrorValue(isValidName(value.trim()) ? '' : 'Nu este un nume valid.');
                break;
            case 'lastName0':
                setLastName0Value(value);
                setLastName0ErrorValue(isValidName(value.trim()) ? '' : 'Nu este un nume valid.');
                break;
            case 'phone0':
                setPhone0Value(value);
                setPhone0ErrorValue(isValidPhoneNumber(value.trim()) ? '' : 'Nu este un telefon valid');
                break;
            case 'firstName1':
                setFirstName1Value(value);
                setFirstName1ErrorValue(isValidName(value.trim()) ? '' : 'Nu este un nume valid.');
                break;
            case 'lastName1':
                setLastName1Value(value);
                setLastName1ErrorValue(isValidName(value.trim()) ? '' : 'Nu este un nume valid.');
                break;
            case 'phone1':
                setPhone1Value(value);
                setPhone1ErrorValue(isValidPhoneNumber(value.trim()) ? '' : 'Nu este un telefon valid');
                break;
            default:
                break;
        }
    };
    const handleSelectChange = (name: string, event: React.ChangeEvent<HTMLSelectElement>) => {
        switch (name){
            case 'r0':
                setRel0Value(event.target.value);
                break;
            case 'r1':
                setRel1Value(event.target.value);
                break;
            default:
                break;
        }
    };
    async function updateOrCreateContactPerson(firstName2Value: string, lastName2Value: string,
        rel2Value: string, phone2Value: string, contactPerson2: ContactPerson | null,) {
        if (firstName2Value !== '' || lastName2Value !== '' || rel2Value !== '' || phone2Value !== '') {
            const firstName = firstName2Value || (contactPerson2?.firstName ?? null);
            const lastName = lastName2Value || (contactPerson2?.lastName ?? null);
            const rel = rel2Value || (contactPerson2?.relationship ?? null);
            const phone = phone2Value || (contactPerson2?.phone ?? null);
            // console.log(firstName, lastName, rel, phone);
            if (firstName && lastName && rel && phone &&
                isValidName(firstName) && isValidName(lastName) && isValidPhoneNumber(phone)) {
                if (contactPerson2) {
                    const updateCP ={
                        "id": contactPerson2.id,
                        "firstName": firstName,
                        "lastName": lastName,
                        "phone": phone,
                        "relationship": rel,
                        "patient": patient
                    }
                    const cp = JSON.stringify(updateCP, null, 2);
                    const response = await updateData(`/contactPerson/${contactPerson2.id}`, cp);
                    if (response) return true;
                } else {
                    const updateCP ={
                        "firstName": firstName,
                        "lastName": lastName,
                        "phone": phone,
                        "relationship": rel,
                        "patient": patient
                    }
                    const cp = JSON.stringify(updateCP, null, 2);
                    const response = await postData('/contactPerson', cp);
                    if (response !== null) {
                        if (response.status !== 201) return true;
                    }
                }
            }
            else alert("Date invalide");
        }
        return false;
    }

    const handleContactDataChange = async () => {
        if(mailValue !== '' || phoneValue !== '' || firstName0Value !== '' || lastName0Value !== '' ||  rel0Value !== '' ||
            phone0Value !== '' || firstName1Value !== '' || lastName1Value !== '' ||  rel1Value !== '' || phone1Value !== ''){
            var sw = false;
            if(mailValue !== '' || phoneValue !== ''){
                // modifica date proprii
                const mail = mailValue || patient.mail;
                const phone = phoneValue || patient.phone;
                if(isValidEmail(mail) && isValidPhoneNumber(phone)){
                    const updatePatient = {
                        "id": patient.id,
                        "firstName": patient.firstName,
                        "lastName": patient.lastName,
                        "mail": mail,
                        "phone": phone,
                        "psychiatrist": patient.psychiatrist,
                        "psychotherapist": patient.psychotherapist,
                        "pnc": patient.pnc
                    }
                    const patient2 = JSON.stringify(updatePatient, null, 2);
                    // console.log(patient2);
                    const response = await updateData("/patient/" + patient.id, patient2);
                    if (response) {
                        sessionStorage.setItem('patient', JSON.stringify(response.valueOf()));
                        patient = response.valueOf();
                        sw = true;
                    }
                }
                else alert("Date invalide");
            }
            const CUContact0 = await updateOrCreateContactPerson(firstName0Value, lastName0Value, rel0Value, phone0Value, contactPerson0);
            const CUContact1 = await updateOrCreateContactPerson(firstName1Value, lastName1Value, rel1Value, phone1Value, contactPerson1);

            if(sw || CUContact0 || CUContact1) alert("Date actualizate.");
            else alert("Te rugăm să încerci mai târziu");
        }
    }

    return (
        <>
            <Header />
            <main className="horizontal-1 ten-px-gap">
                <Aside patientId={patient.id} patientFirstName={patient.firstName} patientLastName={patient.lastName} idAside={1}/>
                {isEditEnabled?
                    // date editabile
                    <>
                        <div className="vertical ten-px-gap">
                            <span>Există greșeli? Rescrie câmpurile unde acestea se află acestea.</span>
                            <InputGroup
                                label="Mail"
                                name="mail"
                                type="text"
                                value={mailValue}
                                placeholder={patient.mail}
                                onChange={handleInputChange}
                                error={mailErrorValue}
                            />
                            <InputGroup
                                label="Număr de telefon"
                                name="phone"
                                type="number"
                                value={phoneValue}
                                placeholder={patient.phone}
                                onChange={handleInputChange}
                                error={phoneErrorValue}
                            />
                            {getResponse ?
                                <>
                                    <span className="mf-title">Persoană de contact 1</span>
                                    <InputGroup
                                        label="Prenume"
                                        name="firstName0"
                                        type="text"
                                        value={firstName0Value}
                                        placeholder={contactPerson0?.firstName ?? ""}
                                        onChange={handleInputChange}
                                        error={firstName0ErrorValue}
                                    />
                                    <InputGroup
                                        label="Nume de familie"
                                        name="lastName0"
                                        type="text"
                                        value={lastName0Value}
                                        placeholder={contactPerson0?.lastName ?? ""}
                                        onChange={handleInputChange}
                                        error={lastName0ErrorValue}
                                    />
                                    <div className="input-group-mf">
                                        <span className="input-span">Relatie</span><br/>
                                        <select id="relationship" className="select-mf" onChange={
                                            (value) => handleSelectChange('r0', value)}
                                                defaultValue={contactPerson0?.phone ?? ""}>
                                            {relationshipOptions.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputGroup
                                        label="Număr de telefon"
                                        name="phone0"
                                        type="text"
                                        value={phone0Value}
                                        placeholder={contactPerson0?.phone ?? ""}
                                        onChange={handleInputChange}
                                        error={phone0ErrorValue}
                                    />
                                </> : null
                            }
                        </div>
                        <div className="vertical ten-px-gap">
                            {getResponse ?
                                <>
                                    <span className="mf-title">Persoană de contact 2</span>
                                    <InputGroup
                                        label="Prenume"
                                        name="firstName1"
                                        type="text"
                                        value={firstName1Value}
                                        placeholder={contactPerson1?.firstName ?? ""}
                                        onChange={handleInputChange}
                                        error={firstName1ErrorValue}
                                    />
                                    <InputGroup
                                        label="Nume de familie"
                                        name="lastName1"
                                        type="text"
                                        value={lastName1Value}
                                        placeholder={contactPerson1?.lastName ?? ""}
                                        onChange={handleInputChange}
                                        error={lastName1ErrorValue}
                                    />
                                    <div className="input-group-mf">
                                        <span className="input-span">Relatie</span><br/>
                                        <select id="relationship" className="select-mf" onChange={
                                            (value) => handleSelectChange('r1', value)}
                                                defaultValue={contactPerson1?.phone ?? ""}>
                                            {relationshipOptions.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputGroup
                                        label="Număr de telefon"
                                        name="phone1"
                                        type="text"
                                        value={phone1Value}
                                        placeholder={contactPerson1?.phone ?? ""}
                                        onChange={handleInputChange}
                                        error={phone1ErrorValue}
                                    />
                                    <button onClick={handleContactDataChange} className="button-form">Salvează</button>
                                </> :
                                null
                            }
                        </div>
                        </> :
                    // date needitabile
                    <>
                        <div className="vertical ten-px-gap">
                            <MFDisableInput inputName="Mail" initialValue={patient.mail} />
                            <MFDisableInput inputName="Număr de telefon" initialValue={patient.phone}/>
                            {getResponse ?
                                <>
                                    <span className="mf-title">Persoană de contact 1</span>
                                    <MFDisableInput inputName="Prenume" initialValue={contactPerson0?.firstName ?? ""} />
                                    <MFDisableInput inputName="Nume de familie" initialValue={contactPerson0?.lastName ?? ""} />
                                    <MFDisableInput inputName="Relație" initialValue={contactPerson0?.relationship ?? ""} />
                                    <MFDisableInput inputName="Număr de telefon" initialValue={contactPerson0?.phone ?? ""} />
                                </> :
                                <Loading/>
                            }
                        </div>
                        <div className="vertical ten-px-gap">
                            {getResponse ?
                                <>
                                    <span className="mf-title">Persoană de contact 2</span>
                                    <MFDisableInput inputName="Prenume" initialValue={contactPerson1?.firstName ?? ""} />
                                    <MFDisableInput inputName="Nume de familie" initialValue={contactPerson1?.lastName ?? ""} />
                                    <MFDisableInput inputName="Relație" initialValue={contactPerson1?.relationship ?? ""} />
                                    <MFDisableInput inputName="Număr de telefon" initialValue={contactPerson1?.phone ?? ""} />
                                    {isPatientSession?
                                        <button onClick={handleEditData} className="button-form">Editează</button>
                                        : null
                                    }
                                </> :
                                null
                            }
                        </div>
                    </>
                }
            </main>
        </>
    );
}

export default MFContactData;