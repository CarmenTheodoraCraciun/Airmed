import * as crypto from 'crypto';

export class Hashed {
    static verifyHashData(salt: string, hashedString: string): boolean {
        const hashedInput = Hashed.createHashData(salt);
        return hashedInput === hashedString;
    }

    static extractDataFromHash(hashedData: string, salt: string): string {
        if (Hashed.verifyHashData(salt, hashedData)) {
            const decodedHash = Hashed.base64ToUtf8(hashedData);
            return decodedHash;
        } else {
            throw new Error("Invalid hashedData or salt");
        }
    }

    static createHashData(salt: string): string {
        try {
            const md = crypto.createHash('sha256');
            md.update(Buffer.from(salt, 'base64'));
            const hashed = md.digest().toString('base64');
            return hashed;
        } catch (error) {
            throw new Error("Error hashing password");
        }
    }


    static base64ToUtf8(base64String: string): string {
        const buffer = Buffer.from(base64String, 'base64');
        return buffer.toString('utf-8');
    }
}
