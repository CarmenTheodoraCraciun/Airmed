export interface Locality {
    nume: string;
    diacritice: string;
}
export interface LocalityData {
    [judet: string]: Locality[];
}