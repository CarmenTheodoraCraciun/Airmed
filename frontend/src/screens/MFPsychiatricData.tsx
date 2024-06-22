import {ChangeEvent, FC, useEffect, useState} from "react";
import { Patient } from "../classes/Patient";
import {convertToPsychiatricData, PsychiatricData} from "../classes/PsychiatricData.ts";
import Header from "../components/Header";
import Aside from "../components/Aside";
import NoData from "../components/NoData";
import Loading from "../components/Loading";
import CheckboxGroup from "../components/CheckBox";
import TextAreaGroup from "../components/TextAreaGroup";
import {getData, postData, updateData} from "../functions/EndPoints";
import TextAreaGroupDisable from "../components/TextAreaGroupDisable.tsx";

interface Props {
    patient: Patient;
    presant: boolean;
}

interface FormValues {
    diagnosticsP: string;
    hospitalizationP: boolean;
    antidepressantP: string;
    moodStabilizersP: string;
    antipsychoticsP: string;
    suicideThoughtsP: string;
    diagnosticsA: string;
    hospitalizationA: boolean;
    antidepressantA: string;
    moodStabilizersA: string;
    antipsychoticsA: string;
    suicideThoughtsA: string;
}

const initialFormValues: FormValues = {
    diagnosticsP: "",
    hospitalizationP: false,
    antidepressantP: "",
    moodStabilizersP: "",
    antipsychoticsP: "",
    suicideThoughtsP: "",
    diagnosticsA: "",
    hospitalizationA: false,
    antidepressantA: "",
    moodStabilizersA: "",
    antipsychoticsA: "",
    suicideThoughtsA: "",
};

