import {Patient} from "../classes/Patient.ts";
import React, {useEffect, useState} from "react";
import Header from "../components/Header.tsx";
import Aside from "../components/Aside.tsx";
import {getData, postData, updateData} from "../functions/EndPoints.ts";
import Loading from "../components/Loading.tsx";
import NoData from "../components/NoData.tsx";
import {SocialContext} from "../classes/SocialContext.ts";
import InputGroup from "../components/InputGroup.tsx";
import CheckboxGroup from "../components/CheckBox.tsx";
import InputGroupDisable from "../components/InputGroupDisable.tsx";

interface Props {
    patient: Patient;
}

function MFSocialContext({ patient }: Props) {
    const isPsychiatristSession = sessionStorage.getItem('psychiatrist') !== null;
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [getResponse, setGetResponse] = useState(false);
    const [socialContext, setSocialContext] = useState<SocialContext | null>(null);

    function handleEditData() {setIsEditEnabled(true);}

    // get social context
    useEffect(() => {
        const getContactPerson = async () => {
            try {
                const response = await getData('/socialContext/patient?patient=' + patient.id);
                if(response !== 404)
                    setSocialContext(response);
                setGetResponse(true);
            } catch (error) {
                console.error('Failed to fetch social context data:', error);
            }
        };
        getContactPerson();
    }, [patient]);

    const [occupationValue, setOccupationValue] = useState("");
    const [highestEduValue, setHighestEduValue] = useState("");
    const [relationshipValue, setRelationshipValue] = useState("");
    const [sexuallyActiveValue, setSexuallyActiveValue]  = useState<boolean>(socialContext?.sexuallyActive ?? false);
    const [genderOrientationValue, setGenderOrientationValue] = useState("");
    const [legalProblemsValue, setLegalProblemsValue] = useState("");
    const [adoptedValue, setAdoptedValue] = useState<boolean>(socialContext?.adopted ?? false);
    const [familyValue, setFamilyValue] = useState("");
    const [familyPsychiatricValue, setFamilyPsychiatricValue] = useState("");
    const [drugsValue, setDrugsValue] = useState("");
    const [alcoholValue, setAlcoholValue] = useState("");
    const [abuseMedsValue, setAbuseMedsValue] = useState("");
    const [caffeineValue, setCaffeineValue] = useState("");
    const [exerciseValue, setExerciseValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        if (event.target instanceof HTMLInputElement && event.target.type === 'checkbox') {
            const { checked } = event.target;
            switch (name) {
                case 'adopted':
                    setAdoptedValue(checked);
                    break;
                case 'sexuallyActive':
                    setSexuallyActiveValue(checked);
                    break;
                default:
                    break;
            }
        } else {
            switch (name) {
                case 'occupation':
                    setOccupationValue(value);
                    break;
                case 'highestEdu':
                    setHighestEduValue(value);
                    break;
                case 'relationship':
                    setRelationshipValue(value);
                    break;
                case 'genderOrientation':
                    setGenderOrientationValue(value);
                    break;
                case 'legalProblems':
                    setLegalProblemsValue(value);
                    break;
                case 'family':
                    setFamilyValue(value);
                    break;
                case 'familyPsychiatric':
                    setFamilyPsychiatricValue(value);
                    break;
                case 'drugs':
                    setDrugsValue(value);
                    break;
                case 'alcohol':
                    setAlcoholValue(value);
                    break;
                case 'abuseMeds':
                    setAbuseMedsValue(value);
                    break;
                case 'caffeine':
                    setCaffeineValue(value);
                    break;
                case 'exercise':
                    setExerciseValue(value);
                    break;
                default:
                    break;
            }
        }
    };

    const handleSocialContextChange = async () => {
        const newSocialContext = {
            occupation: occupationValue || socialContext?.occupation,
            highestEdu: highestEduValue || socialContext?.highestEdu,
            relationship: relationshipValue || socialContext?.relationship,
            sexuallyActive: sexuallyActiveValue,
            genderOrientatin: genderOrientationValue || socialContext?.genderOrientatin,
            legalProblems: legalProblemsValue || socialContext?.legalProblems,
            adopted: adoptedValue,
            family: familyValue || socialContext?.family,
            familyPsychiatric: familyPsychiatricValue || socialContext?.familyPsychiatric,
            drugs: drugsValue || socialContext?.drugs,
            alcohol: alcoholValue || socialContext?.alcohol,
            abuseMeds: abuseMedsValue || socialContext?.abuseMeds,
            caffeine: caffeineValue || socialContext?.caffeine,
            exercise: exerciseValue || socialContext?.exercise,
            patient: {"id": patient.id}
        };

        const sc = JSON.stringify(newSocialContext, null, 2);
        try {
            let response;
            if (socialContext) {
                response = await updateData(`/socialContext/${socialContext.id}`, sc);
            } else {
                response = await postData('/socialContext', sc);
            }

            if (response) {
                alert("Date salvate.");
                setSocialContext(response);
            } else {
                alert("Te rugăm să încerci mai târziu");
            }
        } catch (error) {
            console.error('Failed to update social context:', error);
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
                    idAside={2}
                />
                {getResponse ?
                    isEditEnabled ?
                        <>
                        <div className="vertical ten-px-gap">
                            <InputGroup
                                label="Ocupație"
                                name="occupation"
                                type="text"
                                value={occupationValue}
                                placeholder={socialContext?.occupation ?? ''}
                                onChange={handleInputChange}
                                error=""
                            />
                            <InputGroup
                                label="Ultima școală absolvită"
                                name="highestEdu"
                                type="text"
                                value={highestEduValue}
                                placeholder={socialContext?.highestEdu ?? ''}
                                onChange={handleInputChange}
                                error=""
                            />
                            <InputGroup
                                label="Relație actuală"
                                name="relationship"
                                type="text"
                                value={relationshipValue}
                                placeholder={socialContext?.relationship ?? ''}
                                onChange={handleInputChange}
                                error=""
                            />
                            <CheckboxGroup
                                label="Pacientul este activ sexual"
                                name="sexuallyActive"
                                checked={sexuallyActiveValue}
                                onChange={handleInputChange}
                            />
                            <InputGroup
                                label="Orientarea de gen"
                                name="genderOrientation"
                                type="text"
                                value={genderOrientationValue}
                                placeholder={socialContext?.genderOrientatin ?? ''}
                                onChange={handleInputChange}
                                error=""
                            />
                            <InputGroup
                                label="Probleme legale"
                                name="legalProblems"
                                type="text"
                                value={legalProblemsValue}
                                placeholder={socialContext?.legalProblems ?? ''}
                                onChange={handleInputChange}
                                error=""
                            />
                            <CheckboxGroup
                                label="Pacientul este adoptat"
                                name="adopted"
                                checked={adoptedValue}
                                onChange={handleInputChange}
                            />
                            <InputGroup
                                label="Despre familie"
                                name="family"
                                type="text"
                                value={familyValue}
                                placeholder={socialContext?.family ?? ''}
                                onChange={handleInputChange}
                                error=""
                            />
                        </div>
                        <div className="vertical ten-px-gap">
                            <InputGroup
                                label="Istoric psihiatric familie"
                                name="familyPsychiatric"
                                type="text"
                                value={familyPsychiatricValue}
                                placeholder={socialContext?.familyPsychiatric ?? ''}
                                onChange={handleInputChange}
                                error=""
                            />
                            <InputGroup
                                label="Consum substanțe prohibite"
                                name="drugs"
                                type="text"
                                value={drugsValue}
                                placeholder={socialContext?.drugs ?? ''}
                                onChange={handleInputChange}
                                error=""
                            />
                            <InputGroup
                                label="Abuz de medicamente"
                                name="abuseMeds"
                                type="text"
                                value={abuseMedsValue}
                                placeholder={socialContext?.abuseMeds ?? ''}
                                onChange={handleInputChange}
                                error=""
                            />
                            <InputGroup
                                label="Abuzul de cofeină"
                                name="caffeine"
                                type="text"
                                value={caffeineValue}
                                placeholder={socialContext?.caffeine ?? ''}
                                onChange={handleInputChange}
                                error=""
                            />
                            <InputGroup
                                label="Execiții fizice"
                                name="exercise"
                                type="text"
                                value={exerciseValue}
                                placeholder={socialContext?.exercise ?? ''}
                                onChange={handleInputChange}
                                error=""
                            />
                            <button onClick={handleSocialContextChange} className="button-form">Salvează</button>
                        </div>
                        </> :
                        socialContext === null ?
                            <>
                                <NoData onEditData={handleEditData} />
                            </> :
                            <>
                                <div className="vertical ten-px-gap">
                                    <InputGroupDisable
                                        inputName="Ocupație"
                                        initialValue={socialContext.occupation}
                                    />
                                    <InputGroupDisable
                                        inputName="Ultima școală absolvită"
                                        initialValue={socialContext.highestEdu}
                                    />
                                    <InputGroupDisable
                                        inputName="Relație actuală"
                                        initialValue={socialContext.relationship}
                                    />
                                    <InputGroupDisable
                                        inputName="Activ sexual"
                                        initialValue={socialContext.sexuallyActive ? 'Da' : 'Nu'}
                                    />
                                    <InputGroupDisable
                                        inputName="Orientarea de gen"
                                        initialValue={socialContext.genderOrientatin}
                                    />
                                    <InputGroupDisable
                                        inputName="Probleme legale"
                                        initialValue={socialContext.legalProblems}
                                    />
                                    <InputGroupDisable
                                        inputName="Pacientul este adoptat"
                                        initialValue={socialContext.adopted ? 'Da' : 'Nu'}
                                    />
                                    <div className="clear"></div>
                                </div>
                                <div className="vertical ten-px-gap">
                                    <InputGroupDisable
                                        inputName="Despre familie"
                                        initialValue={socialContext.family}
                                    />
                                    <InputGroupDisable
                                        inputName="Istoric psihiatric familie"
                                        initialValue={socialContext.familyPsychiatric}
                                    />
                                    <InputGroupDisable
                                        inputName="Consum substanțe prohibite"
                                        initialValue={socialContext.drugs}
                                    />
                                    <InputGroupDisable
                                        inputName="Abuz de medicamente"
                                        initialValue={socialContext.abuseMeds}
                                    />
                                    <InputGroupDisable
                                        inputName="Abuzul de cofeină"
                                        initialValue={socialContext.caffeine}
                                    />
                                    <InputGroupDisable
                                        inputName="Execiții fizice"
                                        initialValue={socialContext?.exercise ?? ''}
                                    />
                                    {isPsychiatristSession ?
                                        <button className="button-form" onClick={handleEditData}>Editează</button>
                                        : null}
                                </div>
                                </>
                                : <Loading />
                }
            </main>
        </>
    );
}
export default MFSocialContext;