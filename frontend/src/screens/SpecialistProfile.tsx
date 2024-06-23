import { Psychiatrist } from "../classes/Psychiatrist.ts";
import { Psychotherapist } from "../classes/Psychotherapist.ts";
import Header from "../components/Header.tsx";
import React, { useEffect, useState } from "react";
import InputGroupDisable from "../components/InputGroupDisable.tsx";
import { LocalityData } from "../classes/Locality.ts";
import { getCountriesLocalities } from "../functions/GetCountriesLocalities.ts";
import {
    isPositiveNumber,
    isValidEmail,
    isValidMedicalNumber,
    isValidName,
    isValidPhoneNumber,
    isWizeOrMapsLink
} from "../functions/CheckInputs.ts";
import InputGroup from "../components/InputGroup.tsx";
import { checkUniqueMail, checkUniqueMedicalNumber, updateData } from "../functions/EndPoints.ts";
import CheckboxGroup from "../components/CheckBox.tsx";
import { Patient } from "../classes/Patient.ts";

interface Props {
    dr: boolean;
    specialist: Psychiatrist | Psychotherapist;
}

const SpecialistProfile: React.FC<Props> = ({ dr, specialist }) => {
    let isHisPatient = false;
    const patientDataString = sessionStorage.getItem('patient');
    if (patientDataString) {
        const patientData: Patient = Patient.jsonToPatient(patientDataString);
        if (dr && patientData.psychiatrist?.id === specialist.id)
            isHisPatient = true;
        if (!dr && patientData.psychotherapist?.id === specialist.id)
            isHisPatient = true;
    }

    let personalProfile = false;
    const [editing, setEditing] = useState(false);
    const typeOfUser = (dr ? "medic psihiatru" : "psihoterapeut");

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

    const [countryValue, setCountryValue] = useState('');
    const [localityNameValue, setLocalityNameValue] = useState('');
    const [countryList, setCountryList] = useState<string[]>([]);
    const [localityList, setLocalityList] = useState<LocalityData>({});

    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [mailValue, setMailValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("")
    const [medicalNumberValue, setMedicalNumberValue] = useState("");
    const [locationValue, setLocationValue] = useState("");
    const [locationLinkValue, setLocationLinkValue] = useState("");
    const [price1Value, setPrice1Value] = useState("");
    const [price2Value, setPrice2Value] = useState("");
    const [bioValue, setBioValue] = useState("");

    const [firstNameErrorValue, setFirstNameErrorValue] = useState("");
    const [lastNameErrorValue, setLastNameErrorValue] = useState("");
    const [mailErrorValue, setMailErrorValue] = useState("");
    const [phoneErrorValue, setPhoneErrorValue] = useState("");
    const [medicalNumberErrorValue, setMedicalNumberErrorValue] = useState("");
    const [locationLinkErrorValue, setLocationLinkErrorValue] = useState("");
    const [price1ErrorValue, setPrice1ErrorValue] = useState("");
    const [price2ErrorValue, setPrice2ErrorValue] = useState("");

    const [isOnline, setIsOnline] = useState(specialist.online);
    const [isCNAS, setIsCNAS] = useState(specialist.CNAS);

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
            case 'mail':
                setMailValue(value);
                setMailErrorValue(isValidEmail(value.trim()) ? '' : 'Nu este un mail valid.');
                break;
            case 'phone':
                setPhoneValue(value);
                setPhoneErrorValue(isValidPhoneNumber(value.trim()) ? '' : 'Nu este un numar de telefon valid.');
                break;
            case 'medicalNumber':
                setMedicalNumberValue(value);
                setMedicalNumberErrorValue(isValidMedicalNumber(value.trim()) ? '' : 'Nu este o parafa medicala valida.');
                break;
            case 'location':
                setLocationValue(value);
                break;
            case 'locationLink':
                setLocationLinkValue(value);
                setLocationLinkErrorValue(isWizeOrMapsLink(value.trim()) ? '' : 'Nu este un link valid.');
                break;
            case 'price1':
                setPrice1Value(value);
                setPrice1ErrorValue((isPositiveNumber(value.trim()) !== null) ? '' : 'Nu este un pret valid.');
                break;
            case 'price2':
                setPrice2Value(value);
                setPrice2ErrorValue((isPositiveNumber(value.trim()) !== null) ? '' : 'Nu este un pret valid.');
                break;
            case 'bio':
                setBioValue(value);
                break;
            case 'online':
                setIsOnline(checked);
                break;
            case 'cnas':
                setIsCNAS(checked);
                break
            default:
                break;
        }
    };

    function handleEditData() {
        setEditing(true);
    }

    async function handleSaveData() {
        // Verifica dacă sunt date noi pentru salvare
        if (firstNameValue !== '' || lastNameValue !== '' || mailValue !== '' ||
            phoneValue !== '' || medicalNumberValue !== '' || locationValue !== '' ||
            locationLinkValue !== '' || price1Value !== '' || price2Value !== '' ||
            countryValue !== specialist.country || localityNameValue !== specialist.locality) {

            const firstName = firstNameValue || specialist.firstName;
            const lastName = lastNameValue || specialist.lastName;
            const mail = mailValue || specialist.mail;
            const phone = phoneValue || specialist.phone;
            const medicalNumber = medicalNumberValue || specialist.medicalNumber;
            const location = locationValue || specialist.cabinetLocation;
            const country = countryValue || specialist.country;
            const localityName = localityNameValue || specialist.locality;
            const locationLink = locationLinkValue || specialist.linkLocation;
            const price1 = price1Value || specialist.priceConsult.toString();
            const price2 = price2Value || specialist.priceConsultation.toString();

            // Valideaza datele
            if (isValidName(firstName) && isValidName(lastName) && isValidEmail(mail)
                && isValidPhoneNumber(phone) && isValidMedicalNumber(medicalNumber)
                && isWizeOrMapsLink(locationLink) && isPositiveNumber(price1)
                && isPositiveNumber(price2)) {

                // Verifica daca mailul sau numarul medical sunt noi si unice
                if ((mail !== specialist.mail && !await checkUniqueMail(mail)) ||
                    (medicalNumber !== specialist.medicalNumber && !await checkUniqueMedicalNumber(medicalNumber))) {
                    return;
                }

                let specialistUpdate: any = {
                    id: specialist.id,
                    medicalNumber: medicalNumber,
                    firstName: firstName,
                    lastName: lastName,
                    mail: mail,
                    phone: phone,
                    password: null,
                    country: country,
                    locality: localityName,
                    cabinetLocation: location,
                    linkLocation: locationLink,
                    priceConsult: price1,
                    priceConsultation: price2,
                    online: isOnline,
                    CNAS: isCNAS
                };

                // Daca specialistul este Psychiatrist, trimite update-ul la endpoint-ul corect
                if (specialist instanceof Psychiatrist) {
                    const response = await updateData("/psychiatrist/" + specialist.id, JSON.stringify(specialistUpdate));
                    if (response) {
                        sessionStorage.setItem('psychiatrist', JSON.stringify(response.valueOf()));
                        specialist = response.valueOf();
                    }
                } else if (specialist instanceof Psychotherapist) {
                    const response = await updateData("/psychotherapist/" + specialist.id, JSON.stringify(specialistUpdate));
                    if (response) {
                        sessionStorage.setItem('psychotherapist', JSON.stringify(response.valueOf()));
                        specialist = response.valueOf();
                    }
                }
            } else {
                alert("Datele introduse nu sunt valide.");
            }
        } else {
            alert("Datele sunt identice cu cele inițiale.");
        }
    }

    async function handleDeleteColaboration() {
        const confirmMessage = "Ești sigur? Nu vei mai fi legat de un " + typeOfUser;
        if (!window.confirm(confirmMessage)) {
            return;
        }

        const url = (dr ? "/patient/psychiatrist/" : "/patient/psychotherapist/") + specialist.id;
        const response = await updateData(url, null);
        if (response) {
            alert("Date salvate.");
        }
    }

    return (
        <>
            <Header />
            <main className="horizontal-1">
                {editing ?
                    // Date editabile
                    <>
                        <div className="vertical-2 ten-px-gap">
                            <span className="profile-subtitle">Date personale</span>
                            <InputGroup
                                label="Prenume"
                                name="firstName"
                                type="text"
                                value={firstNameValue}
                                placeholder={specialist.firstName}
                                onChange={handleInputChange}
                                error={firstNameErrorValue}
                            />
                            <InputGroup
                                label="Nume de familie"
                                name="lastName"
                                type="text"
                                value={lastNameValue}
                                placeholder={specialist.lastName}
                                onChange={handleInputChange}
                                error={lastNameErrorValue}
                            />
                            <span className="input-span">Județ</span>
                            <select name="judet" className="input-mf-select" onChange={handleJudetChange} value={countryValue || ''}>
                                <option value="">{specialist.country}</option>
                                {countryList.map(judet => (
                                    <option key={judet} value={judet}>
                                        {judet}
                                    </option>
                                ))}
                            </select>
                            <span className="input-span">Localitate</span>
                            <select name="loc" className="input-mf-select" onChange={(e) => setLocalityNameValue(e.target.value)} value={localityNameValue || ''}>
                                {countryValue && localityList[countryValue]
                                    ? localityList[countryValue].map(localitate => (
                                        <option key={localitate.nume} value={localitate.nume}>
                                            {localitate.nume}
                                        </option>
                                    ))
                                    : <option value="">{specialist.locality}</option>
                                }
                            </select>
                            <span className="profile-subtitle">Date de contact</span>
                            <InputGroup
                                label="Mail"
                                name="mail"
                                type="text"
                                value={mailValue}
                                placeholder={specialist.mail}
                                onChange={handleInputChange}
                                error={mailErrorValue}
                            />
                        </div>
                        <div className="vertical-2 ten-px-gap">
                            <InputGroup
                                label="Număr de telefon"
                                name="phone"
                                type="text"
                                value={phoneValue}
                                placeholder={specialist.phone}
                                onChange={handleInputChange}
                                error={phoneErrorValue}
                            />
                            <span className="profile-subtitle">Date medicale</span>
                            <InputGroup
                                label="Parafă medicală"
                                name="medicalNumber"
                                type="text"
                                value={medicalNumberValue}
                                placeholder={(specialist as Psychiatrist).medicalNumber || ""}
                                onChange={handleInputChange}
                                error={medicalNumberErrorValue}
                            />
                            <InputGroup
                                label="Locație cabinet"
                                name="cabinetLocation"
                                type="text"
                                value={locationValue}
                                placeholder={specialist.cabinetLocation}
                                onChange={handleInputChange}
                                error={locationLinkErrorValue}
                            />
                            <InputGroup
                                label="Modifică link locație cabinet"
                                name="locationLink"
                                type="text"
                                value={locationLinkValue}
                                placeholder={specialist.linkLocation}
                                onChange={handleInputChange}
                                error={locationLinkErrorValue}
                            />
                            <CheckboxGroup
                                label="Lucrez cu CNAS"
                                name="cnas"
                                checked={isCNAS}
                                onChange={handleInputChange}
                            />
                            <CheckboxGroup
                                label="Pot face consultații online"
                                name="online"
                                checked={isOnline}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="vertical-2 ten-px-gap">
                            {!dr ?
                                <InputGroup
                                    label="Despre psihoterapia cu mine"
                                    name="bio"
                                    type="text"
                                    value={bioValue}
                                    placeholder={(specialist as Psychotherapist).bio || ""}
                                    onChange={handleInputChange}
                                    error={''}
                                /> : null
                            }
                            <span className="profile-subtitle">Listă prețuri</span>
                            <InputGroup
                                label="Consult"
                                name="price1"
                                type="number"
                                value={price1Value}
                                placeholder={specialist.priceConsult.toString()}
                                onChange={handleInputChange}
                                error={price1ErrorValue}
                            />
                            <InputGroup
                                label="Consultație"
                                name="price2"
                                type="number"
                                value={price2Value}
                                placeholder={specialist.priceConsultation.toString()}
                                onChange={handleInputChange}
                                error={price2ErrorValue}
                            />
                            <button onClick={handleSaveData} className="button-form">Salvează</button>
                        </div>
                    </>
                    :
                    // datele non-editabile
                    <>
                        <div className="vertical-2 ten-px-gap">
                            <span className="profile-title">Salut, sunt {typeOfUser}</span>
                            <span className="profile-subtitle">Date personale</span>
                            <InputGroupDisable
                                inputName="Prenume"
                                initialValue={specialist.firstName}
                            />
                            <InputGroupDisable
                                inputName="Nume"
                                initialValue={specialist.lastName}
                            />
                            <InputGroupDisable
                                inputName="Județ"
                                initialValue={specialist.country}
                            />
                            <InputGroupDisable
                                inputName="Localitate"
                                initialValue={specialist.locality}
                            />
                            <span className="profile-subtitle">Date de contact</span>
                            <InputGroupDisable
                                inputName="Mail"
                                initialValue={specialist.mail}
                            />
                        </div>
                        <div className="vertical-2 ten-px-gap">

                            <InputGroupDisable
                                inputName="Număr de telefon"
                                initialValue={specialist.phone}
                            />
                            <span className="profile-subtitle">Date medicale</span>
                            <InputGroupDisable
                                inputName="Parafă medicală"
                                initialValue={(specialist as Psychiatrist).medicalNumber}
                            />
                            <InputGroupDisable
                                inputName="Locație cabinet"
                                initialValue={specialist.cabinetLocation}
                            />
                            {specialist.linkLocation && (
                                <a href={specialist.linkLocation} target="_blank" rel="noopener noreferrer">
                                    Vezi locația cabinetului
                                </a>
                            )}
                            <InputGroupDisable
                                inputName="Lucrez cu CNAS"
                                initialValue={specialist.CNAS ? 'Da' : 'Nu'}
                            />
                            <InputGroupDisable
                                inputName="Pot face consulații online"
                                initialValue={specialist.online ? 'Da' : 'Nu'}
                            />
                        </div>
                        <div className="vertical-2 ten-px-gap">
                            {!dr ?
                                <InputGroupDisable
                                    inputName="Despre psihotherapia cu mine"
                                    initialValue={(specialist as Psychotherapist).bio || ''}
                                /> : null
                            }
                            <span className="profile-subtitle">Listă prețuri</span>
                            <InputGroupDisable
                                inputName="Consult"
                                initialValue={specialist.priceConsult.toString()}
                            />
                            <InputGroupDisable
                                inputName="Consulație"
                                initialValue={specialist.priceConsultation.toString()}
                            />
                            {personalProfile ? <button onClick={handleEditData} className="button-form">Editează</button> : null}
                            {isHisPatient ? <button onClick={handleDeleteColaboration} className="button-cancel">Anulează colaborarea</button> : null}
                        </div>
                    </>
                }
            </main>
        </>
    );
}

export default SpecialistProfile;