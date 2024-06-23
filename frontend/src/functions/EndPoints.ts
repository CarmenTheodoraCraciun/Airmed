import {Patient} from "../classes/Patient.ts";

const baseURL = "http://localhost:8080";

// POST
export async function postData(url: string, jsonData: string) {
    try {
        return await fetch(baseURL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:5173'
            },
            body: jsonData
        });
    } catch (error) {
        console.log('Eroare la trimiterea datelor:', error);
        return null;
    }
}

// GET
export async function getData(url: string){
    try {
        const response = await fetch(baseURL + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:5173'
            }
        });

        const text = await response.text();

        if (response.status === 200 || response.status === 302) {
            try {
                return JSON.parse(text);
            } catch (error) {
                console.error('Response is not JSON:', text);
                throw error;
            }
        }
        else if (response.status === 204 || response.status === 404){
            return response.status;
        }
        else {
            console.error('Error fetching data:', response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function getPatientsList(url: string) {
    const response = await getData(url);
    if (response) {
        return response.map((patientJson: any) =>
            Patient.jsonToPatient(JSON.stringify(patientJson)));
    } else {
        console.log('Error fetching patients: Invalid response');
        return [];
    }
}

// Checks
export async function checkUnique(url: string){
    const response = await fetch(baseURL + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5173' // Antetul CORS
        }
    });

    return (response.status === 404);
}

export async function checkUniqueMail(mailValue: string){
    const emailCheckURLs = [
        '/patient/mail?mail=' + mailValue + '&password= ',
        '/psychiatrist/mail?mail=' + mailValue+ '&password= ',
        '/psychotherapist/mail?mail=' + mailValue+ '&password= '
    ];
    for (const url of emailCheckURLs) {
        if(!await checkUnique(url)){
            alert("Există cont cu adresa de email dată.");
            return false;
        }
    }
    return true;
}

export async function checkUniqueMedicalNumber(medicalNumber: string){
    const medicalNumberCheckURLs = [
        '/psychiatrist/medicalNumber?medicalNumber=' + medicalNumber,
        '/psychotherapist/medicalNumber?medicalNumber=' + medicalNumber
    ];
    for (const url of medicalNumberCheckURLs) {
        if(!await checkUnique(url)){
            alert("Parafa medicala există în baza de date.");
            return false;
        }
    }
    return true;
}

export async function checkUniquePNC(pnc: string){
    const url = '/patient/PNC?PNC=' + pnc;
    if(!await checkUnique(url)){
        alert("CNP-ul există în baza de date.");
        return false;
    }
    return true;
}

// PUT
export async function updateData(url: string, jsonData: any) {
    console.log(url);
    try {
        var response;
        if(jsonData) {
            response = await fetch(baseURL + url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173'
                },
                body: jsonData
            });
        }
        else{
            response = await fetch(baseURL + url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173'
                },
                body: JSON.stringify(jsonData)
            });
        }
        if(response.status === 404){
            alert("Ceva nu a mers la noi.");
            return false;
        }
        else{
            alert('Actualizare cu succes.');
            return response.json();
        }
    } catch (error) {
        console.log('Eroare la actualizare:', error);
        return false;
    }
}