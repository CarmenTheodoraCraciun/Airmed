import React, {useEffect, useState} from "react";
import {LocalityData} from "../classes/Locality.ts";
import {useNavigate} from "react-router-dom";
import {
    isValidName,
    isValidEmail,
    isValidPhoneNumber,
    isValidPNC,
    isValidPassword,
    isValidMedicalNumber,
    isWizeOrMapsLink, isPositiveNumber
} from '../functions/CheckInputs.ts';
import {
    checkUniqueMail,
    checkUniqueMedicalNumber,
    checkUniquePNC,
    postData
} from '../functions/EndPoints.ts';
import {getCountriesLocalities} from "../functions/GetCountriesLocalities.ts";
interface FormProps {
    type: "patient" | "psychiatrist" | "psychotherapist";
}
function Form({ type }: FormProps) {
    const navigate = useNavigate();
    const handleButtonClick = async () => {
        if (isValidName(firstNameValue) && isValidName(lastNameValue) && isValidEmail(mailValue) &&
            isValidPhoneNumber(phoneValue) && isValidPassword(passwordValue)) {
            if(!await checkUniqueMail(mailValue))
                return;

            if (type === 'patient') {
                if (isValidPNC(pncValue)) {
                    if(!await checkUniquePNC(pncValue.toString()))
                        return;
                    // creaza json
                    const patientJson = JSON.stringify({
                        pnc: pncValue,
                        firstName: firstNameValue,
                        lastName: lastNameValue,
                        mail: mailValue,
                        phone: phoneValue,
                        password: passwordValue,
                        psychiatrist: null,
                        psychotherapist: null
                    }, null, 2);
                    var response = await postData('/patient', patientJson);
                    if (response !== null) {
                        if(response.status !== 201) {
                            // salvam in sessionStorege datele
                            if (sessionStorage.getItem('patient')) {
                                sessionStorage.removeItem('patient');
                            }
                            sessionStorage.setItem('patient', response.toString());
                            navigate('/about-us');
                        }
                        else alert("Te rugăm să încerci din nou mai târziu.");
                    }
                }
                else alert("CNP-ul trebuie să conțină 13 cifre.");
            }
            else{
                const price1Number = isPositiveNumber(price1Value);
                const price2Number = isPositiveNumber(price2Value);
                // verificam daca totul este bine
                if(isValidMedicalNumber(medicalNumberValue) && isWizeOrMapsLink(locationLinkValue)
                    && price1Number && price2Number){
                    // verifica daca parafa e unica
                    if(!await checkUniqueMedicalNumber(medicalNumberValue.toString()))
                        return;

                    // creaza json
                    const specialistJson = JSON.stringify({
                        firstName: firstNameValue,
                        lastName: lastNameValue,
                        mail: mailValue,
                        phone: phoneValue,
                        password: passwordValue,
                        medicalNumber: medicalNumberValue,
                        country: countryValue,
                        locality: localityNameValue,
                        cabinetLocation: locationValue,
                        linkLocation: locationLinkValue,
                        priceConsult: price1Number,
                        priceConsultation: price2Number,
                        online: isOnline,
                        CNAS: isCNAS
                    }, null, 2);

                    // console.log(specialistJson);
                    if(type === 'psychiatrist') {
                        response = await postData('/psychiatrist', specialistJson);
                        if (response !== null) {
                            if(response.status !== 201) {
                                // salvam in sessionStorege datele
                                if (sessionStorage.getItem('psychiatrist')) {
                                    sessionStorage.removeItem('psychiatrist');
                                }
                                sessionStorage.setItem('psychiatrist', response.toString());
                                navigate('/about-us');
                            }
                            else alert("Te rugăm să încerci din nou mai târziu.");
                        }
                    }
                    else{
                        // creaza cont
                        response = await postData('/psychotherapist', specialistJson);
                        if (response !== null) {
                            if(response.status !== 201) {
                                // salvam in sessionStorege datele
                                if (sessionStorage.getItem('psychotherapist')) {
                                    sessionStorage.removeItem('psychotherapist');
                                }
                                sessionStorage.setItem('psychotherapist', response.toString());
                                navigate('/about-us');
                            }
                            else alert("Te rugăm să încerci din nou mai târziu.");
                        }
                    }
                }
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

    const [countryValue, setCountryValue] = useState('');
    const [localityNameValue, setLocalityNameValue] = useState('');
    const [countryList, setCountryList] = useState<string[]>([]);
    const [localityList, setLocalityList] = useState<LocalityData>({});

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
    const [isOnline, setIsOnline] = useState(false);
    const [isCNAS, setIsCNAS] = useState(false);

    const [firstNameErrorValue, setFirstNameErrorValue] = useState("");
    const [lastNameErrorValue, setLastNameErrorValue] = useState("");
    const [pncErrorValue, setPncErrorValue] = useState("");
    const [mailErrorValue, setMailErrorValue] = useState("");
    const [phoneErrorValue, setPhoneErrorValue] = useState("");
    const [passwordErrorValue, setPasswordErrorValue] = useState("");
    const [medicalNumberErrorValue, setMedicalNumberErrorValue] = useState("");
    const [locationLinkErrorValue, setLocationLinkErrorValue] = useState("");
    const [price1ErrorValue, setPrice1ErrorValue] = useState("");
    const [price2ErrorValue, setPrice2ErrorValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = event.target;

        switch (name) {
            case 'firstName':
                setFirstNameValue(value);
                setFirstNameErrorValue(isValidName(value.trim()) ? '' : 'Nu este un nume valid.');
                break;
            case 'lastName':
                setLastNameValue(value);
                setLastNameErrorValue(isValidName(value.trim()) ? '' : 'Nu este un nume valid.');
                break;
            case 'pnc':
                setPncValue(value);
                setPncErrorValue(isValidPNC(value.trim()) ? '' : 'Nu este un CNP valid.');
                break;
            case 'mail':
                setMailValue(value);
                setMailErrorValue(isValidEmail(value.trim())? '' : 'Nu este un mail valid.');
                break;
            case 'phone':
                setPhoneValue(value);
                setPhoneErrorValue(isValidPhoneNumber(value.trim())? '' : 'Nu este un numar de telefon valid.');
                break;
            case 'password':
                setPasswordValue(value);
                setPasswordErrorValue(isValidPassword(value.trim())? '' : 'Nu este o parola valida.');
                break;
            case 'medicalNumber':
                setMedicalNumberValue(value);
                setMedicalNumberErrorValue(isValidMedicalNumber(value.trim())? '' : 'Nu este o parafa medicala valida.');
                break;
            case 'location':
                setLocationValue(value);
                break;
            case 'locationLink':
                setLocationLinkValue(value);
                setLocationLinkErrorValue(isWizeOrMapsLink(value.trim())? '' : 'Nu este un link valid.');
                break;
            case 'price1':
                setPrice1Value(value);
                setPrice1ErrorValue((isPositiveNumber(value.trim()) !== null) ? '' : 'Nu este un pret valid.');
                break;
            case 'price2':
                setPrice2Value(value);
                setPrice2ErrorValue((isPositiveNumber(value.trim()) !== null) ? '' : 'Nu este un pret valid.');
                break;
            case 'online':
                setIsOnline(checked);
                break;
            case 'cnas':
                setIsCNAS(checked);
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
    // incarca judete si localitati
    useEffect(() => {
        const getData = async () => {
            const data: LocalityData = await getCountriesLocalities();
            setCountryList(Object.keys(data));
            setLocalityList(data);
            setCountryValue('');
            setLocalityNameValue('');
        };
        getData();
    }, []);
    const handleJudetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const judet = e.target.value;
        setCountryValue(judet);
        setLocalityNameValue('');
    };

    // elementele html
    var locality = (<>
        <select name="judet" className="judetSelect" onChange={handleJudetChange} value={countryValue || ''}>
            <option value="">Județul unde profesezi</option>
            {countryList.map(judet => (
                <option key={judet} value={judet}>
                    {judet}
                </option>
            ))}
        </select>
        <select name="loc" className="localitateSelect" onChange={(
            e) => setLocalityNameValue(e.target.value)
        } value={localityNameValue || ''}>
            {countryValue && localityList[countryValue]
                ? localityList[countryValue].map(localitate => (
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
        <input className="input-group-input" type="text" name="firstName" value={firstNameValue} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Prenume</label>
        <span className="error error-form">{firstNameErrorValue}</span>
    </div>);
    var lastName = (<div className="input-group">
        <input className="input-group-input" type="text" name="lastName" value={lastNameValue} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Nume de familie</label>
        <span className="error error-form">{lastNameErrorValue}</span>
    </div>);
    var mail = (<div className="input-group">
        <input className="input-group-input" type="email" name="mail" value={mailValue} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Mail</label>
        <span className="error error-form">{mailErrorValue}</span>
    </div>);
    var phone = (<div className="input-group">
        <input className="input-group-input" type="number" name="phone" value={phoneValue} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Număr de telefon</label>
        <span className="error error-form">{phoneErrorValue}</span>
    </div>);
    var password = (<div className="input-group">
        <input className="input-group-input" type="password" name="password" value={passwordValue} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Parolă</label>
        <span className="error error-form">{passwordErrorValue}</span>
    </div>);
    var pnc = (<div className="input-group">
        <input className="input-group-input" type="text" name="pnc" value={pncValue} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Cod numeric pesonal</label>
        <span className="error error-form">{pncErrorValue}</span>
    </div>);
    var medicalNumber = (<div className="input-group">
        <input className="input-group-input" type="number" name="medicalNumber" value={medicalNumberValue} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Numărul parafei medicale</label>
        <span className="error error-form">{medicalNumberErrorValue}</span>
    </div>);
    var location = (<div className="input-group">
        <input className="input-group-input" type="text" name="location" value={locationValue} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Locația cabinetului</label>
    </div>);
    var locationLink = (<div className="input-group">
        <input className="input-group-input" type="text" name="locationLink" value={locationLinkValue} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Link maps/waze cabinet</label>
        <span className="error error-form">{locationLinkErrorValue}</span>
    </div>);
    var price1 = (<div className="input-group">
        <input className="input-group-input" type="number" name="price1" value={price1Value} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Preț per consult</label>
        <span className="error error-form">{price1ErrorValue}</span>
    </div>);
    var price2 = (<div className="input-group">
        <input className="input-group-input" type="number" name="price2" value={price2Value} onChange={handleInputChange}
               onFocus={handleInputFocus} onBlur={handleInputBlur} autoComplete="off"/>
        <label>Preț per consulație</label>
        <span className="error error-form">{price2ErrorValue}</span>
    </div>);
    var online = (
        <label className="material-checkbox">
            <input type="checkbox" name="online" checked={isOnline} onChange={handleInputChange}/>
            <span className={`checkmark ${isOnline ? 'checked' : ''}`}></span>
            Pot face consultații în mediul online
        </label>
    );
    var cnas = (<label className="material-checkbox">
        <input type="checkbox" name="cnas" checked={isCNAS} onChange={handleInputChange}/>
        <span className={`checkmark ${isCNAS ? 'checked' : ''}`}></span>
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