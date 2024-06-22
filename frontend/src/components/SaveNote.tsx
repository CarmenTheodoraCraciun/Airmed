import {ChangeEvent, useEffect, useState} from "react";
import {getData, postData} from "../functions/EndPoints.ts";
import {Patient} from "../classes/Patient.ts";

interface Props {
    forPatient: Patient | null;
    userId: number;
    userType: string;
    placeholder: string;
}

function SaveNote({ forPatient, userId, userType, placeholder }:Props) {
    const [patient, setPatient] = useState(null);
    const [psychiatrist, setPsychiatrist] = useState(null);
    const [psychotherapist, setPsychotherapist] = useState(null);

    // set user data
    useEffect(() => {
        const getUser = async () => {
            if (userType === "patient") {
                const response = await getData("/patient/" + userId);
                if (response !== 404) setPatient(response);
            } else if (userType === "psychiatrist") {
                const response = await getData("/psychiatrist/" + userId);
                if (response !== 404) setPsychiatrist(response);
            } else {
                const response = await getData("/psychotherapist/" + userId);
                if (response !== 404) setPsychotherapist(response);
            }
        };
        getUser();
    }, [userId, userType]);
    const [visibility, setVisibility] = useState("none");
    const [contentValue, setContentValue] = useState("");
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case 'content':
                setContentValue(value);
                break;
            case 'visibility':
                setVisibility(value);
                break;
            default:
                break;
        }
    };
    async function handleSaveNote() {
        if (contentValue !== '') {
            let newNote;
            if (patient) {
                newNote = {
                    content: contentValue,
                    sharedSpecialist: true,
                    sharedAll: true,
                    psychotherapist: null,
                    psychiatrist: null,
                    patient: patient
                };
            }
            else if (psychiatrist) {
                newNote = {
                    content: contentValue,
                    sharedSpecialist: visibility === "sharedSpecialist" || visibility === "sharedAll",
                    sharedAll: visibility === "sharedAll",
                    psychotherapist: null,
                    psychiatrist: psychiatrist,
                    patient: forPatient
                };
            }
            else if (psychotherapist) {
                newNote = {
                    content: contentValue,
                    sharedSpecialist: visibility === "sharedSpecialist" || visibility === "sharedAll",
                    sharedAll: visibility === "sharedAll",
                    psychotherapist: psychotherapist,
                    psychiatrist: null,
                    patient: forPatient
                };
            }
            console.log(newNote);

            const n = JSON.stringify(newNote, null, 2);
            try {
                const response = await postData('/note', n);
                if (response) {
                    alert("Date salvate.");
                } else {
                    alert("Te rugăm să încerci mai târziu");
                }
            } catch (error) {
                console.error('Failed to update medical data:', error);
                alert("Te rugăm să încerci mai târziu");
            }
        }
    }

    return (
        <>
            <textarea
                name="content"
                className="textarea-style"
                value={contentValue}
                placeholder={placeholder}
                onChange={handleInputChange}
            />
            {psychiatrist || psychotherapist ?
                <>
                    Cine vrei să vadă această notă?
                    <div className="material-radiobox">
                        <div>
                            <input
                                type="radio"
                                name="visibility"
                                value="none"
                                id="none"
                                checked={visibility === "none"}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="none">Nimeni.</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="visibility"
                                value="sharedSpecialist"
                                id="sharedSpecialist"
                                checked={visibility === "sharedSpecialist"}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="sharedSpecialist">Alți specialiști cu acces.</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="visibility"
                                value="sharedAll"
                                id="sharedAll"
                                checked={visibility === "sharedAll"}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="sharedAll">Alți specialiști, dar și pacientul.</label>
                        </div>
                    </div>
                </>
                : null}
            <button onClick={handleSaveNote} className="button-1">Salvează</button>
        </>
    );
}

export default SaveNote;