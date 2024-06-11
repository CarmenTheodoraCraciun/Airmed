import Logo from "./Logo.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Patient} from "../classes/Patient.ts";
import patientImg from "../resources/img/user.png";
import psyhchiatristImg from "../resources/img/medic.png";
import psychotherapistImg from "../resources/img/psychotherapist.png";
import {Psychiatrist} from "../classes/Psychiatrist.ts";
import {Psychotherapist} from "../classes/Psychotherapist.ts";
// import {createPatientFromJSON} from "../functions/CreateUsers.ts";
function Header(){
    const navigate = useNavigate();
    const patientDataString = sessionStorage.getItem('patient');
    const psychiatristDataString = sessionStorage.getItem('psychiatrist');
    const psychotherapistDataString = sessionStorage.getItem('psychotherapist');
    var headerLinks = null;

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

    if (patientDataString) {
        // Patient's header
        const patient = Patient.jsonToPatient(patientDataString);
        // console.log(patient);
        const mfPath = `/medical-history/${patient.id}/`;
        headerLinks = (<ul className="header-ul">
            <li>
                <div className="group-search">
                    <svg className="icon-search" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                    <input placeholder="Caută specialist" type="search" className="input-search"/>
                </div>
            </li>
            <li>
                <a href="/about-us" className="header-el">Despre noi</a>
            </li>
            <li className="menu-li">
                {patient.firstName}
                <img id="patient-img" src={patientImg} alt=""/>
                <div className="menu">
                    <Link to={`${mfPath}personal-data`} className="header-li">Istoric medical</Link><br/>
                    {(patient.psychiatrist !== null) ?
                        <>
                            <Link to={`/profile/${patient.psychiatrist.id}/psychiatrist`} className="header-li">Vizitează psihiatrul</Link><br/>
                        </>
                        : null
                    }
                    {(patient.psychotherapist !== null) ?
                        <>
                            <Link to={`/profile/${patient.psychotherapist.id}/psychotherapist`} className="header-li">Vizitează psihologul</Link><br/>
                        </>
                        : null
                    }
                    <a href="/about-us" className="header-li" onClick={handleLogoutClick}>Deconectează-te</a>
                </div>
            </li>
        </ul>);
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