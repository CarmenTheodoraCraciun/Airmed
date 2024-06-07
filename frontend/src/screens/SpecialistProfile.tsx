import {Psychiatrist} from "../classes/Psychiatrist.ts";
import {Psychotherapist} from "../classes/Psychotherapist.ts";
import Header from "../components/Header.tsx";
import MFInput from "../components/MFInput.tsx";
import {useState} from "react";

interface Props {
    specialist: Psychiatrist | Psychotherapist;
}

const SpecialistProfile: React.FC<Props> = ({ specialist }) => {
    const [editedSpecialist, setEditedSpecialist] = useState<Psychiatrist | Psychotherapist>(specialist);
    let canEdit = false;

    const handleSpecialistChange = (field: keyof (Psychiatrist | Psychotherapist), value: string | null) => {
        setEditedSpecialist(prevState => ({
            ...prevState,
            [field]: value !== null ? value : ''
        }));
    };

    // daca e profilul personal atunci poate edita
    if(specialist instanceof Psychiatrist){
        const psychiatristDataString = sessionStorage.getItem('psychiatrist');
        if(psychiatristDataString !== null) {
            const psychiatrist = Psychiatrist.jsonToPsychiatrist(psychiatristDataString);
            if (psychiatrist.id === specialist.id)
                canEdit = true;
        }
    }
    else{
        const psychotherapistDataString = sessionStorage.getItem('psychotherapist');
        if(psychotherapistDataString !== null) {
            const pychotherapist = Psychotherapist.jsonToPsychotherapist(psychotherapistDataString);
            if (pychotherapist.id === specialist.id)
                canEdit = true;
        }
    }

    let mainElements = null;
    if(canEdit){
        mainElements = <main className="horizontal-1">
            <div className="vertical-2 ten-px-gap">
                <span>Există greșeli? Rescrie câmpurile unde acestea se află acestea.</span>
                <span className="mf-title">Date personale</span>
                <MFInput
                    inputName="Prenume"
                    initialValue={editedSpecialist.firstName}
                    onChange={(value) => handleSpecialistChange('firstName', value)}
                />
                <MFInput
                    inputName="Nume"
                    initialValue={editedSpecialist.lastName}
                    onChange={(value) => handleSpecialistChange('lastName', value)}
                />
                <MFInput
                    inputName="Județ"
                    initialValue={editedSpecialist.country}
                    onChange={(value) => handleSpecialistChange('country', value)}
                />
                <MFInput
                    inputName="Localitate"
                    initialValue={editedSpecialist.locality}
                    onChange={(value) => handleSpecialistChange('locality', value)}
                />
                <span className="mf-title">Date de contact</span>
                <MFInput
                    inputName="Număr de telefon"
                    initialValue={editedSpecialist.phone}
                    onChange={(value) => handleSpecialistChange('phone', value)}
                />
            </div>
            <div className="vertical-2 ten-px-gap">
                <MFInput
                    inputName="Mail"
                    initialValue={editedSpecialist.mail}
                    onChange={(value) => handleSpecialistChange('mail', value)}
                />
                <span className="mf-title">Date medicale</span>
                <MFInput
                    inputName="Parafă medicală"
                    initialValue={(editedSpecialist as Psychiatrist).medicalNumber}
                    onChange={(value) => handleSpecialistChange('medicalNumber', value)}
                />
                <MFInput
                    inputName="Locație cabinet"
                    initialValue={editedSpecialist.cabinetLocation}
                    onChange={(value) => handleSpecialistChange('cabinetLocation', value)}
                />
                {editedSpecialist.linkLocation && (
                    <a href={editedSpecialist.linkLocation} target="_blank" rel="noopener noreferrer">
                        Vezi locația cabinetului
                    </a>
                )}
                <MFInput
                    inputName="Modifică link locație cabinet"
                    initialValue={editedSpecialist.linkLocation}
                    onChange={(value) => handleSpecialistChange('linkLocation', value)}
                />
                <MFInput
                    inputName="Lucrez cu CNAS"
                    initialValue={editedSpecialist.CNAS? 'Da' : 'Nu'}
                    onChange={(value) => handleSpecialistChange('CNAS', value)}
                />
            </div>
            <div className="vertical-2 ten-px-gap">
                <MFInput
                    inputName="Pot face consulații online"
                    initialValue={editedSpecialist.online? 'Da' : 'Nu'}
                    onChange={(value) => handleSpecialistChange('online', value)}
                />
                <span className="mf-title">Listă prețuri</span>
                <MFInput
                    inputName="Consult"
                    initialValue={editedSpecialist.priceConsult.toString()}
                    onChange={(value) => handleSpecialistChange('priceConsult', value)}
                />
                <MFInput
                    inputName="Consulație"
                    initialValue={editedSpecialist.priceConsultation.toString()}
                    onChange={(value) => handleSpecialistChange('priceConsultation', value)}
                />
                <MFInput
                    inputName="Lucrez cu CNAS"
                    initialValue={editedSpecialist.CNAS? 'true' : 'false'}
                    onChange={(value) => handleSpecialistChange('CNAS', value)}
                />
                <button className="button-form">Salvează</button>
            </div>
        </main>
    }
    else{

    }
    return (
        <>
            <Header />
            {mainElements}
        </>
    );
}

export default SpecialistProfile;