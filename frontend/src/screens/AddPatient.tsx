import React, { useState } from "react";
import { Psychiatrist } from "../classes/Psychiatrist";
import { Psychotherapist } from "../classes/Psychotherapist";
import Header from "../components/Header";
import patientToJson, { Patient } from "../classes/Patient";
import MFDisableInput from "../components/MFDisableInput.tsx";
import {getData, updateData} from "../functions/EndPoints.ts";

interface Props {
    specialist: Psychiatrist | Psychotherapist;
}

const AddPatient: React.FC<Props> = ({ specialist }) => {
    const [cnp, setCnp] = useState('');
    const [patient, setPatient] = useState<Patient | null>(null);  // Update the state type to `Patient | null`
    const baseURL = "http://localhost:8080";
    const handleSearch = async () => {
        const response = await getData(baseURL+`/patient/PNC?PNC=${cnp}`);
        if (response.status === 200) {
            const data = await response.json();
            const patient = Patient.jsonToPatient(JSON.stringify(data));
            setPatient(patient);
            console.log(patient);
        } else {
            setPatient(null);
            alert("Nu există pacient.");
        }
    };

    const handleAddPatient = async () =>{
        if(patient) {
            if(specialist instanceof Psychiatrist)
                if(patient.psychiatrist === null){
                    patient.psychiatrist = specialist;
                    await updateData(baseURL + "/patient/psychiatrist/" + patient.id, patientToJson(patient));
                }
                else alert("Pacientul este asignat unui medic deja");
            else
                if(patient.psychotherapist === null){
                    patient.psychotherapist = specialist;
                    await updateData(baseURL + "/patient/psychotherapist/" + patient.id, patientToJson(patient));
                }
                else alert("Pacientul este asignat unui psihoterapeut deja");
        }
    }

    return (
        <>
            <Header />
            <main className="vertical add-p-container">
                <div className="horizontal-1 search-section">
                    <span className="mf-title">Introduceți CNP-ul pacientului</span>
                    <br/>
                    <input
                        type="text"
                        value={cnp}
                        onChange={(e) => setCnp(e.target.value)}
                        placeholder="Cod numeric personal"
                        className="input-mf"
                    />
                    <br/>
                    <button className="button-2" onClick={handleSearch}>Caută pacient</button>
                </div>
                {patient && (
                    <div className="vertical result-section">
                        <span className="mf-title">Pacientul cu codul numeric personal</span>
                        <MFDisableInput inputName="" placeholderValue={patient.pnc}/>
                        <MFDisableInput inputName="Prenume" placeholderValue={patient.firstName}/>
                        <MFDisableInput inputName="Nume de familie" placeholderValue={patient.lastName}/>
                        <br/>
                        <p>Nu este ceea ce căutați?</p>
                        <p>Verificați datele introduse, atât de către specialist, cât și de către pacient.</p>
                        <button className="button-2" onClick={handleAddPatient}>Adaugă pacient</button>
                    </div>
                )}
            </main>
        </>
    );
};

export default AddPatient;