import Header from "../components/Header.tsx";
import PatientsList from "../components/PatientsList.tsx";
import {Psychiatrist} from "../classes/Psychiatrist.ts";
import {useNavigate} from "react-router-dom";

function PsychiatristHome(){
    const navigate = useNavigate();
    const psychiatristDataString = sessionStorage.getItem('psychiatrist');
    if(psychiatristDataString !== null) {
        const psychiatrist = Psychiatrist.jsonToPsychiatrist(psychiatristDataString);
        return (
            <>
                <Header/>
                <main>
                    <PatientsList specialist={psychiatrist}/>
                </main>
            </>
        )
    }
    else {
        alert("Încercați mai târziu.");
        navigate('/about-us');
    }
}

export default PsychiatristHome;