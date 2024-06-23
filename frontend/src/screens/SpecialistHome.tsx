import Header from "../components/Header.tsx";
import PatientsList from "../components/PatientsList.tsx";
import {Psychiatrist} from "../classes/Psychiatrist.ts";
import {useNavigate} from "react-router-dom";
import {Psychotherapist} from "../classes/Psychotherapist.ts";
import {ReactNode, useEffect, useState} from "react";
import {getData} from "../functions/EndPoints.ts";
import Notify from "../components/Notify.tsx";
import {RequestNotify} from "../classes/RequestNotify.ts";

function SpecialistHome(){
    const navigate = useNavigate();
    const psychiatristDataString = sessionStorage.getItem('psychiatrist');
    const psychotherapistDataString = sessionStorage.getItem('psychotherapist');
    const [alerts, setAlerts] = useState<RequestNotify[]>([]);
    const [container, setContainer] = useState<ReactNode[]>([]);

    useEffect(() => {
        const getAlerts = async () => {
            let url;
            if (psychiatristDataString !== null) {
                const psychiatrist = Psychiatrist.jsonToPsychiatrist(psychiatristDataString);
                url = `/request/psychiatrist?psychiatrist=${psychiatrist.id}`;
            } else if (psychotherapistDataString !== null) {
                const psychotherapist = Psychotherapist.jsonToPsychotherapist(psychotherapistDataString);
                url = `/request/psychotherapist?psychotherapist=${psychotherapist.id}`;
            }
            try {
                if (url) {
                    const response = await getData(url);
                    var newRequests;
                    if(response !== 404)
                        newRequests = response.map((requestData: string) =>
                            requestData
                        );
                    if(newRequests)
                        setAlerts(newRequests);
                }
            } catch (error) {
                console.error('Failed to fetch social context data:', error);
            }
        };
        getAlerts();
    }, [psychiatristDataString, psychotherapistDataString]);

    useEffect(() => {
        if (alerts.length > 0) {
            const notifications = alerts.map((alert, index) => (
                <Notify
                    key={index}
                    text={`Aveți o alertă de la ${alert.patient.firstName} ${alert.patient.lastName}.`}
                    onClose={() => handleRemoveAlert(index)}
                    type="alert"
                    requestId={alert.id}
                />
            ));
            setContainer(notifications);
        }
    }, [alerts]);
    const handleRemoveAlert = (index: number) => {
        setAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index));
    };

    if(psychiatristDataString !== null) {
        const psychiatrist = Psychiatrist.jsonToPsychiatrist(psychiatristDataString);
        return (
            <>
                <Header/>
                <main>
                    <PatientsList specialist={psychiatrist}/>
                    {container}
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
                    {container}
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