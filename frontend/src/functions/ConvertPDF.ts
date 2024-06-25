import { getData } from "./EndPoints.ts";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { calculateAge, checkFemale, dateToString, extractBirthday } from "../functions/ExtracFromPNC.ts";

export async function ConvertPDF(patientId: number) {
    try {
        let response = await getData('/patient/' + patientId);
        if (response !== 404) {
            const patient = response;

            const birthday = extractBirthday(patient.pnc);
            const birthdayStr = birthday ? dateToString(birthday) : '';
            const age = birthday ? calculateAge(birthday).toString() : '';

            const doc = new jsPDF();

            doc.setFontSize(16);
            doc.text('Fișă medicală: ' + patient.firstName + " " + patient.lastName.toUpperCase(), 20, 20);

            let bodyData = [
                ['Date personale', ''],
                ['Prenume', patient.firstName || ''],
                ['Nume', patient.lastName || ''],
                ['Cod Numeric Personal', patient.pnc || ''],
                ['Data Nașterii', birthdayStr || ''],
                ['Vârstă', age || ''],
                ['Mail', patient.mail || ''],
                ['Număr de telefon', patient.phone || '']
            ];

            response = await getData('/socialContext/patient?patient=' + patientId);
            if (response !== 404) {
                const socialContext = response;
                bodyData = bodyData.concat([
                    ['Date sociale', ''],
                    ['Ocupație', socialContext.occupation || ''],
                    ['Ultima școală absolvită', socialContext.highestEdu || ''],
                    ['Relație actuală', socialContext.relationship || ''],
                    ['Activ sexual', socialContext.sexuallyActive ? 'Da' : 'Nu'],
                    ['Orientarea de gen', socialContext.genderOrientation || ''],
                    ['Probleme legale', socialContext.legalProblems || ''],
                    ['Pacientul este adoptat', socialContext.adopted ? 'Da' : 'Nu'],
                    ['Despre familie', socialContext.family || ''],
                    ['Istoric psihiatric familie', socialContext.familyPsychiatric || ''],
                    ['Consum substante prohibite', socialContext.drugs || ''],
                    ['Abuz de medicamente', socialContext.abuseMeds || ''],
                    ['Abuzul de cofeina', socialContext.caffeine || ''],
                    ['Exercitii fizice', socialContext.exercise || '']
                ]);
            }

            response = await getData('/medicalData/patient?patient=' + patientId);
            if (response !== 404) {
                const medicalData = response;
                bodyData = bodyData.concat([
                    ['Date medicale', ''],
                    ['Alergii', medicalData.allergies || ''],
                    ['Greutate (kilograme)', medicalData.weight || ''],
                    ['Înălțime (centimetri)', medicalData.height || ''],
                    ['Boli', medicalData.diseases || ''],
                    ['Medicație', medicalData.medecamentation || ''],
                    ...(checkFemale(patient.pnc) ? [['Pacienta însărcinată', medicalData.pregnant ? 'Da' : 'Nu']] : [])
                ]);
            }

            response = await getData('/psychiatricData/patient?patient=' + patientId);
            if (response[0] !== undefined) {
                let psychiatricData = response[0].presant ? response[0] : response[1];
                bodyData = bodyData.concat([
                    ['Date psihiatice anterioare'],
                    ['Diagnostic',psychiatricData.diagnostics],
                    ['Spitalizare',psychiatricData.hospitalization? 'Da' : 'Nu' ],
                    ['Antidepresive', psychiatricData.antidepressant],
                    ['Stabilizatori de dispozitie', psychiatricData.moodStabilizers],
                    ['Antipsihotice',psychiatricData.antipsychotics],
                    ['Ganduri suicidale', psychiatricData.suicideThoughts]
                ]);
                psychiatricData = response[0].presant ? response[1] : response[0];
                bodyData = bodyData.concat([
                    ['Date psihiatice prezente'],
                    ['Diagnostic',psychiatricData.diagnostics],
                    ['Spitalizare',psychiatricData.hospitalization? 'Da' : 'Nu' ],
                    ['Antidepresive', psychiatricData.antidepressant],
                    ['Stabilizatori de dispozitie', psychiatricData.moodStabilizers],
                    ['Antipsihotice',psychiatricData.antipsychotics],
                    ['Ganduri suicidale', psychiatricData.suicideThoughts]
                ]);
            }

            autoTable(doc, {
                startY: 30,
                head: [],
                body: bodyData
            });

            doc.save(`fisaMedicala${patient.lastName}.pdf`);
        } else {
            console.error('Patient not found');
        }
    } catch (error) {
        console.error('Failed to fetch patient data:', error);
    }
}