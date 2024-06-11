import Header from "../components/Header.tsx";
import PatientsList from "../components/PatientsList.tsx";
import {Psychiatrist} from "../classes/Psychiatrist.ts";
import {useNavigate} from "react-router-dom";
import {Psychotherapist} from "../classes/Psychotherapist.ts";

function SpecialistHome(){
    const navigate = useNavigate();
    const psychiatristDataString = sessionStorage.getItem('psychiatrist');
    const psychotherapistDataString = sessionStorage.getItem('psychotherapist');

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
    else if(psychotherapistDataString !== null){
        const psychotherapist = Psychotherapist.jsonToPsychotherapist(psychotherapistDataString);
        return (
            <>
                <Header/>
                <main>
                    <PatientsList specialist={psychotherapist}/>
                </main>
            </>
        )
    }
    else {
        alert("Încercați mai târziu.");
        navigate('/about-us');
    }
}

export default SpecialistHome;