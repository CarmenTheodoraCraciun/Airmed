import { Patient } from "../classes/Patient.ts";
import Header from "../components/Header.tsx";
import Aside from "../components/Aside.tsx";
import { useEffect, useState } from "react";
import { Question } from "../classes/Question.ts";
import InputGroup from "../components/InputGroup.tsx";
import { getData } from "../functions/EndPoints.ts";
import {
    calculateDeviation,
    calculateMean,
    calculateMod,
    calculateStandardDeviation
} from "../functions/Statistics.ts";
import { getAnswerOf } from "../functions/getAnswerOf.ts";

interface Props {
    patient: Patient;
}

export function MFStatisticData({ patient }: Props) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [limit, setLimit] = useState("14");
    const [questionData, setQuestionData] = useState<{ question: Question; answers: number[] }[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getData('/question/all');
                setQuestions(response);
            } catch (error) {
                console.error('Failed to fetch questions:', error);
            }
        };
        fetchQuestions();
    }, []);

    useEffect(() => {
        const fetchAnswersForQuestions = async () => {
            if (parseInt(limit, 10) >= 5 && questions.length > 0) {
                const fetchedData = await Promise.all(
                    questions.map(async (question) => {
                        const answers = await getAnswerOf(patient.id, question.id, parseInt(limit, 10));
                        return { question, answers: answers || [] }; // Ensure answers is not null
                    })
                );
                setQuestionData(fetchedData);
            }
        };

        fetchAnswersForQuestions();
    }, [patient, questions, limit]);

    return (
        <>
            <Header />
            <main className="horizontal-1 ten-px-gap">
                <Aside patientId={patient.id} patientFirstName={patient.firstName} patientLastName={patient.lastName} idAside={6} />
                <div className="vertical">
                    <InputGroup
                        label="Răspunsuri care se iau în calcul (minim 5)"
                        name="limit"
                        type="number"
                        value={limit}
                        placeholder={"14"}
                        onChange={(event) => setLimit(event.target.value)}
                        error=""
                    />
                    <div className="statistics-container">
                        <table className="statistics-table">
                            <thead>
                            <tr>
                                <th>Întrebare</th>
                                <th>Dispoziția medie</th>
                                <th>Instabiliatea de dispoziție</th>
                                <th>Gradul de dispersie al stărilor</th>
                                <th>Dispoziție dominantă</th>
                            </tr>
                            </thead>
                            <tbody>
                            {questionData.map(({ question, answers }) => (
                                <tr key={question.id}>
                                    <td><b>{question.content}</b></td>
                                    <td>{calculateMean(answers).toFixed(2)}</td>
                                    <td>{calculateDeviation(answers, calculateMean(answers)).toFixed(2)}</td>
                                    <td>{calculateStandardDeviation(answers)}</td>
                                    <td>{calculateMod(answers)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}