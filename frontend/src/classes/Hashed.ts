export class Hashed {
    static extractDataFromHash(hashedData: string, salt: string): string {
        try {
            const decodedHash = Hashed.base64ToUtf8(hashedData);
            if (decodedHash === salt) {
                return decodedHash;
            } else {
                throw new Error("Invalid hashedData or salt");
            }
        } catch (error) {
            throw new Error("Invalid hashedData or salt");
        }
    }

    static base64ToUtf8(base64String: string): string {
        const buffer = Buffer.from(base64String, 'base64');
        return buffer.toString('utf-8');
    }
}