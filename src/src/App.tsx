import './styles/define-var.css'
import './styles/App.css';
import './styles/header.css';
import './styles/about.css';
import './styles/messege.css';
import './styles/create-accont.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import AboutUs from "./screens/AboutUs.tsx";
import ArePsychiatrist from "./screens/ArePsychiatrist.tsx";
import ArePsychotherapist from "./screens/ArePsychotherapist.tsx";
import CreatePatient from "./screens/CreatePatient.tsx";
import CreatePsychiatrist from "./screens/CreatePsychiatrist.tsx";
import CreatePsychotherapist from "./screens/CreatePsychotherapist.tsx";
import Login from "./screens/Login.tsx";

function App() {
    return<Router>
        <>
            <Routes>
                <Route path="/home" element={<AboutUs />} />
                <Route path="/psychiatrist" element={<ArePsychiatrist/>}/>
                <Route path="/psychotherapist" element={<ArePsychotherapist/>}/>
                <Route path="/create-patient" element={<CreatePatient/>}/>
                <Route path="/create-psychiatrist" element={<CreatePsychiatrist/>}/>
                <Route path="/crete-psychotherapist" element={<CreatePsychotherapist/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </>
    </Router>

}

export default App
