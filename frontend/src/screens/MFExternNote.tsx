import {Patient} from "../classes/Patient.ts";
import {Psychotherapist} from "../classes/Psychotherapist.ts";
import {Psychiatrist} from "../classes/Psychiatrist.ts";
import Header from "../components/Header.tsx";
import Aside from "../components/Aside.tsx";

interface Props {
    patient: Patient;
    user: Patient | Psychotherapist | Psychiatrist;
    type: string;
}
function MFExternNote({ patient, user, type }: Props) {
    return <>
        <Header/>
        <main className="horizontal-1 ten-px-gap">
            <Aside
                patientId={patient.id}
                patientFirstName={patient.firstName}
                patientLastName={patient.lastName}
                idAside={7}
            />

        </main>
    </>;
}

export default MFExternNote;