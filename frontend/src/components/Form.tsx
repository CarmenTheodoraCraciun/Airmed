import React, {useEffect, useState} from "react";
import {LocalityData} from "../classes/Locality.ts";

interface FormProps {
    type: "patient" | "psychiatrist" | "psychotherapist";
}

function Form({ type }: FormProps) {
    const [judetSelectat, setJudetSelectat] = useState('');
    const [localitateSelectata, setLocalitateSelectata] = useState('');
    const [judete, setJudete] = useState<string[]>([]);
    const [localitati, setLocalitati] = useState<LocalityData>({});
    // incarca judete si localitati
    useEffect(() => {
        const incarcaDate = async () => {
            try {
                const response = await fetch('/judete-localitati-ro.json');
                const data: LocalityData = await response.json();
                setJudete(Object.keys(data));
                setLocalitati(data);
                setJudetSelectat('');
                setLocalitateSelectata('');
            } catch (error) {
                console.error('Eroare la încărcarea datelor:', error);
            }
        };

        incarcaDate();
    }, []);
    const handleJudetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const judet = e.target.value;
        setJudetSelectat(judet);
        setLocalitateSelectata('');
    };

    const handleButtonClick = () => {

    }

    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [pncValue, setPncValue] = useState("");
    const [mailValue, setMailValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [medicalNumberValue, setMedicalNumberValue] = useState("");
    const [locationValue, setLocationValue] = useState("");
    const [locationLinkValue, setLocationLinkValue] = useState("");
    const [price1Value, setPrice1Value] = useState("");
    const [price2Value, setPrice2Value] = useState("");
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstNameValue(event.target.value);
    };
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastNameValue(event.target.value);
    };
    const handlePncChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPncValue(event.target.value);
    };
    const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMailValue(event.target.value);
    };
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneValue(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value);
    };
    const handleMedicalNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMedicalNumberValue(event.target.value);
    };
    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocationValue(event.target.value);
    };
    const handleLocationLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocationLinkValue(event.target.value);
    };
    const handlePrice1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice1Value(event.target.value);
    };
    const handlePrice2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice2Value(event.target.value);
    };
    const handleFirstNameFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (label) {
                label.classList.add("active");
            }
        }
    };
    const handleLastNameFocus  = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (label) {
                label.classList.add("active");
            }
        }
    };
    const handlePncFocus  = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (label) {
                label.classList.add("active");
            }
        }
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
    const handlePhoneFocus  = (event: React.FocusEvent<HTMLInputElement>) => {
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
    const handleMedicalNumberFocus  = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (label) {
                label.classList.add("active");
            }
        }
    };
    const handleLocationFocus  = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (label) {
                label.classList.add("active");
            }
        }
    };
    const handleLocationLinkFocus  = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (label) {
                label.classList.add("active");
            }
        }
    };
    const handlePrice1Focus  = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (label) {
                label.classList.add("active");
            }
        }
    };
    const handlePrice2Focus  = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (label) {
                label.classList.add("active");
            }
        }
    };
    const handleFirstNameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (!firstNameValue && label) {
                label.classList.remove("active");
            }
        }
    };
    const handleLastNameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (!lastNameValue && label) {
                label.classList.remove("active");
            }
        }
    };
    const handlePncBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (!pncValue && label) {
                label.classList.remove("active");
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
    const handlePhoneBlur= (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (!phoneValue && label) {
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
    const handleMedicalNumber = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (!medicalNumberValue && label) {
                label.classList.remove("active");
            }
        }
    };
    const handleLocationBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (!locationValue && label) {
                label.classList.remove("active");
            }
        }
    };
    const handleLocationLinkBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (!locationLinkValue && label) {
                label.classList.remove("active");
            }
        }
    };
    const handlePrice1Blur = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (!price1Value && label) {
                label.classList.remove("active");
            }
        }
    };
    const handlePrice2Blur = (event: React.FocusEvent<HTMLInputElement>) => {
        const parentElement = event.currentTarget.parentElement;
        if (parentElement) {
            const label = parentElement.querySelector("label");
            if (!price2Value && label) {
                label.classList.remove("active");
            }
        }
    };


    var tip;
    if (type === 'patient') {
        tip = "pacient";
    }
    else if(type === 'psychiatrist'){
        tip = "medic";
    }
    else {
        tip = "psihoterapeut";
    }

    // elementele html
    var locality = (<>
        <select name="judet" className="judetSelect" onChange={handleJudetChange} value={judetSelectat || ''}>
            <option value="">Județul unde profesezi</option>
            {judete.map(judet => (
                <option key={judet} value={judet}>
                    {judet}
                </option>
            ))}
        </select>
        <select name="loc" className="localitateSelect" onChange={(
            e) => setLocalitateSelectata(e.target.value)
        } value={localitateSelectata || ''}>
            {judetSelectat && localitati[judetSelectat]
                ? localitati[judetSelectat].map(localitate => (
                    <option key={localitate.nume} value={localitate.nume}>
                        {localitate.nume}
                    </option>
                ))
                : <option value="">Localitatea unde profeszi</option>
            }
        </select>
    </>);

    var title = (<div className="vertical title-form-container">
        <h1 className="title-form">Crează cont de {tip}</h1>
        <p className="sub-title-form">
            Ai deja cont? <a href="/login">Conectează-te</a>.
        </p>
        <span className="require">Toate câmpurile sunt obligatorii.</span>
    </div>);
    var firstName = (<div className="input-group">
        <input type="text" value={firstNameValue} onChange={handleFirstNameChange}
               onFocus={handleFirstNameFocus} onBlur={handleFirstNameBlur} autoComplete="off"/>
        <label>Prenume</label>
    </div>);
    var lastName = (<div className="input-group">
        <input type="text" value={lastNameValue} onChange={handleLastNameChange}
               onFocus={handleLastNameFocus} onBlur={handleLastNameBlur} autoComplete="off"/>
        <label>Nume de familie</label>
    </div>);
    var mail = (<div className="input-group">
        <input type="email" value={mailValue} onChange={handleMailChange}
               onFocus={handleMailFocus} onBlur={handleMailBlur} autoComplete="off"/>
        <label>Mail</label>
    </div>);
    var phone = (<div className="input-group">
        <input type="text" value={phoneValue} onChange={handlePhoneChange}
               onFocus={handlePhoneFocus} onBlur={handlePhoneBlur} autoComplete="off"/>
        <label>Număr de telefon</label>
    </div>);
    var password = (<div className="input-group">
        <input type="password" value={passwordValue} onChange={handlePasswordChange}
               onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} autoComplete="off"/>
        <label>Parolă</label>
        <span className="attention">Folosește cel puțin 8 caractere.<br/>O manusculă, o minusculă, o cifră și un simbol.</span>
    </div>);
    var pnc = (<div className="input-group">
        <input type="text" value={pncValue} onChange={handlePncChange}
               onFocus={handlePncFocus} onBlur={handlePncBlur} autoComplete="off"/>
        <label>Cod numeric pesonal</label>
    </div>);
    var medicalNumber = (<div className="input-group">
        <input type="text" value={medicalNumberValue} onChange={handleMedicalNumberChange}
               onFocus={handleMedicalNumberFocus} onBlur={handleMedicalNumber} autoComplete="off"/>
        <label>Numărul parafei medicale</label>
    </div>);
    var location = (<div className="input-group">
        <input type="text" value={locationValue} onChange={handleLocationChange}
               onFocus={handleLocationFocus} onBlur={handleLocationBlur} autoComplete="off"/>
        <label>Locația cabinetului</label>
    </div>);
    var locationLink = (<div className="input-group">
        <input type="text" value={locationLinkValue} onChange={handleLocationLinkChange}
               onFocus={handleLocationLinkFocus} onBlur={handleLocationLinkBlur} autoComplete="off"/>
        <label>Link maps/waze cabinet</label>
    </div>);
    var price1 = (<div className="input-group">
        <input type="number" value={price1Value} onChange={handlePrice1Change}
               onFocus={handlePrice1Focus} onBlur={handlePrice1Blur} autoComplete="off"/>
        <label>Preț per consult</label>
    </div>);
    var price2 = (<div className="input-group">
        <input type="number" value={price2Value} onChange={handlePrice2Change}
               onFocus={handlePrice2Focus} onBlur={handlePrice2Blur} autoComplete="off"/>
        <label>Preț per consulație</label>
    </div>);
    var online = (<label className="material-checkbox">
        <input type="checkbox"/>
        <span className="checkmark"></span>
        Pot face consultații în mediul online
    </label>);
    var cnas = (<label className="material-checkbox">
        <input type="checkbox"/>
        <span className="checkmark"></span>
        Lucrez cu CNAS
    </label>);
    var button = <button className="button-form" onClick={handleButtonClick}>Crează cont</button>;

    // compunerea formului
    if (type === 'patient') {
        return (
            <div className="horizontal-form">
                <div className="vertical-form">
                    {title}
                    {firstName}
                    {lastName}
                    {mail}
                </div>
                <div className="vertical-form">
                    {pnc}
                    {phone}
                    {password}
                    {button}
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="horizontal-form">
                <div className="vertical-form">
                    {title}
                    <h2 className="title-form">Date personale</h2>
                    {firstName}
                    {lastName}
                    {mail}
                    {password}
                </div>
                <div className="vertical-form">
                    {phone}
                    <h2 className="title-form">Date medicale</h2>
                    {medicalNumber}
                    {locality}
                    {location}
                </div>
                <div className="vertical-form">
                    {locationLink}
                    {price1}
                    {price2}
                    <h2 className="title-form">Alte date</h2>
                    {online}
                    {cnas}
                    {button}
                </div>
            </div>
        );
    }
}

export default Form;
