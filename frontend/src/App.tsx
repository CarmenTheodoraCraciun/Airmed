import './styles/define-var.css';
import './styles/medicalFile.css';
import './styles/App.css';
import './styles/header.css';
import './styles/about.css';
import './styles/messege.css';
import './styles/create-accont.css';
import './styles/loading.css';
import './styles/specialists.css';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';


import AboutUs from "./screens/AboutUs.tsx";
import ArePsychiatrist from "./screens/ArePsychiatrist.tsx";
import ArePsychotherapist from "./screens/ArePsychotherapist.tsx";
import CreatePatient from "./screens/CreatePatient.tsx";
import CreatePsychiatrist from "./screens/CreatePsychiatrist.tsx";
import CreatePsychotherapist from "./screens/CreatePsychotherapist.tsx";
import Login from "./screens/Login.tsx";
import PatientHome from "./screens/PatientHome.tsx";
import PsychiatristHome from "./screens/PsychiatristHome.tsx";
import PsychotherapistHome from "./screens/PsychotherapistHome.tsx";
import {Patient} from "./classes/Patient.ts";
import MFPersonalData from "./screens/MFPersonalData.tsx";
import MFContactData from "./screens/MFContactData.tsx";
import FeelingQuiz from "./screens/FeelingsQuiz.tsx";
import {Psychiatrist} from "./classes/Psychiatrist.ts";
import SpecialistProfile from "./screens/SpecialistProfile.tsx";
import AddPatient from "./screens/AddPatient.tsx";
import {getPatientsList} from "./functions/EndPoints.ts";
import {Psychotherapist} from "./classes/Psychotherapist.ts";
import {Fragment, useEffect, useState} from "react";

function App() {
    const [patientsList, setPatientsList] = useState<Patient[]>([]);
    let homeRoute = <Route path="/home" element={<Navigate to={"/about-us"} />} />;
    const patientDataString = sessionStorage.getItem('patient');
    const psychiatristDataString = sessionStorage.getItem('psychiatrist');
    const psychotherapistDataString = sessionStorage.getItem('psychotherapist');

    // Get the user details
    useEffect(() => {
        const fetchPatients = async () => {
            if (psychiatristDataString) {
                const psychiatrist = Psychiatrist.jsonToPsychiatrist(psychiatristDataString);
                const patients = await getPatientsList(`/patient/psychiatrist?psychiatrist=${psychiatrist.id}`);
                setPatientsList(patients);
            } else if (psychotherapistDataString) {
                const psychotherapist = Psychotherapist.jsonToPsychotherapist(psychotherapistDataString);
                const patients = await getPatientsList(`/patient/psychotherapist?psychotherapist=${psychotherapist.id}`);
                setPatientsList(patients);
            }
        };

        fetchPatients();
    }, [psychiatristDataString, psychotherapistDataString]);

    if (patientDataString) {
        const patient = Patient.jsonToPatient(patientDataString);
        const mfPath = `/medical-history/${patient.id}/`;
        homeRoute = (
            <>
                <Route path="/home" element={<PatientHome />} />
                <Route path={`${mfPath}personal-data`} element={<MFPersonalData patient={patient} />} />
                <Route path={`${mfPath}contact-data`} element={<MFContactData patient={patient} />} />
                {/* Uncomment and define these routes as needed */}
                {/*<Route path={`${mfPath}personal-and-social-context`} element={}/>*/}
                {/*<Route path={`${mfPath}medical-data`} element={}/>*/}
                {/*<Route path={`${mfPath}psychiatric-before-data`} element={}/>*/}
                {/*<Route path={`${mfPath}psychiatric-after-data`} element={}/>*/}
                {/*<Route path={`${mfPath}statistic-data`} element={}/>*/}
                {/*<Route path={`${mfPath}external-note`} element={}/>*/}
                {/*<Route path={`${mfPath}your-note`} element={}/>*/}
                <Route path="/feeling-mood" element={<FeelingQuiz patientId={patient.id} />} />
            </>
        );
    } else if (psychiatristDataString) {
        const psychiatrist = Psychiatrist.jsonToPsychiatrist(psychiatristDataString);
        homeRoute = (
            <>
                <Route path="/home" element={<PsychiatristHome />} />
                <Route path={`profile/${psychiatrist.id}/psychiatrist`} element={<SpecialistProfile specialist={psychiatrist} />} />
                <Route path="/add-patient" element={<AddPatient specialist={psychiatrist} />} />
            </>
        );
    } else if (psychotherapistDataString) {
        const psychotherapist = Psychotherapist.jsonToPsychotherapist(psychotherapistDataString);
        homeRoute = (
            <>
                <Route path="/home" element={<PsychiatristHome />} />
                <Route path={`profile/${psychotherapist.id}/psychiatrist`} element={<SpecialistProfile specialist={psychotherapist} />} />
                <Route path="/add-patient" element={<AddPatient specialist={psychotherapist} />} />
            </>
        );
        homeRoute = <Route path="/home" element={<PsychotherapistHome />} />;
    }

    return (
        <Router>
            <Routes>
                {/* Public screens */}
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/psychiatrist" element={<ArePsychiatrist />} />
                <Route path="/psychotherapist" element={<ArePsychotherapist />} />
                <Route path="/create-patient" element={<CreatePatient />} />
                <Route path="/create-psychiatrist" element={<CreatePsychiatrist />} />
                <Route path="/create-psychotherapist" element={<CreatePsychotherapist />} />
                <Route path="/login" element={<Login />} />
                {homeRoute}
                {patientsList.map(patient => (
                    <Fragment key={patient.id}>
                        <Route path={`/medical-history/${patient.id}/personal-data`} element={<MFPersonalData patient={patient} />} />
                        <Route path={`/medical-history/${patient.id}/contact-data`} element={<MFContactData patient={patient} />} />
                        {/*<Route path={`/medical-history/${patient.id}/personal-and-social-context`} element={}/>*/}
                        {/*<Route path={`/medical-history/${patient.id}/medical-data`} element={}/>*/}
                        {/*<Route path={`/medical-history/${patient.id}/psychiatric-before-data`} element={}/>*/}
                        {/*<Route path={`/medical-history/${patient.id}/psychiatric-after-data`} element={}/>*/}
                        {/*<Route path={`/medical-history/${patient.id}/statistic-data`} element={}/>*/}
                        {/*<Route path={`/medical-history/${patient.id}/external-note`} element={}/>*/}
                        {/*<Route path={`/medical-history/${patient.id}/your-note`} element={}/>*/}
                    </Fragment>
                ))}
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    );
}

export default App;


