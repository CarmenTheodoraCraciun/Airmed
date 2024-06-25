import { ReactNode, useEffect, useState } from "react";
// import img from "../resources/img/img-2.png";
import { Patient } from "../classes/Patient.ts";
import { Question } from "../classes/Question.ts";
import {getData, postData} from "../functions/EndPoints.ts";

interface Props {
    patient: Patient;
}

function Feeling({ patient }: Props) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [container, setContainer] = useState<ReactNode[]>([]);
    const [answers, setAnswers] = useState<number[]>([]);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response = await getData("/question/all");
                if (response !== 404) {
                    setQuestions(response);
                    setAnswers(new Array(response.length).fill(0));
                }
            } catch (error) {
                console.error('Failed to fetch questions:', error);
            }
        };
        getQuestions();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            setContainer(
                questions.map((question, index) => (
                    <div key={index} className="question-item">
                        <div className="question-text">{question.content}</div>
                        <div className="radio-buttons">
                            {[1, 2, 3, 4, 5].map((number) => (
                                <div key={`${index}-${number}`} className="radio-button-container">
                                    <input
                                        className="radio-button-btn"
                                        type="radio"
                                        id={`option-${index}-${number}`}
                                        name={`question-${index}`}
                                        value={number}
                                        checked={answers[index] === number}
                                        onChange={() => handleRadioChange(index, number)}
                                    />
                                    <label className="radio-button-label" htmlFor={`option-${index}-${number}`}>{number}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            );
        }
    }, [questions, answers]);

    const handleRadioChange = (index: number, value: number) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const areAllAnswersSelected = () => {
        return answers.every(answer => answer !== -1); // Verificăm dacă toate întrebările au o valoare selectată, diferită de -1
    };

    const handleSaveAnswer = async () => {
        if (areAllAnswersSelected()) {
            const savedAnswers = questions.map((question, index) => ({
                answer: answers[index],
                question: question,
                patient: patient,
                createdAt:new Date()
            }));

            const requestData = {
                answers: savedAnswers // Obiect care conține un câmp 'answers' care este un array de obiecte 'Answer'
            };

            const jsonData = JSON.stringify(requestData);

            try {
                const response = await postData("/answers", jsonData);
                if (response && response.status === 201) {
                    alert('Răspunsurile au fost salvate cu succes în baza de date!');
                } else {
                    alert('A intervenit o eroare la salvarea răspunsurilor.');
                }
            } catch (error) {
                console.error('Eroare la salvarea datelor:', error);
                alert('A intervenit o eroare la salvarea răspunsurilor.');
            }
        } else {
            alert('Completați toate întrebările înainte de a salva.');
        }
    };

    return (
        <>
            <div className="vertical-1">
                <span className="mf-title">Cum te simți azi?</span>
                <span className="mf-subtitle">
                    *considerând
                    <br />1 - cea mai departe de real și
                    <br />5 - cel mai aproape de sentimentele mele.
                    <br />Notează următoarele propoziții
                </span>
                <div className="questions-container">
                    {container}
                </div>
                <button className="button-1" onClick={handleSaveAnswer}>Salvează</button>
            </div>
            {/*<img id="feeling-img" src={img} alt="" />*/}
        </>
    );
}

export default Feeling;