import {Patient} from "../classes/Patient.ts";
import {useEffect, useState} from "react";
import Header from "../components/Header.tsx";
import Aside from "../components/Aside.tsx";
import {SocialContext} from "../classes/SocialContext.ts";
import {getData} from "../functions/EndPoints.ts";
import Loading from "../components/Loading.tsx";
import DataNotFound from "../components/DataNotFound.tsx";

interface Props {
    patient: Patient;
}

function MFContextData({ patient }: Props) {
    const isPsychiatristSession = sessionStorage.getItem('psychiatrist') !== null;
    const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);
    const [getResponse, setGetResponse] = useState<boolean>(false);
    const [socialContext, setSocialContext] = useState<SocialContext | null>(null);

    function handleEditData() {setIsEditEnabled(true);}

    useEffect(() => {
        const getContactPerson = async () => {
            try {
                const response = await getData('/socialContext/patient?patient=' + patient.id);
                // if(response !== 404) {
                //     // setSocialContext(response)
                // }
                console.log(response);
                setGetResponse(true);
            } catch (error) {
                console.error('Failed to fetch social context data:', error);
            }
        };

        getContactPerson();
    }, [patient]);


    return (
        <>
            <Header />
            <main className="horizontal-1 ten-px-gap">
                <Aside
                    patientId={patient.id}
                    patientFirstName={patient.firstName}
                    patientLastName={patient.lastName}
                    idAside={2}
                />
                {getResponse ? (
                    socialContext === null ? (
                        <DataNotFound />
                    ) : (
                        isEditEnabled ? (
                            <>
                                {/* Editable data */}
                                <div>Editable data goes here...</div>
                            </>
                        ) : (
                            <>
                                {/* Non-editable data */}
                                <div>Non-editable data goes here...</div>
                            </>
                        )
                    )
                ) : (
                    <Loading />
                )}
            </main>
        </>
    );
}
export default MFContextData;