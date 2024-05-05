export function isValidName(name: string): boolean {
    return name.length >= 3 && /^[a-zA-ZăâîșțÎȘȚ\s\-]+$/.test(name);
}

export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
    return /^\d{10}$/.test(phoneNumber);
}

function controlDigit(pnc: string): boolean {
    const f = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
    let s = 0;
    for (let i = 0; i < 12; i++)
        s += f[i] * Number(pnc[i]);
    let r = s % 11;
    if (r === 10) r = 1;
    return r === Number(pnc[12]);
}

export function isValidPNC(pnc: string): boolean {
    // SAALLZZJJNNNC
    // 01234
    const length = /^\d{13}$/.test(pnc);
    // S
        // 1 - M 1900 - 1999
        // 2 - F 1900 - 1999
        // 5 - M 2000 - 2099
        // 6 - F 2000 - 2099
        // 7 - M rezident/ strain
        // 8 - M rezident/ strain
    const sexValues = ['1', '2', '5', '6', '7', '8'];
    const firstDigit = pnc[0];
    const sex = sexValues.includes(firstDigit);
    // AA = 00 - 99
    // LL = 00 - 12
    const monthDigits = pnc.substring(3, 5);
    const monthValue = parseInt(monthDigits, 10);
    const month = (monthValue >= 1 && monthValue <= 12);
    // ZZ = 01 - 31
    const dayDigits = pnc.substring(5, 7);
    const dayValue = parseInt(dayDigits, 10);
    const day = (dayValue >= 1 && dayValue <= 31);
    // JJ = 01 - 46 + 51 + 52
    const jDigits = pnc.substring(7, 9);
    const jValue = parseInt(jDigits, 10);
    const j = ((jValue >= 1 && jValue <= 46) || (jValue === 51) || (jValue === 52));
    // N = 0 - 9
    return  length && sex && month && day && j && controlDigit(pnc);
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
}

export function isWizeOrMapsLink(link: string): boolean {
    const regex = /^(https?:\/\/)?(www\.)?(maps|wize)\./;
    return regex.test(link);
}

export function isPositiveNumber(str: string): number | false {
    const num = Number(str);
    if (Number.isInteger(num) && num >= 0)
        return num;
    return false;
}
