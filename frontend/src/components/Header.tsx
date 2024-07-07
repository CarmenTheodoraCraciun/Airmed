import Logo from "./Logo.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Patient} from "../classes/Patient.ts";
import patientImg from "../resources/img/user.png";
import psyhchiatristImg from "../resources/img/medic.png";
import psychotherapistImg from "../resources/img/psychotherapist.png";
import {Psychiatrist} from "../classes/Psychiatrist.ts";
import {Psychotherapist} from "../classes/Psychotherapist.ts";
import {useState} from "react";
import {postData} from "../functions/EndPoints.ts";
function Header(){
    const navigate = useNavigate();
    const patientDataString = sessionStorage.getItem('patient');
    const psychiatristDataString = sessionStorage.getItem('psychiatrist');
    const psychotherapistDataString = sessionStorage.getItem('psychotherapist');
    let headerLinks;
    const [showAlertBox, setShowAlertBox] = useState(false);

    function handleLogoutClick() {
        sessionStorage.clear();
    }

    function handleNewButtonClick() {
        navigate('/create-patient');
    }
    function handleLoginButtonClick(){
        navigate('/login');
    }

    function handleAddPatientClick() {
        navigate('/add-patient');
    }

    const handleAlertClick = () => {
        setShowAlertBox(!showAlertBox);
    };

    const handleCloseClick = () => {
        setShowAlertBox(false);
    };

    async function postRequest(json: any) {
        const x = JSON.stringify(json, null, 2);
        try {
            const response = await postData('/request', x);
            if (response) {
                alert("Alertă trimisă.");
            }
        } catch (error) {
            console.error('Failed to update medical data:', error);
            alert("Te rugăm să încerci din nou");
        }
    }

    function handleAlertPsychiatrist(patient: Patient) {
        postRequest(
            {
                status: false,
                type: "Alert",
                psychiatrist: patient.psychiatrist,
                psychotherapist: null,
                patient: patient
            }
        );
    }

    function handleAlertPsychotherapist(patient: Patient) {
        postRequest(
            {
                status: false,
                type: "Alert",
                psychiatrist: null,
                psychotherapist: patient.psychotherapist,
                patient: patient
            }
        );
    }

    function handleAlertBoth(patient: Patient) {
        handleAlertPsychiatrist(patient);
        handleAlertPsychotherapist(patient);
    }

    if (patientDataString) {
        // Patient's header
        const patient = Patient.jsonToPatient(patientDataString);
        const mfPath = `/medical-history/${patient.id}/`;
        headerLinks = (
            <>
            {(patient.psychotherapist !== null || patient.psychiatrist !== null) && (
                <div className="alert-container">
                    <button className="header-btn" onClick={handleAlertClick}>Trimite alertă</button>
                    {showAlertBox && (
                        <div className="send-alert-box">
                            <button className="cancel-alert-button" onClick={handleCloseClick}>×</button><br/>
                            <span className="alert-text">Trimite alerta către</span>
                            <div className="horizontal ten-px-gap">
                                {patient.psychiatrist !== null ?
                                    <button onClick={() => handleAlertPsychiatrist(patient)} className="alert-button">Psihiatru</button>
                                    : null}
                                {patient.psychotherapist !== null ?
                                    <button onClick={() => handleAlertPsychotherapist(patient)} className="alert-button">Psihoterapeut</button>
                                    : null}
                                {patient.psychiatrist !== null && patient.psychotherapist !== null ?
                                    <button onClick={() => handleAlertBoth(patient)} className="alert-button">Amândoi</button>
                                    : null}
                            </div>
                        </div>
                    )}
                </div>
            )}
            <ul className="header-ul">
                <li>
                    <a href="/about-us" className="header-el">Despre noi</a>
                </li>
                <li className="menu-li">
                    {patient.firstName}
                    <img id="patient-img" src={patientImg} alt="" />
                    <div className="menu">
                        <Link to={`${mfPath}personal-data`} className="header-li">Istoric medical</Link><br />
                        {patient.psychiatrist && (
                            <>
                                <Link to={`/profile/${patient.psychiatrist.id}/psychiatrist`} className="header-li">Vizitează psihiatrul</Link><br />
                            </>
                        )}
                        {patient.psychotherapist && (
                            <>
                                <Link to={`/profile/${patient.psychotherapist.id}/psychotherapist`} className="header-li">Vizitează psihologul</Link><br />
                            </>
                        )}
                        <a href="/about-us" className="header-li" onClick={handleLogoutClick}>Deconectează-te</a>
                    </div>
                </li>
            </ul>
        </>
        );
    }
    else if (psychiatristDataString) {
        // Psychiatrist's header
        const psychiatrist = Psychiatrist.jsonToPsychiatrist(psychiatristDataString);
        headerLinks = (<ul className="header-ul">
            <li><button className="header-btn" onClick={handleAddPatientClick}>Adaugă pacient</button></li>
            <li>
                <a href="/about-us" className="header-el">Despre noi</a>
            </li>
            <li className="menu-li">
                {psychiatrist.firstName} {psychiatrist.lastName}
                <img id="psychiatrist-img" src={psyhchiatristImg} alt=""/>
                <div className="menu">
                    <Link to={`/profile/${psychiatrist.id}/psychiatrist`} className="header-li">Profil</Link><br/>
                    <a href="/about-us" className="header-li" onClick={handleLogoutClick}>Deconectează-te</a>
                </div>
            </li>
        </ul>);
    }
    else if (psychotherapistDataString) {
        // Psychiatrist's header
        const psychotherapist = Psychotherapist.jsonToPsychotherapist(psychotherapistDataString);
        headerLinks = (<ul className="header-ul">
            <li><button className="header-btn" onClick={handleAddPatientClick}>Adaugă pacient</button></li>
            <li>
                <a href="/about-us" className="header-el">Despre noi</a>
            </li>
            <li className="menu-li">
                {psychotherapist.firstName} {psychotherapist.lastName}
                <img id="psychiatrist-img" src={psychotherapistImg} alt=""/>
                <div className="menu">
                    <Link to={`/profile/${psychotherapist.id}/psychotherapist`} className="header-li">Profil</Link><br/>
                    <a href="/about-us" className="header-li" onClick={handleLogoutClick}>Deconectează-te</a>
                </div>
            </li>
        </ul>);
    }
    else {
        headerLinks = (<ul className="header-ul">
            <li>
                <a href="/home" className="header-el">Despre noi</a>
            </li>
            <li>
                <a href="/psychiatrist" className="header-el">Esti medic psihiatru?</a>
            </li>
            <li>
                <a href="/psychotherapist" className="header-el">Esti psihoterapeut?</a>
            </li>
            <li>
                <button className="button-header" onClick={handleNewButtonClick}>Esti nou?</button>
            </li>
            <li>
                <button className="button-header" onClick={handleLoginButtonClick}>Conectează-te</button>
            </li>
        </ul>);
    }

    return <header>
        <div className="header-all">
            <Logo/>
            {headerLinks}
        </div>
    </header>
}

export default Header;