import {FC} from "react";

interface Props {
    onEditData: () => void;
}

const NoData: FC<Props> = ({ onEditData }) => {
    const isPsychiatristSession = sessionStorage.getItem('psychiatrist') !== null;

    function handleEditData() {
        onEditData();
    }

    return (
        <div className="date-not-found">
            <div className="icon">&#x1F50D;</div>
            <h2>Oops! Date negăsite</h2>
            <p>Ne pare rău, dar nu există date de afișat.</p>
            <p>Vă rugăm să verificați dacă ați introdus corect informațiile.</p>
            {isPsychiatristSession ? <button className="button-form" onClick={handleEditData}>Editează</button>
                : <button className="retry-button" onClick={() => window.location.reload()}>Încercați din nou</button>
            }
        </div>
    );
}


export default NoData;
