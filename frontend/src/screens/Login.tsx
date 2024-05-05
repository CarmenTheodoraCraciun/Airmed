import Header from "../components/Header.tsx";

import video from '../resources/img/login.mp4';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login(){
    const baseURL: string = "http://localhost:8080";
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        const loginURLs = [
            baseURL + '/patient/mail?mail=' + mailValue + '&password=' + passwordValue,
            baseURL + '/psychiatrist/mail?mail=' + mailValue + '&password=' + passwordValue,
            baseURL + '/psychotherapist/mail?mail=' + mailValue + '&password=' + passwordValue
        ];
        for(var i = 0; i < 3; ++i){
            const response = await fetch(loginURLs[i], {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173'
                }
            });

            if (response.status === 200) {
                // user gasit
                let userData = await response.json();
                console.log(userData);
                if(i == 0) {
                    if (sessionStorage.getItem('patient'))
                        sessionStorage.removeItem('patient');
                    sessionStorage.setItem('patient', JSON.stringify(userData));
                }
                else if(i == 1) {
                    if (sessionStorage.getItem('psychiatrist'))
                        sessionStorage.removeItem('psychiatrist');
                    sessionStorage.setItem('psychiatrist', JSON.stringify(userData));
                }
                else {
                    if (sessionStorage.getItem('psychotherapist'))
                        sessionStorage.removeItem('psychotherapist');
                    sessionStorage.setItem('psychotherapist', JSON.stringify(userData));
                }
                navigate('/home');
                return;
            }
            else if(response.status === 302) {
                alert("Parola incorecta.");
                return;
            }
        }
        alert("Nu exista cont cu mail-ul dat.");
        return;
    }

    const [mailValue, setMailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case 'mail':
                setMailValue(value);
                break;
            case 'password':
                setPasswordValue(value);
                break;
            default:
                break;
        }
    };
    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (label) {
                label.classList.add("active");
            }
        }
    };
    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (!value && label) {
                label.classList.remove("active");
            }
        }
    };

    var mail = (<div className="input-group-login">
        <input type="email" name="mail" value={mailValue} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Mail</label>
    </div>);
    var password = (<div className="input-group-login">
        <input type="password" name="password" value={passwordValue} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Parolă</label>
    </div>);

    return <>
        <Header/>
        <main className="main-login">
            <video autoPlay loop muted className="video-background">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="login-container centring">
                {mail}
                {password}
                <button className="button-form" onClick={handleButtonClick}>Conectează-te</button>
            </div>
        </main>
    </>
}

export default Login;