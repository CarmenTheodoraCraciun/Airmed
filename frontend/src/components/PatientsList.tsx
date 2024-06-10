import {Psychiatrist} from "../classes/Psychiatrist.ts";
import {Psychotherapist} from "../classes/Psychotherapist.ts";
import React, {useEffect, useState} from "react";
import {getPatientsList} from "../functions/EndPoints.ts";
import {Patient} from "../classes/Patient.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    specialist: Psychiatrist | Psychotherapist;
}

const PatientsList: React.FC<Props> = ({ specialist }) => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState<Patient[]>([]);
    useEffect(() => {
        const fetchPatients = async () => {
            let url = "";
            if (specialist instanceof Psychiatrist)
                url = `/patient/psychiatrist?psychiatrist=${specialist.id}`;
            else
                url = `/patient/psychotherapist?psychotherapist=${specialist.id}`;

            const patientsList = await getPatientsList(url);
            setPatients(patientsList);
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
                    <th className="patients-list-th">Cod Numeric Personal</th>
                    <th className="patients-list-th">Număr de telefon</th>
                    <th className="patients-list-th">Mail</th>
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
                        <td className="patients-list-td">{patient.pnc}</td>
                        <td className="patients-list-td">{patient.phone}</td>
                        <td className="patients-list-td">{patient.mail}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientsList;