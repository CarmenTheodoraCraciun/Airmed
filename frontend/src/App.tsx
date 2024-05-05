import './styles/define-var.css'
import './styles/App.css';
import './styles/header.css';
import './styles/about.css';
import './styles/messege.css';
import './styles/create-accont.css';
import './styles/medicalFile.css';
import './styles/loading.css';

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

function App() {
    const patientDataString = sessionStorage.getItem('patient');
    const psychiatristDataString = sessionStorage.getItem('psychiatrist');
    const psychotherapistDataString = sessionStorage.getItem('psychotherapist');

    let homeRoute = <Route path="/home" element={<Navigate to={"/about-us"} />} />;
    let medicalHistoryRoute = null;

    if (patientDataString) {
        const patient = Patient.jsonToPatient(patientDataString);
        const mfPath = `/medical-history/${patient.id}/`;
        homeRoute = (
            <>
                <Route path="/home" element={<PatientHome />} />

                <Route path={`${mfPath}personal-data`} element={<MFPersonalData patientId={patient.id} />}/>
                <Route path={`${mfPath}contact-data`} element={<MFContactData patientId={patient.id} />}/>
                <Route path={`${mfPath}personal-and-social-context`} element={<MFPersonalData patientId={patient.id} />}/>
                <Route path={`${mfPath}medical-data`} element={<MFPersonalData patientId={patient.id} />}/>
                <Route path={`${mfPath}psychiatric-before-data`} element={<MFPersonalData patientId={patient.id} />}/>
                <Route path={`${mfPath}psychiatric-after-data`} element={<MFPersonalData patientId={patient.id} />}/>
                <Route path={`${mfPath}statistic-data`} element={<MFPersonalData patientId={patient.id} />}/>
                <Route path={`${mfPath}external-note`} element={<MFPersonalData patientId={patient.id} />}/>
                <Route path={`${mfPath}your-note`} element={<MFPersonalData patientId={patient.id} />}/>

                <Route path="/feealing-mood" element={<MFPersonalData patientId={patient.id} />}/>

            </>
        );
    }  else if (psychiatristDataString) {
        homeRoute = <Route path="/home" element={<PsychiatristHome />} />;
    } else if (psychotherapistDataString) {
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
                {medicalHistoryRoute}
                <Route path="/" element={<Navigate to="\home" />} />
            </Routes>
        </Router>
    );
}

export default App;


