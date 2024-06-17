import Header from "../components/Header.tsx";
import {Patient} from "../classes/Patient.ts";
import Aside from "../components/Aside.tsx";
import InputGroupDisable from "../components/InputGroupDisable.tsx";
import {calculateAge, dateToString, extractBirthday} from "../functions/ExtracFromPNC.ts";
import React, {FC, useState} from "react";
import {
    isValidName,
    isValidPNC,
} from "../functions/CheckInputs.ts";
import InputGroup from "../components/InputGroup.tsx";
import {checkUniquePNC, updateData} from "../functions/EndPoints.ts";

interface Props {
    patient: Patient;
}

const MFPersonalData: FC<Props> = ({ patient }) => {
    const isPatientSession = sessionStorage.getItem('patient') !== null;
    const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);
    function handleEditData() {setIsEditEnabled(true);}

    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [pncValue, setPncValue] = useState("");

    const [firstNameErrorValue, setFirstNameErrorValue] = useState("");
    const [lastNameErrorValue, setLastNameErrorValue] = useState("");
    const [pncErrorValue, setPncErrorValue] = useState("");
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case 'firstName':
                setFirstNameValue(value);
                setFirstNameErrorValue(isValidName(value.trim()) ? '' : 'Nu este un nume valid.');
                break;
            case 'lastName':
                setLastNameValue(value);
                setLastNameErrorValue(isValidName(value.trim()) ? '' : 'Nu este un nume valid.');
                break;
            case 'pnc':
                setPncValue(value);
                setPncErrorValue(isValidPNC(value.trim())? '' : 'Nu este un cnp valid.');
                break;
            default:
                break;
        }
    };

    const handlePatientChange = async () => {
        if (firstNameValue !== '' || lastNameValue !== '' || pncValue !== '') {
            const firstName = firstNameValue || patient.firstName;
            const lastName = lastNameValue || patient.lastName;
            const pnc = pncValue || patient.pnc;
            if (isValidName(firstName) && isValidName(lastName) && isValidPNC(pnc)) {
                if (pnc !== patient.pnc && !await checkUniquePNC(pnc))
                    return;

                const updatePatient = {
                    "id": patient.id,
                    "firstName": firstName,
                    "lastName": lastName,
                    "mail": patient.mail,
                    "phone": patient.phone,
                    "psychiatrist": patient.psychiatrist,
                    "psychotherapist": patient.psychotherapist,
                    "pnc": pnc
                }
                const patient2 = JSON.stringify(updatePatient, null, 2);
                const response = await updateData("/patient/" + patient.id, patient2);
                if (response) {
                    sessionStorage.setItem('patient', JSON.stringify(response.valueOf()));
                    patient = response.valueOf();
                }
            }
            else alert("Date invalide");
        }
    };

    const birthday = extractBirthday(patient.pnc);
    const patientDetails = (
        <>
            <Aside patientId={patient.id} patientFirstName={patient.firstName} patientLastName={patient.lastName} idAside={0} />
            <div className="vertical ten-px-gap">
                <span className="mf-title">Date personale</span>
                {!isEditEnabled ? (
                    <>
                        <InputGroupDisable inputName="Prenume" initialValue={patient.firstName} />
                        <InputGroupDisable inputName="Nume" initialValue={patient.lastName} />
                        <InputGroupDisable inputName="Cod numeric personal" initialValue={patient.pnc} />
                        {birthday && (
                            <>
                                <InputGroupDisable inputName="Data nașterii" initialValue={dateToString(birthday)} />
                                <InputGroupDisable inputName="Vârstă" initialValue={calculateAge(birthday).toString()} />
                            </>
                        )}
                        <br />
                        {isPatientSession?
                            <span>Există greșeli? Cere medicului sau psihoterapeutului să le rezolve.</span> :
                            <button onClick={handleEditData} className="button-form">Editează</button>
                        }
                    </>
                ) : (
                    <>
                        <span>Există greșeli? Rescrie câmpurile unde acestea se află acestea.</span>
                        <InputGroup
                            label="Prenume"
                            name="firstName"
                            type="text"
                            value={firstNameValue}
                            placeholder={patient.firstName}
                            onChange={handleInputChange}
                            error={firstNameErrorValue}
                        />
                        <InputGroup
                            label="Nume de familie"
                            name="lastName"
                            type="text"
                            value={lastNameValue}
                            placeholder={patient.lastName}
                            onChange={handleInputChange}
                            error={lastNameErrorValue}
                        />
                        <InputGroup
                            label="Cod numeric personal"
                            name="pnc"
                            type="number"
                            value={pncValue}
                            placeholder={patient.pnc}
                            onChange={handleInputChange}
                            error={pncErrorValue}
                        />
                        <span>Data nașterii și vârsta se calculează în funcție de codul numeric personal.</span>
                        <button onClick={handlePatientChange} className="button-form">Salvează</button> {/* Butonul este dezactivat dacă editarea nu este activată */}
                    </>
                )}
            </div>
        </>
    );

    return (
        <>
            <Header />
            <main className="horizontal-1 ten-px-gap">
                {patientDetails}
            </main>
        </>
    );
};
export default MFPersonalData;