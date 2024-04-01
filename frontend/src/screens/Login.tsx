import Header from "../components/Header.tsx";

import video from '../resources/img/login.mp4';
import React, {useState} from "react";

function Login(){
    const [mailValue, setMailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMailValue(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value);
    };
    const handleMailFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (label) {
                label.classList.add("active");
            }
        }
    };
    const handlePasswordFocus  = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (label) {
                label.classList.add("active");
            }
        }
    };
    const handleMailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (!mailValue && label) {
                label.classList.remove("active");
            }
        }
    };
    const handlePasswordBlur= (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (!passwordValue && label) {
                label.classList.remove("active");
            }
        }
    };
    var mail = (<div className="input-group-login">
        <input type="email" value={mailValue} onChange={handleMailChange}
               onFocus={handleMailFocus} onBlur={handleMailBlur} autoComplete="off"/>
        <label>Mail</label>
    </div>);
    var password = (<div className="input-group-login">
        <input type="password" value={passwordValue} onChange={handlePasswordChange}
               onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} autoComplete="off"/>
        <label>Parolă</label>
    </div>);


    return <>
        <Header/>
        <main className="main-login">
            <video autoPlay loop muted className="video-background">
                <source src={video} type="video/mp4" />
                {/* Asigurați-vă că oferiți fallback pentru browserele care nu suportă video */}
                Your browser does not support the video tag.
            </video>
            <div className="login-container centring">
                {mail}
                {password}
                <button className="button-form">Conectează-te</button>
            </div>
        </main>
    </>
}

export default Login;