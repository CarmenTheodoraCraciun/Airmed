import {Psychiatrist} from "../classes/Psychiatrist.ts";
import {Psychotherapist} from "../classes/Psychotherapist.ts";
import {FC, useEffect, useState} from "react";
import {getPatientsList} from "../functions/EndPoints.ts";
import {Patient} from "../classes/Patient.ts";
import {useNavigate} from "react-router-dom";
import {getAnswerOf} from "../functions/getAnswerOf.ts";
import {calculateDeviation, calculateMean} from "../functions/Statistics.ts";

interface Props {
    specialist: Psychiatrist | Psychotherapist;
}

const PatientsList: FC<Props> = ({ specialist }) => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [means, setMeans] = useState<(number | string)[]>([]);
    const [devs, setDevs] = useState<(number | string)[]>([]);

    useEffect(() => {
        const fetchPatients = async () => {
            let url = "";
            if (specialist instanceof Psychiatrist)
                url = `/patient/psychiatrist?psychiatrist=${specialist.id}`;
            else
                url = `/patient/psychotherapist?psychotherapist=${specialist.id}`;

            const patientsList = await getPatientsList(url);

            const updatedPatientsList = await Promise.all(
                patientsList.map(async (patient: Patient) => {
                    const answers = await getAnswerOf(patient.id, 7, 14);
                    console.log(patient.firstName,answers);
                    if (answers !== null && answers.length !== 0) {
                        const mean = calculateMean(answers);
                        const dev = calculateDeviation(answers, mean);
                        return { ...patient, mean, dev, answers };
                    } else {
                        return { ...patient, mean: "Date insuficiente", dev: "Date insuficiente" };
                    }
                })
            );

            setPatients(updatedPatientsList);

            const updatedMeans = updatedPatientsList.map(patient => patient.mean);
            const updatedDevs = updatedPatientsList.map(patient => patient.dev);
            setMeans(updatedMeans);
            setDevs(updatedDevs);
        };
        fetchPatients();
    }, [specialist]);

    const handleRowClick = (patientId: number) => {
        navigate(`/medical-history/${patientId}/personal-data`);
    };

    return (
        <div className="patients-list-container">
            <table className="patients-list-table">
                <thead>
                <tr>
                    <th className="patients-list-th">Prenume</th>
                    <th className="patients-list-th">Nume</th>
                    <th className="patients-list-th">Dispoziția medie</th>
                    <th className="patients-list-th">Instabilitatea de dispoziție</th>
                </tr>
                </thead>
                <tbody>
                {patients.map((patient, index) => (
                    <tr
                        key={patient.id}
                        className={index % 2 === 0 ? 'even patients-list-tr' : 'odd patients-list-tr'}
                        onClick={() => handleRowClick(patient.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <td className="patients-list-td">{patient.firstName}</td>
                        <td className="patients-list-td">{patient.lastName}</td>
                        <td className="patients-list-td">
                            {typeof means[index] === 'number' ? means[index] : means[index]}
                        </td>
                        <td className="patients-list-td">
                            {typeof devs[index] === 'number' ? devs[index] : devs[index]}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientsList;