import Header from "../components/Header.tsx";
import noData from "../resources/img/no-data.png";
import {useNavigate} from "react-router-dom";
import SaveNote from "../components/SaveNote.tsx";

interface Props {
    userId: number;
}

function PatientHome({userId} : Props){
    const navigate = useNavigate();

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
                        <button className="feeling-btn" onClick={() => navigate('/feealing-mood')}>Cum te simți azi? Adaugă stare</button>
                        <SaveNote forPatient={null} userId={userId} userType={"patient"} placeholder="Ce te apasă zilele astea?"/>

                    </div>
                </div>
            </main>
        </>
    )
}

export default PatientHome;