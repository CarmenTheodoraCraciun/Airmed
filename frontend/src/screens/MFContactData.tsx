import Header from "../components/Header.tsx";
import {Patient} from "../classes/Patient.ts";
import Aside from "../components/Aside.tsx";
import {useEffect, useState} from "react";
import Loading from "../components/Loading.tsx";
import MFInput from "../components/MFInput.tsx";
import {ContactPerson} from "../classes/ContactPerson.ts";
interface Props {
    patientId: number;
}

function MFContactData({ patientId }: Props) {
    const relationshipOptions = ['Sot/ Sotie', 'Tata/ Mama', 'Frate/ Sora', 'Iubit/ Iubita', 'Copil', 'Bunic/ Bunica', 'Unchi/ Matusa','Nas/ Nasa', 'Fin/ Fina', 'Prieten/ Prietena', 'Var/ Verisoara', 'Altceva'];

    const baseURL: string = "http://localhost:8080";
    const patientDataString = sessionStorage.getItem('patient');
    // const psychiatristDataString = sessionStorage.getItem('psychiatrist');
    // const psychotherapistDataString = sessionStorage.getItem('psychotherapist');

    const [detalies, setDetails] = useState<JSX.Element | null>(null);
    const [phone, setPhone] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [firstName0, setFirstName0] = useState<string>('');
    const [lastName0, setLastName0] = useState<string>('');
    const [relationship0, setRelationship0] = useState<string>('');
    const [phone0, setPhone0] = useState<string>('');
    const [firstName1, setFirstName1] = useState<string>('');
    const [lastName1, setLastName1] = useState<string>('');
    const [relationship1, setRelationship1] = useState<string>('');
    const [phone1, setPhone1] = useState<string>('');

    const handleInputChange = (name: string, value: string) => {
        switch (name) {
            case 'phone':
                setPhone(value);
                break;
            case 'mail':
                setMail(value);
                break;
            case 'firstName0':
                setFirstName0(value);
                break;
            case 'lastName0':
                setLastName0(value);
                break;
            case 'relationship0':
                setRelationship0(value);
                break;
            case 'phone0':
                setPhone0(value);
                break;
            case 'firstName1':
                setFirstName1(value);
                break;
            case 'lastName1':
                setLastName1(value);
                break;
            case 'relationship1':
                setRelationship1(value);
                break;
            case 'phone1':
                setPhone1(value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const getPatient = async () => {
            var response = await fetch(baseURL + '/patient/' + patientId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173'
                }
            });
            if (response.status === 302){
                var data = await response.json();
                const patient = Patient.jsonToPatient(JSON.stringify(data));
                data = null;
                response = await fetch(baseURL + '/contactPerson/patient?patient=' + patientId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:5173'
                    }
                });

                if( response.status === 302)
                    data = await response.json();
                const contact = ContactPerson.jsonToContactPersons(data);

                const details = (
                    <>
                        <Aside patientId={patient.id} patientFirstName={patient.firstName} patientLastName={patient.lastName} idAside={1}/>
                        <div className="vertical ten-px-gap">
                            <span className="mf-title">Date de contact personal</span>
                            <MFInput inputName="Număr de telefon" initialValue={patient.phone}
                                onChange={(value) => handleInputChange('phone', value)}/>
                            <MFInput inputName="Mail" initialValue={patient.mail}
                                     onChange={(value) => handleInputChange('phone', value)} />
                            <span className="mf-title">Contact persoană 1</span>
                            <MFInput inputName="Prenume" initialValue={contact[0].firstName} />
                            <MFInput inputName="Nume" initialValue={contact[0].lastName} />
                            <div className="input-group-mf">
                                <span className="input-span">Relatie</span> <br/>
                                <select id="relationship" className="select-mf" onChange={handleInputChange} defaultValue={contact[0].relationship}>
                                    {relationshipOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="vertical ten-px-gap">
                            <MFInput inputName="Telefon" initialValue={contact[0].phone} />
                            <span className="mf-title">Contact persoană 2</span>
                            <MFInput inputName="Prenume" initialValue={contact[1].firstName} />
                            <MFInput inputName="Nume" initialValue={contact[1].lastName} />
                            <div className="input-group-mf">
                                <span className="input-span">Relatie</span> <br/>
                                <select id="relationship" className="select-mf" onChange={handleSelectChange} defaultValue={contact[1].relationship}>
                                    {relationshipOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <MFInput inputName="Telefon" initialValue={contact[1].phone} />
                            {patientDataString !== null ?
                                <button className="button-1">Salvează</button>
                                : null}
                        </div>
                    </>
                );
                setDetails(details);
            }
        };

        getPatient();
    }, [patientId, patientDataString]);

    return (
        <>
            <Header/>
            <main className="horizontal-1 ten-px-gap">
                {detalies === null ?
                    <Loading/>
                    : detalies
                }
            </main>
        </>
    );
}

export default MFContactData;