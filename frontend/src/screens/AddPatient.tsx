import {FC, useState} from "react";
import psychiatristToJson, { Psychiatrist } from "../classes/Psychiatrist";
import psychotherapistToJson, { Psychotherapist } from "../classes/Psychotherapist";
import Header from "../components/Header";
import { Patient } from "../classes/Patient";
import InputGroupDisable from "../components/InputGroupDisable.tsx";
import {getData, updateData} from "../functions/EndPoints.ts";

interface Props {
    specialist: Psychiatrist | Psychotherapist;
    dr: boolean;
}

const AddPatient: FC<Props> = ({ specialist, dr }) => {
    const [cnp, setCnp] = useState('');
    const [patient, setPatient] = useState<Patient | null>(null);  // Update the state type to `Patient | null`
    const handleSearch = async () => {
        const response = await getData(`/patient/PNC?PNC=${cnp}`);
        // console.log(response);
        if (response !== null) {
            const patient = Patient.jsonToPatient(JSON.stringify(response));
            setPatient(patient);
            // console.log(patient);
        } else {
            setPatient(null);
            alert("Nu există pacient.");
        }
    };

    const handleAddPatient = async () =>{
        if(patient) {
            if(dr)
                if(patient.psychiatrist === null){
                    patient.psychiatrist = specialist;
                    await updateData("/patient/psychiatrist/" + patient.id, psychiatristToJson(specialist));
                }
                else alert("Pacientul este asignat unui medic deja");
            else
                if(patient.psychotherapist === null){
                    patient.psychotherapist = specialist;
                    await updateData("/patient/psychotherapist/" + patient.id, psychotherapistToJson(specialist));
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
                        <InputGroupDisable inputName="" initialValue={patient.pnc}/>
                        <InputGroupDisable inputName="Prenume" initialValue={patient.firstName}/>
                        <InputGroupDisable inputName="Nume de familie" initialValue={patient.lastName}/>
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