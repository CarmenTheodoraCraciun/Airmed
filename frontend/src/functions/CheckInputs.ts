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