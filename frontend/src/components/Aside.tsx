import React from "react";
import {Link} from "react-router-dom";

interface Props {
    patientId: number;
    patientFirstName: string;
    patientLastName: string;
    idAside: number;
}

const Aside: React.FC<Props> = ({ patientId, patientFirstName, patientLastName , idAside}) => {
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
    const extNote = <Link to={`${mfPath}external-note`} className="part-aside">Note externe</Link>;
    const yourNote = <Link to={`${mfPath}your-note`} className="part-aside">Notele tale</Link>;

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
            </aside>
        </>;
    }

}

export default Aside;