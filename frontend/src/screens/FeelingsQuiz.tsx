import Header from "../components/Header.tsx";
import {useState} from "react";
import img from "../resources/img/img-2.png";
import {postData} from "../functions/EndPoints.ts";

interface Props {
    patientId: number;
}

function FeelingQuiz({ patientId }: Props) {
    const questions = [
        'Nivelul meu de energie este sus azi.',
        'Am fost relaxat/ -ă azi.',
        'Starea mea generală este una pozitivă.',
        'Nivelul meu de stres este sus azi.',
        'Azi mă simt motivat/ -ă.'
    ];

    const [answers, setAnswers] = useState<number[]>([]);

    const handleRadioChange = (index: number, value: number) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    async function handleSaveAnswer() {
        const baseURL: string = "http://localhost:8080";
        const url: string = `/answer`; // URL-ul complet al endpoint-ului /answer
        const promises = questions.map((_question, index) => {
            const jsonAnswer = {
                answer: answers[index],
                question: { id: index + 1 },
                patient: { id: patientId }
            };
            console.log(jsonAnswer);

            // Convertirea obiectului JSON într-un string JSON
            const jsonData = JSON.stringify(jsonAnswer);

            // Returnează promisiunea pentru fiecare cerere POST
            return postData(url, jsonData);
        });

        // Așteaptă ca toate cererile POST să fie finalizate
        const responses = await Promise.all(promises);

        // Verifică răspunsurile
        responses.forEach((response, index) => {
            if (response && response.status === 201) {
                console.log(`Răspunsul pentru întrebarea ${index + 1} a fost trimis cu succes.`);
            } else {
                console.error(`Eroare la trimiterea răspunsului pentru întrebarea ${index + 1}.`);
            }
        });
    }

    return (
        <>
            <Header />
            <main className="horizontal-feeling">
                <div className="vertical-feeling">
                    <span className="mf-title">Cum te simți azi?</span>
                    <span className="mf-subtitle">
                        *considerând
                        <br />1 - cea mai departe de real și
                        <br />5 - cel mai aproape de sentimentele mele.
                        <br />Notează următoarele propoziții
                    </span>
                    <div className="questions-container">
                        {questions.map((question, index) => (
                            <div key={index} className="question-item">
                                <div className="question-text">{question}</div>
                                <div className="radio-buttons">
                                    {[1, 2, 3, 4, 5].map((number) => (
                                        <div key={number} className="radio-button-container">
                                            <input
                                                className="radio-button-btn"
                                                type="radio"
                                                id={`option${index}${number}`}
                                                name={`question${index}`}
                                                value={number}
                                                checked={answers[index] === number}
                                                onChange={() => handleRadioChange(index, number)}
                                            />
                                            <label className="radio-button-label" htmlFor={`option${index}${number}`}>{number}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="button-1" onClick={handleSaveAnswer}>Salvează</button>
                </div>
                <img id="feeling-img" src={img} alt="" />
            </main>
        </>
    );
}

export default FeelingQuiz;