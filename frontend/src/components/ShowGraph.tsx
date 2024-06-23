import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Answer } from '../classes/Answer.ts'; // Verifică dacă aceasta este calea corectă către clasa Answer

interface Props {
    answers: Answer[];
}

const ShowGraph: React.FC<Props> = ({ answers }) => {
    // Crează datele necesare pentru grafic
    const data = {
        datasets: [
            {
                label: 'Answers',
                data: answers.map(answer => answer.answer),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ height: '400px', width: '600px' }}>
            <Bar data={data} />
        </div>
    );
};

export default ShowGraph;
