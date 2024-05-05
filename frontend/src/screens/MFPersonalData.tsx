import Header from "../components/Header.tsx";
import {Patient} from "../classes/Patient.ts";
import Aside from "../components/Aside.tsx";
import MFDisableInput from "../components/MFDisableInput.tsx";
import {useEffect, useState} from "react";
import {extractBirthday, dateToString, calculateAge} from "../functions/ExtracFromPNC.ts";
import Loading from "../components/Loading.tsx";

interface Props {
    patientId: number;
}

function MFPersonalData({ patientId }: Props) {
    const baseURL: string = "http://localhost:8080";
    const patientDataString = sessionStorage.getItem('patient');
    // const psychiatristDataString = sessionStorage.getItem('psychiatrist');
    const psychotherapistDataString = sessionStorage.getItem('psychotherapist');

    const [detalies, setDetails] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const getPatient = async () => {
            const response = await fetch(baseURL + '/patient/' + patientId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173'
                }
            });
            if (response.status === 302){
                const data = await response.json();
                const patient = Patient.jsonToPatient(JSON.stringify(data));
                const bd = extractBirthday(patient.pnc);
                let inputs = null;
                if (patientDataString !== null || psychotherapistDataString !== null) {
                    // contul este de pacient sau terapeut
                    inputs = (
                        <>
                            <MFDisableInput inputName="Prenume" placeholderValue={patient.firstName}/>
                            <MFDisableInput inputName="Nume" placeholderValue={patient.lastName}/>
                            <MFDisableInput inputName="Cod numeric personal" placeholderValue={patient.pnc}/>
                            {bd !== null ?
                                <>
                                    <MFDisableInput inputName="Data nașterii" placeholderValue={dateToString(bd)}/>
                                    <MFDisableInput inputName="Vârstă" placeholderValue={calculateAge(bd).toString()}/>
                                </>
                                : null
                            }
                            <br/>
                            <span>Există greșeli? Cere medicului să le rezolve.</span>
                        </>
                    );
                }

                const details = (
                    <>
                        <Aside patientId={patient.id} patientFirstName={patient.firstName} patientLastName={patient.lastName} idAside={0}/>
                        <div className="vertical ten-px-gap">
                            <span className="mf-title">Date personale</span>
                            {inputs}
                        </div>
                    </>
                );

                setDetails(details);
            }
        };

        getPatient();
    }, [patientId, patientDataString]);

    return (
        <>
            <Header/>
            <main className="horizontal-1 ten-px-gap">
                {detalies === null ?
                    <Loading/>
                    : detalies
                }
            </main>
        </>
    );
}

export default MFPersonalData;