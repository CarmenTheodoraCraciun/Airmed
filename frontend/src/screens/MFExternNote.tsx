import {Patient} from "../classes/Patient.ts";
import {Psychotherapist} from "../classes/Psychotherapist.ts";
import {Psychiatrist} from "../classes/Psychiatrist.ts";
import Header from "../components/Header.tsx";
import Aside from "../components/Aside.tsx";
import {getData} from "../functions/EndPoints.ts";
import {ReactNode, useEffect, useState} from "react";
import {Note} from "../classes/Note.ts";

interface Props {
    patient: Patient;
    user: Patient | Psychotherapist | Psychiatrist;
    type: string;
}

async function getSharedNote(user: Patient | Psychotherapist | Psychiatrist,
                           type: string, patientId : number | null) {
    try {
        var url;
        if (type === "patient")
            url = '/note/shared-with-patient?patient=' + user.id;
        else if(type === "psychiatrist")
            url= "/note/shared-with-specialist?specialist=" + user.id.toString() + "&type=psychiatrist&patient=" + patientId;
        else
            url= "/note/shared-with-specialist?specialist=" + user.id.toString() + "&type=psychotherapist&patient=" + patientId;
        const response = await getData(url);
        if (response !== 404 && response !== 204)
            return response;
        return null;
    } catch (error) {
        console.error('Failed to fetch social context data:', error);
    }
}

function MFExternNote({ patient, user, type }: Props) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [textareaList, setTextareaList] = useState<ReactNode[]>([]);

    // get notes
    useEffect(() => {
        const getNotes = async () => {
        if(type === "patient")
            setNotes(await getSharedNote(user, type, null));
        else
            setNotes(await getSharedNote(user, type, patient.id));
        }
        getNotes();
;    }, []);

    // print your notes
    useEffect(() => {
        if (notes && notes.length > 0) {
            const reversedNotes = [...notes].reverse();
            setTextareaList(
                reversedNotes.map((note: Note) => {
                    let creatorName = "Pacient: " + note.patient.firstName + " " + note.patient.lastName;

                    if (note.psychiatrist) {
                        creatorName = "Medic psihiatru " + note.psychiatrist.firstName + " " + note.psychiatrist.lastName;
                    } else if (note.psychotherapist) {
                        creatorName = "Psihoterapeut " + note.psychotherapist.firstName + " " + note.psychotherapist.lastName;
                    }

                    return (
                        <div key={note.id}>
                            <textarea
                              name="content"
                              className="textarea-disebel-style"
                              value={note.content}
                              readOnly
                            />
                            <p>Creat de: {creatorName}</p>
                        </div>
                    );
                })
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
                idAside={7}
            />
            {notes ?
                <div className="vertical-1">
                    {textareaList}
                </div>
                :
                <div className="date-not-found">
                    <div className="icon">&#x1F50D;</div>
                    <h2>Oops! Date negăsite</h2>
                    <p>Ne pare rău, dar nu există date de afișat.</p>
                    <p>Vă rugăm să verificați dacă ați introdus corect informațiile.</p>
                    <button className="retry-button" onClick={() => window.location.reload()}>Încercați din nou</button>
                </div>
            }

        </main>
    </>;
}

export default MFExternNote;