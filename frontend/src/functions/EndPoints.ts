// POST
import {Patient} from "../classes/Patient.ts";

export async function postData(url: string, jsonData: string) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:5173'
            },
            body: jsonData
        });
        return response;
    } catch (error) {
        console.log('Eroare la trimiterea datelor:', error);
        return null;
    }
}

// GET
export async function checkUnique(url: string){
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5173' // Antetul CORS
        }
    });

    return (response.status === 404);
}

export async function getData(url: string){
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5173'
        }
    });
}

export async function getPatientsList(url: string) {
    try {
        const response = await getData(url);
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

// PUT
export async function updateData(url: string, jsonData: string) {
    try {
        const response = await fetch(url, {
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