import Header from "../components/Header.tsx";
import noData from "../resources/img/no-data.png";
import {useNavigate} from "react-router-dom";
import SaveNote from "../components/SaveNote.tsx";
import {Patient} from "../classes/Patient.ts";
import Notify from "../components/Notify.tsx";
import {useState} from "react";

interface Props {
    patient: Patient;
}

function PatientHome({patient} : Props){
    const navigate = useNavigate();
    const [showPsychiatristNotify, setShowPsychiatristNotify] = useState(patient.psychiatrist === null);
    const [showPsychotherapistNotify, setShowPsychotherapistNotify] = useState(patient.psychotherapist === null);
    const handleClosePsychiatristNotify = () => setShowPsychiatristNotify(false);
    const handleClosePsychotherapistNotify = () => setShowPsychotherapistNotify(false);

    return (
        <>
            <Header/>
            <main>
                <span className="intro">Terapia nu e doar pentru cei care au gânduri urâte.</span>
                <div className="horizontal-1">
                    <div className="vertical-1">
                        Graficul stărilor fluctuante
                        <img id="big-graph-img" src={noData} alt=""/>
                    </div>
                    <div className="vertical-1">
                        <button className="feeling-btn" onClick={() => navigate('/feeling-mood')}>Cum te simți azi? Adaugă stare</button>
                        <SaveNote forPatient={null} userId={patient.id} userType={"patient"} placeholder="Ce te apasă zilele astea?"/>
                    </div>
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
                </div>
            </main>
        </>
    )
}

export default PatientHome;