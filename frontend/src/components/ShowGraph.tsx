import {Patient} from "../classes/Patient.ts";
import {useEffect, useState} from "react";
import {Answer} from "../classes/Answer.ts";
import {getData} from "../functions/EndPoints.ts";

interface Props{
    patient: Patient;
    questionId: number;
    limit: number;
}

function ShowGraph({patient, questionId, limit}: Props){
    const [answers,setAnswers] = useState<Answer[]>([]);
    const [values, setValues] = useState<number[]>([]);

    useEffect(() => {
        const getAnswers = async () => {
            const response = await getData("/answer/patient?patient=" + patient.id + "&question=" + questionId + "&limit=" + limit);
            if (response !== 404) setAnswers(response);
        }
        getAnswers();
    }, [patient,questionId,limit]);

    useEffect(() => {
        setValues(
            answers.map(answer => answer.answer)
        );
    }, [answers]);

    console.log(values);

    return <>
        {/*<BarGraph values={values} />*/}
    </>
}

export default ShowGraph;