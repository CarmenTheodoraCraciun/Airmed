export function checkMale(pnc: string): boolean {
    const sexMValues = ['1', '5', '7'];
    const firstDigit = pnc[0];
    return sexMValues.includes(firstDigit);
}
export function extractBirthday(pnc: string): Date | null {
    const yearDigits = pnc.substring(1, 3);
    const monthDigits = pnc.substring(3, 5);
    const month = parseInt(monthDigits, 10);
    const dayDigits = pnc.substring(5, 7);
    const day = parseInt(dayDigits, 10);

    const century = pnc[0] === '1' || pnc[0] === '2' ? '19' : '20';
    const fullYear = parseInt(century + yearDigits, 10);

    // Verifică dacă data formată este validă
    const birthday = new Date(fullYear, month-1, day);
    const isValidDate = !isNaN(birthday.getTime());
    return isValidDate ? birthday : null;
}

export function dateToString(date: Date): string {
    return date.toLocaleDateString('ro-RO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

export function calculateAge(birthDate: Date): number {
    const currentDate = new Date();
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDay)) {
        alert("Problema la citirea date de nastere");
    }

    let age = currentYear - birthYear;

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        --age;
    }

    return age;
}

