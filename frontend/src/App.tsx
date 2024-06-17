import './styles/define-var.css';
import './styles/medicalFile.css';
import './styles/App.css';
import './styles/header.css';
import './styles/about.css';
import './styles/messege.css';
import './styles/create-accont.css';
import './styles/loadingAnd404.css';
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
import SpecialistHome from "./screens/SpecialistHome.tsx";
import {Patient} from "./classes/Patient.ts";
import MFPersonalData from "./screens/MFPersonalData.tsx";
import MFContactData from "./screens/MFContactData.tsx";
import FeelingQuiz from "./screens/FeelingsQuiz.tsx";
import {Psychiatrist} from "./classes/Psychiatrist.ts";
import SpecialistProfile from "./screens/SpecialistProfile.tsx";
import AddPatient from "./screens/AddPatient.tsx";
import {getData, getPatientsList} from "./functions/EndPoints.ts";
import {Psychotherapist} from "./classes/Psychotherapist.ts";
import {Fragment, useEffect, useState} from "react";
import MFSocialContext from "./screens/MFSocialContext.tsx";
import MFMedicalData from "./screens/MFMedialData.tsx";
import MFPsychiatricData from "./screens/MFPsychiatricData.tsx";

function App() {
    const [patientsList, setPatientsList] = useState<Patient[]>([]);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [psychiatrist, setPsychiatrist] = useState<Psychiatrist | null>(null);
    const [psychotherapist, setPsychotherapist] = useState<Psychotherapist | null>(null);
    const [myPsychiatrist, setMyPsychiatrist] = useState<Psychiatrist | null>(null);
    const [myPsychotherapist, setMyPsychotherapist] = useState<Psychotherapist | null>(null);

    const patientDataString = sessionStorage.getItem('patient');
    const psychiatristDataString = sessionStorage.getItem('psychiatrist');
    const psychotherapistDataString = sessionStorage.getItem('psychotherapist');

    // set user data
    useEffect(() => {
        const getUser = async () => {
            if (patientDataString) {
                const data = Patient.jsonToPatient(patientDataString);
                const response = await getData("/patient/" + data.id);
                if (response !== 404) setPatient(response);
            } else if (psychiatristDataString) {
                const data = Psychiatrist.jsonToPsychiatrist(psychiatristDataString);
                const response = await getData("/psychiatrist/" + data.id);
                if (response !== 404) setPsychiatrist(response);
            } else if (psychotherapistDataString) {
                const data = Psychotherapist.jsonToPsychotherapist(psychotherapistDataString);
                const response = await getData("/psychotherapist/" + data.id);
                if (response !== 404) setPsychotherapist(response);
            }
        };
        getUser();
    }, [patientDataString, psychiatristDataString, psychotherapistDataString]);

    // set my specialists
    useEffect(() => {
        const fetchSpecialist = async () => {
            if (patient) {
                if (patient.psychiatrist) {
                    const response = await getData('/psychiatrist/' + patient.psychiatrist.id);
                    if (response) setMyPsychiatrist(response);
                }
                if (patient.psychotherapist) {
                    const response = await getData('/psychotherapist/' + patient.psychotherapist.id);
                    if (response) setMyPsychotherapist(response);
                }
            }
        };
        fetchSpecialist();
    }, [patient]);

    // Get the list of patients
    useEffect(() => {
        const fetchPatients = async () => {
            if (psychiatrist) {
                const patients = await getPatientsList(`/patient/psychiatrist?psychiatrist=${psychiatrist.id}`);
                setPatientsList(patients);
            } else if (psychotherapist) {
                const patients = await getPatientsList(`/patient/psychotherapist?psychotherapist=${psychotherapist.id}`);
                setPatientsList(patients);
            }
        };
        fetchPatients();
    }, [psychiatrist, psychotherapist]);

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

                {/* Private routes */}
                {patient && (
                    <>
                        <Route path="/home" element={<PatientHome />} />
                        <Route path="/feeling-mood" element={<FeelingQuiz patientId={patient.id} />} />
                        {myPsychiatrist && (
                            <Route path={`profile/${myPsychiatrist.id}/psychiatrist`}
                                   element={<SpecialistProfile dr={true} specialist={myPsychiatrist} />} />
                        )}
                        {myPsychotherapist && (
                            <Route path={`profile/${myPsychotherapist.id}/psychotherapist`}
                                   element={<SpecialistProfile dr={false} specialist={myPsychotherapist} />} />
                        )}
                        <Route path={`/medical-history/${patient.id}/personal-data`} element={<MFPersonalData patient={patient} />} />
                        <Route path={`/medical-history/${patient.id}/contact-data`} element={<MFContactData patient={patient} />} />
                        <Route path={`/medical-history/${patient.id}/personal-and-social-context`} element={<MFSocialContext patient={patient} />} />
                        <Route path={`/medical-history/${patient.id}/medical-data`} element={<MFMedicalData patient={patient} />} />
                        <Route path={`/medical-history/${patient.id}/psychiatric-before-data`} element={<MFPsychiatricData patient={patient} presant={false} />} />
                        <Route path={`/medical-history/${patient.id}/psychiatric-after-data`} element={<MFPsychiatricData patient={patient} presant={true} />} />
                    </>
                )}
                {psychiatrist && (
                    <>
                        <Route path="/home" element={<SpecialistHome />} />
                        <Route path={`profile/${psychiatrist.id}/psychiatrist`} element={<SpecialistProfile dr={true} specialist={psychiatrist} />} />
                        <Route path="/add-patient" element={<AddPatient specialist={psychiatrist} />} />
                    </>
                )}
                {psychotherapist && (
                    <>
                        <Route path="/home" element={<SpecialistHome />} />
                        <Route path={`profile/${psychotherapist.id}/psychotherapist`} element={<SpecialistProfile dr={false} specialist={psychotherapist} />} />
                        <Route path="/add-patient" element={<AddPatient specialist={psychotherapist} />} />
                    </>
                )}

                {patientsList.map(patient => (
                    <Fragment key={patient.id}>
                        <Route path={`/medical-history/${patient.id}/personal-data`} element={<MFPersonalData patient={patient} />} />
                        <Route path={`/medical-history/${patient.id}/contact-data`} element={<MFContactData patient={patient} />} />
                        <Route path={`/medical-history/${patient.id}/personal-and-social-context`} element={<MFSocialContext patient={patient} />} />
                        <Route path={`/medical-history/${patient.id}/medical-data`} element={<MFMedicalData patient={patient} />} />
                        <Route path={`/medical-history/${patient.id}/psychiatric-before-data`} element={<MFPsychiatricData patient={patient} presant={false} />} />
                        <Route path={`/medical-history/${patient.id}/psychiatric-after-data`} element={<MFPsychiatricData patient={patient} presant={true} />} />
                    </Fragment>
                ))}

                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    );
}

export default App;