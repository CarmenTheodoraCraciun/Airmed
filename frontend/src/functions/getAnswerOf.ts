import { getData } from "./EndPoints.ts";

export async function getAnswerOf(patientId: number, questionId: number, limit: number): Promise<number[] | null> {
    try {
        const response = await getData(
            `/answer/patient?patient=${patientId}&question=${questionId}&limit=${limit}`
        );

        if (Array.isArray(response)) {
            return response.map(answer => answer.answer);
        } else {
            console.error("Response is not an array:", response);
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error;
    }
}