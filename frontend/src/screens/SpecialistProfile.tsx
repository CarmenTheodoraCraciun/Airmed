import {Psychiatrist} from "../classes/Psychiatrist.ts";
import {Psychotherapist} from "../classes/Psychotherapist.ts";
import Header from "../components/Header.tsx";
import React, {useEffect, useState} from "react";
import MFDisableInput from "../components/MFDisableInput.tsx";
import {LocalityData} from "../classes/Locality.ts";
import {getCountriesLocalities} from "../functions/GetCountriesLocalities.ts";
import {
    isPositiveNumber,
    isValidEmail,
    isValidMedicalNumber,
    isValidName,
    isValidPhoneNumber,
    isWizeOrMapsLink
} from "../functions/CheckInputs.ts";
import InputGroup from "../components/InputGroup.tsx";
import {checkUniqueMail, checkUniqueMedicalNumber, updateData} from "../functions/EndPoints.ts";

interface Props {
    specialist: Psychiatrist | Psychotherapist;
}

const SpecialistProfile: React.FC<Props> = ({ specialist }) => {
    console.log(specialist);

    let personalProfile = false;
    const [editing, setEditing] = useState(false);

    // daca e profilul personal atunci poate edita
    if(specialist instanceof Psychiatrist){
        const psychiatristDataString = sessionStorage.getItem('psychiatrist');
        if(psychiatristDataString !== null) {
            const psychiatrist = Psychiatrist.jsonToPsychiatrist(psychiatristDataString);
            if (psychiatrist.id === specialist.id)
                personalProfile = true;
        }
    }
    else{
        const psychotherapistDataString = sessionStorage.getItem('psychotherapist');
        if(psychotherapistDataString !== null) {
            const pychotherapist = Psychotherapist.jsonToPsychotherapist(psychotherapistDataString);
            if (pychotherapist.id === specialist.id)
                personalProfile = true;
        }
    }

    async function handleSaveData() {
        // Check if there are new data
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
            // Validate the data
            if (isValidName(firstName) && isValidName(lastName) && isValidEmail(mail)
                && isValidPhoneNumber(phone) && isValidMedicalNumber(medicalNumber)
                && isWizeOrMapsLink(locationLink) && isPositiveNumber(price1)
                && isPositiveNumber(price2)) {

                // Check if the mail or medical number is new and unique
                if ((mail !== specialist.mail && !await checkUniqueMail(mail)) ||
                    (medicalNumber !== specialist.medicalNumber && !await checkUniqueMedicalNumber(medicalNumber))) {
                    return;
                }

                if (specialist instanceof Psychiatrist) {
                    // TODO
                    // Prepare the updated data object
                    const updatedSpecialist = {
                        "id": specialist.id,
                        "medicalNumber": medicalNumber,
                        "firstName": firstName,
                        "lastName": lastName,
                        "mail": mail,
                        "phone": phone,
                        "password": specialist.,
                        "bio": null,
                        "country": "Olt",
                        "locality": "Slatina",
                        "cabinetLocation": "Spitalul Județean de Urgență Slatina",
                        "linkLocation": "https://maps.app.goo.gl/ePjZwiKCVJdCD6GS7",
                        "priceConsult": 150,
                        "priceConsultation": 200,
                        "online": false,
                        "CNAS": true
                    };
                    const response = await updateData('psychiatrist/' + )
                }
                else{
                    // TODO: add bio
                    const updatedSpecialist = {
                        firstName,
                        lastName,
                        mail,
                        phone,
                        medicalNumber,
                        country,
                        locality: localityName,
                        cabinetLocation: location,
                        linkLocation: locationLink,
                        priceConsult: price1,
                        priceConsultation: price2,
                        online: isOnline,
                        CNAS: isCNAS
                    };
                    console.log(updatedSpecialist);
                }
            } else {
                alert("Datele introduse nu sunt valide.");
            }
        } else {
            alert("Datele sunt identice cu cele inițiale.");
        }
    }

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
                setMailErrorValue(isValidEmail(value.trim())? '' : 'Nu este un mail valid.');
                break;
            case 'phone':
                setPhoneValue(value);
                setPhoneErrorValue(isValidPhoneNumber(value.trim())? '' : 'Nu este un numar de telefon valid.');
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

    function handleEditData() {setEditing(true);}

    return (
        <>
            <Header />
            <main className="horizontal-1">
                {editing ?
                    // Datele editabile
                    <>
                    <div className="vertical-2 ten-px-gap">
                        <span className="mf-title">Date personale</span>
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
                        <select name="loc" className="input-mf-select" onChange={(
                            e) => setLocalityNameValue(e.target.value)
                        } value={localityNameValue || ''}>
                            {countryValue && localityList[countryValue]
                                ? localityList[countryValue].map(localitate => (
                                    <option key={localitate.nume} value={localitate.nume}>
                                        {localitate.nume}
                                    </option>
                                ))
                                : <option value="">{specialist.locality}</option>
                            }
                        </select>
                        <span className="mf-title">Date de contact</span>
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
                        <span className="mf-title">Date medicale</span>
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
                        <label className="material-checkbox">
                            <input type="checkbox" name="cnas" checked={isCNAS} onChange={handleInputChange} />
                            <span className={`checkmark ${isCNAS ? 'checked' : ''}`}></span>
                            Lucrez cu CNAS
                        </label>
                        <label className="material-checkbox">
                            <input type="checkbox" name="online" checked={isOnline} onChange={handleInputChange} />
                            <span className={`checkmark ${isOnline ? 'checked' : ''}`}></span>
                            Pot face consultații online
                        </label>
                    </div>
                    <div className="vertical-2 ten-px-gap">
                        <span className="mf-title">Listă prețuri</span>
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
                        {specialist instanceof Psychotherapist ?
                            <InputGroup
                                label="Despre psihotherapia cu mine"
                                name="bio"
                                type="text"
                                value={bioValue}
                                placeholder={specialist.bio}
                                onChange={handleInputChange}
                                error={''}
                            /> : null
                        }
                        <button onClick={handleSaveData} className="button-form">Salvează</button>
                    </div>
                    </>
                    :
                    // datele needitabile
                    <>
                        <div className="vertical-2 ten-px-gap">
                            <span className="mf-title">Date personale</span>
                            <MFDisableInput
                                inputName="Prenume"
                                initialValue={specialist.firstName}
                            />
                            <MFDisableInput
                                inputName="Nume"
                                initialValue={specialist.lastName}
                            />
                            <MFDisableInput
                                inputName="Județ"
                                initialValue={specialist.country}
                            />
                            <MFDisableInput
                                inputName="Localitate"
                                initialValue={specialist.locality}
                            />
                            <span className="mf-title">Date de contact</span>
                            <MFDisableInput
                                inputName="Mail"
                                initialValue={specialist.mail}
                            />
                        </div>
                        <div className="vertical-2 ten-px-gap">
                            <MFDisableInput
                                inputName="Număr de telefon"
                                initialValue={specialist.phone}
                            />
                            <span className="mf-title">Date medicale</span>
                            <MFDisableInput
                                inputName="Parafă medicală"
                                initialValue={(specialist as Psychiatrist).medicalNumber}
                            />
                            <MFDisableInput
                                inputName="Locație cabinet"
                                initialValue={specialist.cabinetLocation}
                            />
                            {specialist.linkLocation && (
                                <a href={specialist.linkLocation} target="_blank" rel="noopener noreferrer">
                                    Vezi locația cabinetului
                                </a>
                            )}
                            <MFDisableInput
                                inputName="Lucrez cu CNAS"
                                initialValue={specialist.CNAS? 'Da' : 'Nu'}
                            />
                            <MFDisableInput
                                inputName="Pot face consulații online"
                                initialValue={specialist.online? 'Da' : 'Nu'}
                            />
                        </div>
                        <div className="vertical-2 ten-px-gap">
                            {specialist instanceof Psychotherapist ?
                                <MFDisableInput
                                    inputName="Despre psihotherapia cu mine"
                                    initialValue={specialist.bio}
                                /> : null
                            }
                            <span className="mf-title">Listă prețuri</span>
                            <MFDisableInput
                                inputName="Consult"
                                initialValue={specialist.priceConsult.toString()}
                            />
                            <MFDisableInput
                                inputName="Consulație"
                                initialValue={specialist.priceConsultation.toString()}
                            />
                            {personalProfile ? <button onClick={handleEditData} className="button-form">Editează</button> : null}
                        </div>
                    </>
                }
            </main>
        </>
    );
}

export default SpecialistProfile;