import {Patient} from "../classes/Patient.ts";
import Header from "../components/Header.tsx";
import Aside from "../components/Aside.tsx";
import {Psychiatrist} from "../classes/Psychiatrist.ts";
import {Psychotherapist} from "../classes/Psychotherapist.ts";
import {ReactNode, useEffect, useState} from "react";
import {getData} from "../functions/EndPoints.ts";
import {Note} from "../classes/Note.ts";
import SaveNote from "../components/SaveNote.tsx";

async function getYourNote(user: Patient | Psychotherapist | Psychiatrist,
                       type: string, patientId : number | null) {
    try {
        var url;
        if (type === "patient")
            url = '/note/patient?patient=' + user.id;
        else if(type === "psychiatrist")
            url= "/note/psychiatrist?psychiatrist=" + user.id.toString() + "&patient=" + patientId;
        else
            url='/note/psychotherapist?psychotherapist=' + user.id + "&patient=" + patientId;
        const response = await getData(url);
        if (response !== 404)
            return response;
        return null;
    } catch (error) {
        console.error('Failed to fetch social context data:', error);
    }
}

interface Props {
    patient: Patient;
}
function MFYourNote({ patient }: Props) {
    const psychiatristDataString = sessionStorage.getItem('psychiatrist');
    const psychotherapistDataString = sessionStorage.getItem('psychotherapist');
    const [psychiatrist, setPsychiatrist] = useState<Psychiatrist | null>(null);
    const [psychotherapist, setPsychotherapist] = useState<Psychotherapist | null>(null);
    const isPatient = (sessionStorage.getItem('patient') !== null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [saveNote, setSaveNote] = useState<ReactNode>(null);        // set user data
    const [textareaList, setTextareaList] = useState<ReactNode[]>([]);    useEffect(() => {
        const getUser = async () => {
            if (psychiatristDataString) {
                const data = Psychiatrist.jsonToPsychiatrist(psychiatristDataString);
                const response = await getData("/psychiatrist/" + data.id);
                if (response !== 404) setPsychiatrist(response);
            } else if (psychotherapistDataString) {
                const data = Psychotherapist.jsonToPsychotherapist(psychotherapistDataString);
                const response = await getData("/psychotherapist/" + data.id);
                if (response !== 404) setPsychotherapist(response);
            }
        };
        getUser();
    }, [psychiatristDataString, psychotherapistDataString]);

    // get the component to add a note
    useEffect(() => {
        if(psychiatrist)
            setSaveNote(<SaveNote forPatient={patient}
                                 userId={psychiatrist.id}
                                 userType={"psychiatrist"}
                                 placeholder="Păstrați notițele"/>);
        if(psychotherapist)
            setSaveNote(<SaveNote forPatient={patient}
                                 userId={psychotherapist.id}
                                 userType={"psychotherapist"}
                                 placeholder="Păstrați notițele"/>);
    }, [psychiatrist, psychotherapist]);

    // get your notes
    useEffect(() => {
        async function getNote() {
            if(isPatient)
                setNotes(await getYourNote(patient, "patient", null));
            else if(psychiatrist)
                setNotes(await getYourNote(psychiatrist, "psychiatrist", patient.id));
            else if(psychotherapist)
                setNotes(await getYourNote(psychotherapist, "psychotherapist", patient.id));
        }

        getNote();
    }, [isPatient, psychiatrist, psychotherapist]);

    // print your notes
    useEffect(() => {
        if (notes && notes.length > 0) {
            const reversedNotes = [...notes].reverse();
            setTextareaList(
                reversedNotes.map((note: Note) => (
                    <textarea
                        key={note.id}
                        name="content"
                        className="textarea-disebel-style"
                        value={note.content}
                        readOnly
                    />
                ))
            );
        }
    }, [notes]);

    return <>
        <Header/>
        <main className="horizontal-1 ten-px-gap">
            <Aside
                patientId={patient.id}
                patientFirstName={patient.firstName}
                patientLastName={patient.lastName}
                idAside={8}
            />
            <div className="vertical-1">
                {saveNote}
                {textareaList? <span className="mf-title">Notele tale</span> : null}
                {textareaList}
            </div>
        </main>
    </>;
}

export default MFYourNote;