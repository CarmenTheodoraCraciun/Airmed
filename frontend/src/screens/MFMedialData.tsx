import {Patient} from "../classes/Patient.ts";
import React, {useEffect, useState} from "react";
import Header from "../components/Header.tsx";
import Aside from "../components/Aside.tsx";
import {getData, postData, updateData} from "../functions/EndPoints.ts";
import Loading from "../components/Loading.tsx";
import NoData from "../components/NoData.tsx";
import TextAreaGroup from "../components/TextAreaGroup.tsx";
import {MedicalData} from "../classes/MedicalData.ts";
import {checkFemale} from "../functions/ExtracFromPNC.ts";
import CheckboxGroup from "../components/CheckBox.tsx";
import TextAreaGroupDisable from "../components/TextAreaGroupDisable.tsx";

interface Props {
    patient: Patient;
}

function MFMedicalData({ patient }: Props) {
    const isPsychiatristSession = sessionStorage.getItem('psychiatrist') !== null;
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [getResponse, setGetResponse] = useState(false);
    const [medicalData, setMedicalData] = useState<MedicalData | null>(null);
    function handleEditData() {setIsEditEnabled(true);}

    useEffect(() => {
        const getContactPerson = async () => {
            try {
                const response = await getData('/medicalData/patient?patient=' + patient.id);
                if(response !== 404)
                    setMedicalData(response);
                setGetResponse(true);
            } catch (error) {
                console.error('Failed to fetch social context data:', error);
            }
        };

        getContactPerson();
    }, [patient]);

    const [allergiesValue, setAllergiesValue] = useState("");
    const [weightValue, setWeightValue] = useState("");
    const [heightValue, setHeightValue] = useState("");
    const [diseasesValue, setDiseasesValue] = useState("");
    const [medicamentationValue, setMedicamentationValue] = useState("");
    const [pregnantValue, setPregnantValue] = useState<boolean>(medicalData?.pregnant ?? false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        if (event.target instanceof HTMLInputElement && event.target.type === 'checkbox') {
            const { checked } = event.target;
            switch (name) {
                case 'pregnant':
                    setPregnantValue(checked);
                    break;
                default:
                    break;
            }
        } else {
            switch (name) {
                case 'allergies':
                    setAllergiesValue(value);
                    break;
                case 'weight':
                    setWeightValue(value);
                    break;
                case 'height':
                    setHeightValue(value);
                    break;
                case 'diseases':
                    setDiseasesValue(value);
                    break;
                case 'medicamentation':
                    setMedicamentationValue(value);
                    break;
                default:
                    break;
            }
        }
    };

    const handleMedicalDataChange = async () => {
        const newMedicalData = {
            allergies: allergiesValue || medicalData?.allergies,
            weight: weightValue || medicalData?.weight,
            height: heightValue || medicalData?.height,
            diseases: diseasesValue || medicalData?.diseases,
            medecamentation: medicamentationValue || medicalData?.medecamentation,
            pregnant: pregnantValue,
            patient: { id: patient.id }
        };

        const md = JSON.stringify(newMedicalData, null, 2);
        try {
            let response;
            if (medicalData) {
                response = await updateData(`/medicalData/${medicalData.id}`, md);
            } else {
                response = await postData('/medicalData', md);
            }

            if (response) {
                alert("Date salvate.");
                setMedicalData(response);
            } else {
                alert("Te rugăm să încerci mai târziu");
            }
        } catch (error) {
            console.error('Failed to update medical data:', error);
            alert("Te rugăm să încerci mai târziu");
        }
    };

    return (
        <>
            <Header />
            <main className="horizontal-1 ten-px-gap">
                <Aside
                    patientId={patient.id}
                    patientFirstName={patient.firstName}
                    patientLastName={patient.lastName}
                    idAside={3}
                />
                {getResponse ?
                    isEditEnabled ?
                        <>
                        <div className="vertical ten-px-gap">
                            <TextAreaGroup
                                label="Alergii"
                                name="allergies"
                                value={allergiesValue}
                                placeholder={medicalData?.allergies ?? 'Intuduceți alergiile cu punct între ele.'}
                                onChange={handleInputChange}
                            />
                            <div className="horizontal-1 ten-px-gap">
                                <div className="input-group-mf-mini">
                                    <span className="input-span">Greutate (în kilograme)</span>
                                    <input
                                        className="input-mf-mini"
                                        type="number"
                                        name="weight"
                                        value={weightValue}
                                        onChange={handleInputChange}
                                        placeholder={medicalData?.weight ?? ''}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="input-group-mf-mini">
                                    <span className="input-span">Înălțime (în centimetrii)</span>
                                    <input
                                        className="input-mf-mini"
                                        type="number"
                                        name="height"
                                        value={heightValue}
                                        onChange={handleInputChange}
                                        placeholder={medicalData?.height ?? ''}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <TextAreaGroup
                                label="Probleme non-psihiatice"
                                name="diseases"
                                value={diseasesValue}
                                placeholder={medicalData?.diseases ?? 'Intuduceți bolile cu punct între ele.'}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="vertical-textarea ten-px-gap">
                            <TextAreaGroup
                                label="Tratament non-psihiatrice"
                                name="medicamentation"
                                value={medicamentationValue}
                                placeholder={medicalData?.medecamentation ?? 'Intuduceți medicamentația cu punct între ele.'}
                                onChange={handleInputChange}
                            />
                            {checkFemale(patient.pnc) ?
                                <CheckboxGroup
                                    label="Pacientă însărcinată?"
                                    name="pregnant"
                                    checked={pregnantValue}
                                    onChange={handleInputChange}
                                /> : null}
                            <button onClick={handleMedicalDataChange} className="button-form">Salvează</button>
                        </div>
                        </> :
                        medicalData === null ?
                            <>
                                <NoData onEditData={handleEditData} />
                            </> :
                            <>
                                <div className="vertical ten-px-gap">
                                    <TextAreaGroupDisable
                                        label="Alergii"
                                        value={medicalData?.allergies ?? ''}
                                    />
                                    <div className="horizontal-1 ten-px-gap">
                                        <div className="input-group-mf-mini">
                                            <span className="input-span">Greutate (în kilograme)</span>
                                            <input
                                                className="input-mf-mini"
                                                type="number"
                                                name="weight"
                                                value={weightValue}
                                                onChange={handleInputChange}
                                                placeholder={medicalData?.weight ?? ''}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="input-group-mf-mini">
                                            <span className="input-span">Înălțime (în centimetrii)</span>
                                            <input
                                                className="input-mf-mini"
                                                type="number"
                                                name="weight"
                                                value={heightValue}
                                                onChange={handleInputChange}
                                                placeholder={medicalData?.height ?? ''}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <TextAreaGroupDisable
                                        label="Probleme non-psihiatice"
                                        value={medicalData?.diseases ?? ''}
                                    />
                                </div>
                                <div className="vertical-textarea ten-px-gap">
                                    <TextAreaGroupDisable
                                        label="Tratament non-psihiatrice"
                                        value={medicalData?.medecamentation ?? ''}
                                    />
                                    {checkFemale(patient.pnc) ?
                                        <CheckboxGroup
                                            label="Pacientă însărcinată?"
                                            name="pregnant"
                                            checked={pregnantValue}
                                            onChange={handleInputChange}
                                        /> : null}
                                    {isPsychiatristSession ?
                                        <button onClick={handleEditData} className="button-form">Editează</button>
                                        : null}
                                </div>
                            </>
                    : <Loading />
                }
            </main>
        </>
    );
}
export default MFMedicalData;