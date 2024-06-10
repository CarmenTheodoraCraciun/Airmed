// POST
import {Patient} from "../classes/Patient.ts";
const baseURL = 'http://localhost:5173';

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
    return await fetch(baseURL + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5173'
        }
    });
}

export async function getPatientsList(url: string) {
    try {
        const response = await getData(baseURL + url);
        if (response.status === 200) {
            const data = await response.json();
            return data.map((patientJson: any) => Patient.jsonToPatient(JSON.stringify(patientJson)));
        } else {
            console.log('Error fetching patients: Invalid response status', response.status);
            return [];
        }
    } catch (error) {
        console.error('Error fetching patients:', error);
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
export async function updateData(url: string, jsonData: string) {
    try {
        const response = await fetch(baseURL + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });
        if (response.status === 200) {
            alert('Actualizare cu succes.');
            return true;
        } else {
            console.log('A apărut o problemă în timpul actualizării.');
            return false;
        }
    } catch (error) {
        console.log('Eroare la actualizare:', error);
        return false;
    }
}