import React from "react";
import {Link} from "react-router-dom";
import {updateData} from "../functions/EndPoints.ts";
import {Psychiatrist} from "../classes/Psychiatrist.ts";
import {Psychotherapist} from "../classes/Psychotherapist.ts";

interface Props {
    patientId: number;
    patientFirstName: string;
    patientLastName: string;
    idAside: number;
}

const Aside: React.FC<Props> = ({ patientId, patientFirstName, patientLastName , idAside}) => {
    const psychiatristDataString = sessionStorage.getItem('psychiatrist');
    const psychotherapistDataString = sessionStorage.getItem('psychotherapist');

    const mfPath = `/medical-history/${patientId}/`;
    const intro = <>
        <span id="title-aside">Fișă medicală</span>
        <span id="name-aside">{patientFirstName} <br/>{patientLastName.toUpperCase()}</span>
    </>;
    const personalData = <Link to={`${mfPath}personal-data`} className="part-aside">Date personale</Link>;
    const contactData = <Link to={`${mfPath}contact-data`} className="part-aside">Date de contact</Link>;
    const personalContext = <Link to={`${mfPath}personal-and-social-context`} className="part-aside">Contex personal și social</Link>;
    const medicalData = <Link to={`${mfPath}medical-data`} className="part-aside">Date medicale</Link>;
    const psychiatricAnt = <Link to={`${mfPath}psychiatric-before-data`} className="part-aside">Date psihiatrice anterioare</Link>;
    const psychiatristPre = <Link to={`${mfPath}psychiatric-after-data`} className="part-aside">Date psihiatrice prezente</Link>;
    const statisticData = <Link to={`${mfPath}statistic-data`} className="part-aside">Date statistice</Link>;
    const extNote = <Link to={`${mfPath}extern-notes`} className="part-aside">Note externe</Link>;
    const yourNote = <Link to={`${mfPath}your-notes`} className="part-aside">Notele tale</Link>;

    async function handleDeleteColaboration() {
        const confirmMessage = "Ești sigur? Nu vei mai fi legat de pacientul " + patientFirstName;
        if (!window.confirm(confirmMessage)) {
            return;
        }
        var specialistId;
        var dr = false;
        if(psychiatristDataString){
            const psychiatrist = Psychiatrist.jsonToPsychiatrist(psychiatristDataString);
            specialistId = psychiatrist.id;
            dr = true;
        }
        if(psychotherapistDataString){
            const psychotherapist = Psychotherapist.jsonToPsychotherapist(psychotherapistDataString);
            specialistId = psychotherapist.id;
        }

        const url = (dr ? "/patient/psychiatrist/" : "/patient/psychotherapist/") + specialistId;
        const response = await updateData(url, null);
        if (response) {
            alert("Date salvate.");
        }
    }


    const cancelBtn =
        (psychiatristDataString || psychotherapistDataString) ? <button onClick={handleDeleteColaboration} className="button-cancel">Anulează colaborarea</button>
            : null
    if(idAside == 0){
        return <>
            <aside>
                {intro}
                <a href="#" className="active-part-aside part-aside">Date personale</a>
                {contactData}
                {personalContext}
                {medicalData}
                {psychiatricAnt}
                {psychiatristPre}
                {statisticData}
                {extNote}
                {yourNote}
                {cancelBtn}
            </aside>
        </>;
    }
    else if(idAside == 1){
        return <>
            <aside>
                {intro}
                {personalData}
                <a href="#" className="active-part-aside part-aside">Date de contact</a>
                {personalContext}
                {medicalData}
                {psychiatricAnt}
                {psychiatristPre}
                {statisticData}
                {extNote}
                {yourNote}
                {cancelBtn}
            </aside>
        </>;
    }
    else if(idAside == 2){
        return <>
            <aside>
                {intro}
                {personalData}
                {contactData}
                <a href="#" className="active-part-aside part-aside">Contex personal și social</a>
                {medicalData}
                {psychiatricAnt}
                {psychiatristPre}
                {statisticData}
                {extNote}
                {yourNote}
                {cancelBtn}
            </aside>
        </>;
    }
    else if(idAside == 3){
        return <>
            <aside>
                {intro}
                {personalData}
                {contactData}
                {personalContext}
                <a href="#" className="active-part-aside part-aside">Date medicale</a>
                {psychiatricAnt}
                {psychiatristPre}
                {statisticData}
                {extNote}
                {yourNote}
                {cancelBtn}
            </aside>
        </>;
    }
    else if(idAside == 4){
        return <>
            <aside>
                {intro}
                {personalData}
                {contactData}
                {personalContext}
                {medicalData}
                <a href="#" className="active-part-aside part-aside">Date psihiatrice anterioare</a>
                {psychiatristPre}
                {statisticData}
                {extNote}
                {yourNote}
                {cancelBtn}
            </aside>
        </>;
    }
    else if(idAside == 5){
        return <>
            <aside>
                {intro}
                {personalData}
                {contactData}
                {personalContext}
                {medicalData}
                {psychiatricAnt}
                <a href="#" className="active-part-aside part-aside">Date psihiatrice prezente</a>
                {statisticData}
                {extNote}
                {yourNote}
                {cancelBtn}
            </aside>
        </>;
    }
    else if(idAside == 6){
        return <>
            <aside>
                {intro}
                {personalData}
                {contactData}
                {personalContext}
                {medicalData}
                {psychiatricAnt}
                {psychiatristPre}
                <a href="#" className="active-part-aside part-aside">Date statistice</a>
                {extNote}
                {yourNote}
                {cancelBtn}
            </aside>
        </>;
    }
    else if(idAside == 7){
        return <>
            <aside>
                {intro}
                {personalData}
                {contactData}
                {personalContext}
                {medicalData}
                {psychiatricAnt}
                {psychiatristPre}
                {statisticData}
                <a href="#" className="active-part-aside part-aside">Note externe</a>
                {yourNote}
                {cancelBtn}
            </aside>
        </>;
    }
    else if(idAside == 8){
        return <>
            <aside>
                {intro}
                {personalData}
                {contactData}
                {personalContext}
                {medicalData}
                {psychiatricAnt}
                {psychiatristPre}
                {statisticData}
                {extNote}
                <a href="#" className="active-part-aside part-aside">Notele tale</a>
                {cancelBtn}
            </aside>
        </>;
    }

}

export default Aside;