const MFPsychiatricData: FC<Props> = ({ patient, presant }) => {
    const isPsychiatristSession = sessionStorage.getItem("psychiatrist") !== null;
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [getResponse, setGetResponse] = useState(false);
    const [psyData, setPsyData] = useState<{ pre: PsychiatricData | null; ant: PsychiatricData | null }>({
        pre: null,
        ant: null,
    });

    useEffect(() => {
        const fetchPsyData = async () => {
            try {
                const response = await getData(`/psychiatricData/patient?patient=${patient.id}`);
                if (response[0] !== undefined) {
                    setPsyData({
                        pre: response[0].presant ? response[0] : response[1],
                        ant: response[0].presant ? response[1] : response[0],
                    });
                }
                setGetResponse(true);
                console.log(response[1]);
            } catch (error) {
                console.error("Failed to fetch psychiatric data:", error);
            }
        };

        fetchPsyData();
    }, [patient]);

    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;
        if (type === "checkbox") {
            const { checked } = event.target as HTMLInputElement;
            setFormValues({
                ...formValues,
                [name]: checked,
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };

    const handleEditData = () => setIsEditEnabled(true);
    const handlePsychiatricChange = async () => {
        const psychiatricData = {
            diagnostics: presant
                ? (formValues.diagnosticsP || psyData.pre?.diagnostics || "")
                : (formValues.diagnosticsA || psyData.ant?.diagnostics || ""),
            hospitalization: presant
                ? (formValues.hospitalizationP !== undefined ? formValues.hospitalizationP : psyData.pre?.hospitalization || false)
                : (formValues.hospitalizationA !== undefined ? formValues.hospitalizationA : psyData.ant?.hospitalization || false),
            antidepressant: presant
                ? (formValues.antidepressantP || psyData.pre?.antidepressant || "")
                : (formValues.antidepressantA || psyData.ant?.antidepressant || ""),
            moodStabilizers: presant
                ? (formValues.moodStabilizersP || psyData.pre?.moodStabilizers || "")
                : (formValues.moodStabilizersA || psyData.ant?.moodStabilizers || ""),
            antipsychotics: presant
                ? (formValues.antipsychoticsP || psyData.pre?.antipsychotics || "")
                : (formValues.antipsychoticsA || psyData.ant?.antipsychotics || ""),
            suicideThoughts: presant
                ? (formValues.suicideThoughtsP || psyData.pre?.suicideThoughts || "")
                : (formValues.suicideThoughtsA || psyData.ant?.suicideThoughts || ""),
            presant: presant,
            patient: { id: patient.id },
        };

        const data = JSON.stringify(psychiatricData, null, 2);
        try {
            let response: PsychiatricData | undefined;
            if (presant ? psyData.pre : psyData.ant) {
                const id = presant ? psyData.pre?.id : psyData.ant?.id;
                const updateResponse = await updateData(`/psychiatricData/${id}`, data);
                if (updateResponse) {
                    response = convertToPsychiatricData(updateResponse);
                }
            } else {
                const postResponse = await postData("/psychiatricData", data);
                if (postResponse) {
                    response = convertToPsychiatricData(postResponse);
                }
            }

            if (response) {
                alert("Date salvate.");
                setPsyData((prevState) => ({
                    ...prevState,
                    [presant ? "pre" : "ant"]: response,
                }));
                setIsEditEnabled(false);
            } else {
                alert("Te rugăm să încerci mai târziu");
            }
        } catch (error) {
            console.error("Failed to update psychiatric data:", error);
            alert("Te rugăm să încerci mai târziu");
        }
    };
    const renderEditInputs = (prefix: "P" | "A", data: PsychiatricData | null) => (
        <>
            <div className="vertical ten-px-gap">
                <TextAreaGroup
                    label="Diagnostic"
                    name={`diagnostics${prefix}`}
                    value={formValues[`diagnostics${prefix}`]}
                    placeholder={data?.diagnostics ?? ""}
                    onChange={handleInputChange}
                    error=""
                />
                <CheckboxGroup
                    label="Pacient spitalizat?"
                    name={`hospitalization${prefix}`}
                    checked={formValues[`hospitalization${prefix}`]}
                    onChange={handleInputChange}
                />
                <TextAreaGroup
                    label="Antidepresive"
                    name={`antidepressant${prefix}`}
                    value={formValues[`antidepressant${prefix}`]}
                    placeholder={data?.antidepressant ?? ""}
                    onChange={handleInputChange}
                    error=""
                />
                <TextAreaGroup
                    label="Stabilizatori de dispoziție"
                    name={`moodStabilizers${prefix}`}
                    value={formValues[`moodStabilizers${prefix}`]}
                    placeholder={data?.moodStabilizers ?? ""}
                    onChange={handleInputChange}
                    error=""
                />
            </div>
            <div className="vertical ten-px-gap">
                <TextAreaGroup
                    label="Antipsihotice"
                    name={`antipsychotics${prefix}`}
                    value={formValues[`antipsychotics${prefix}`]}
                    placeholder={data?.antipsychotics ?? ""}
                    onChange={handleInputChange}
                    error=""
                />
                <TextAreaGroup
                    label="Gânduri suicidale"
                    name={`suicideThoughts${prefix}`}
                    value={formValues[`suicideThoughts${prefix}`]}
                    placeholder={data?.suicideThoughts ?? ""}
                    onChange={handleInputChange}
                    error=""
                />
                <button onClick={handlePsychiatricChange} className="button-form">Salvează</button>
            </div>
        </>
    );
    const renderDisableInputs = (data: PsychiatricData | null) => (
        <>
            <div className="vertical-textarea ten-px-gap">
                <TextAreaGroupDisable label="Diagnostic" value={data?.diagnostics ?? ""} />
                <TextAreaGroupDisable label="Pacient spitalizat?" value={data?.hospitalization ? "Da" : "Nu"} />
                <TextAreaGroupDisable label="Antidepresive" value={data?.antidepressant ?? ""} />
                <TextAreaGroupDisable label="Stabilizatori de dispoziție" value={data?.moodStabilizers ?? ""} />
            </div>
            <div className="vertical-textarea ten-px-gap">
                <TextAreaGroupDisable label="Antipsihotice" value={data?.antipsychotics ?? ""} />
                <TextAreaGroupDisable label="Gânduri suicidale" value={data?.suicideThoughts ?? ""} />
                {isPsychiatristSession ?
                    <button className="button-form" onClick={handleEditData}>Editează</button>
                    : null}
            </div>
        </>
    );

    return (
        <>
            <Header />
            <main className="horizontal-1 ten-px-gap">
                <Aside patientId={patient.id} patientFirstName={patient.firstName} patientLastName={patient.lastName} idAside={presant ? 5 : 4} />
                {getResponse ? (
                    isEditEnabled ? (
                        presant ? (
                            renderEditInputs("P", psyData.pre)
                        ) : (
                            <>
                                {renderEditInputs("A", psyData.ant)}
                            </>
                        )
                    ) : psyData[presant ? "pre" : "ant"] === null ? (
                        <NoData onEditData={handleEditData} />
                    ) : (
                        <>
                            {presant ? (
                                renderDisableInputs(psyData.pre)
                            ) : (
                                <>
                                    {renderDisableInputs(psyData.ant)}
                                </>
                            )}
                        </>
                    )
                ) : (
                    <Loading />
                )}
            </main>
        </>
    );
};

export default MFPsychiatricData;