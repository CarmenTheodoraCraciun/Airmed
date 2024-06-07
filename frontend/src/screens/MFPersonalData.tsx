import Header from "../components/Header.tsx";
import {Patient} from "../classes/Patient.ts";
import Aside from "../components/Aside.tsx";
import MFDisableInput from "../components/MFDisableInput.tsx";
import {calculateAge, dateToString, extractBirthday} from "../functions/ExtracFromPNC.ts";
import MFInput from "../components/MFInput.tsx";
import {FC, useState} from "react";

interface Props {
    patient: Patient;
}

const MFPersonalData: FC<Props> = ({ patient }) => {
    const [editedPatient, setEditedPatient] = useState<Patient>(patient);

    const handlePatientChange = (field: keyof Patient, value: string | null) => {
        setEditedPatient((prevState: Patient) => {
            return new Patient(
                prevState.id,
                field === 'pnc' ? (value !== null ? value : '') : prevState.pnc,
                field === 'firstName' ? (value !== null ? value : '') : prevState.firstName,
                field === 'lastName' ? (value !== null ? value : '') : prevState.lastName,
                prevState.mail,
                prevState.phone,
                prevState.psychiatrist,
                prevState.psychotherapist
            );
        });
    };

    const isPatientSession = sessionStorage.getItem('patient') !== null;
    const birthday = extractBirthday(editedPatient.pnc);

    const patientDetails = (
        <>
            <Aside patientId={patient.id} patientFirstName={editedPatient.firstName} patientLastName={patient.lastName} idAside={0} />
            <div className="vertical ten-px-gap">
                <span className="mf-title">Date personale</span>
                {isPatientSession ? (
                    <>
                        <MFDisableInput inputName="Prenume" initialValue={editedPatient.firstName} />
                        <MFDisableInput inputName="Nume" initialValue={editedPatient.lastName} />
                        <MFDisableInput inputName="Cod numeric personal" initialValue={editedPatient.pnc} />
                        {birthday && (
                            <>
                                <MFDisableInput inputName="Data nașterii" initialValue={dateToString(birthday)} />
                                <MFDisableInput inputName="Vârstă" initialValue={calculateAge(birthday).toString()} />
                            </>
                        )}
                        <br />
                        <span>Există greșeli? Cere medicului să le rezolve.</span>
                    </>
                ) : (
                    <>
                        <span>Există greșeli? Rescrie câmpurile unde acestea se află acestea.</span>
                        <span>Data nașterii și vârsta se calculează în funcție de codul numeric personal.</span>
                        <MFInput
                            inputName="Prenume"
                            initialValue={patient.firstName}
                            onChange={(value) => handlePatientChange('firstName', value)}
                        />
                        <MFInput
                            inputName="Nume"
                            initialValue={patient.lastName}
                            onChange={(value) => handlePatientChange('lastName', value)}
                        />
                        <MFInput
                            inputName="Cod numeric personal"
                            initialValue={patient.pnc}
                            onChange={(value) => handlePatientChange('pnc', value)}
                        />
                        {birthday && (
                            <>
                                <MFDisableInput inputName="Data nașterii" initialValue={dateToString(birthday)} />
                                <MFDisableInput inputName="Vârstă" initialValue={calculateAge(birthday).toString()} />
                            </>
                        )}
                        <button className="button-form">Salvează</button>
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