export function isValidName(name: string): boolean {
    return name.length >= 3 && /^[a-zA-ZăâîșțÎȘȚ\s\-]+$/.test(name);
}

export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@(yahoo\.com|gmail\.com)$/.test(email);
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
    return /^\d{10}$/.test(phoneNumber);
}

export function isValidPNC(pnc: string): boolean {
    return /^\d{13}$/.test(pnc);
}

export function isValidMedicalNumber(pnc: string): boolean {
    return /^\d{6}$/.test(pnc);
}

export function isValidPassword (pass: string): boolean {
    if (pass.length < 8) return false;
    const regexLowerCase = /[a-z]/;
    const regexUpperCase = /[A-Z]/;
    const regexDigit = /[0-9]/;
    const regexSpc = /[!@#$%^?><;'&*()]/;
    return regexLowerCase.test(pass) && regexUpperCase.test(pass) && regexDigit.test(pass) && regexSpc.test(pass);
};