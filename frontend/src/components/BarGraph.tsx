import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface Props {
    values: number[];
}

export function BarGraph({ values }: Props) {
    const data = {
        labels: Array.from({ length: values.length }, (_, i) => `Bar ${i + 1}`),
        datasets: [
            {
                label: 'Values',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: values,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ height: '400px', width: '600px', margin: 'auto' }}>
            <h2>Bar Graph</h2>
            <Bar key={Math.random()} data={data} options={options} />
        </div>
    );
};