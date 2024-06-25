import Header from "../components/Header.tsx";
// import noData from "../resources/img/img-4.jpg";
import img from "../resources/img/img-2.png";
import SaveNote from "../components/SaveNote.tsx";
import {Patient} from "../classes/Patient.ts";
import Notify from "../components/Notify.tsx";
import {useState} from "react";
import Feeling from "../components/Feelings.tsx";

interface Props {
    patient: Patient;
}

function PatientHome({patient} : Props){
    const [showPsychiatristNotify, setShowPsychiatristNotify] = useState(patient.psychiatrist === null);
    const [showPsychotherapistNotify, setShowPsychotherapistNotify] = useState(patient.psychotherapist === null);
    const handleClosePsychiatristNotify = () => setShowPsychiatristNotify(false);
    const handleClosePsychotherapistNotify = () => setShowPsychotherapistNotify(false);

    return (
        <>
            <Header/>
            {showPsychiatristNotify && (
                <Notify
                    text="Aplicația funcționează la parametrii normali alături de un medic psihiatru."
                    onClose={handleClosePsychiatristNotify}
                    type="warning"
                    requestId={-1}
                />
            )}
            {showPsychotherapistNotify && (
                <Notify
                    text="Aplicația funcționează la parametrii normali alături de un psihoterapeut."
                    onClose={handleClosePsychotherapistNotify}
                    type="warning"
                    requestId={-1}
                />
            )}
            <main>
                <span className="intro">Terapia nu e doar pentru cei care au gânduri urâte.</span>
                <div className="horizontal-1">
                    <div className="vertical-1">
                        <Feeling patient={patient}/>
                        <SaveNote forPatient={null} userId={patient.id} userType={"patient"} placeholder="Ce te apasă zilele astea?"/>
                    </div>
                    <img id="feeling-img" src={img} alt="" />
                </div>
            </main>
        </>
    )
}

export default PatientHome;