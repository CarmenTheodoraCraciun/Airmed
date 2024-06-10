export const getCountriesLocalities = async () => {
    try {
        const response = await fetch('/judete-localitati-ro.json');
        return await response.json();
    } catch (error) {
        console.error('Eroare la încărcarea datelor despre județe și localități:', error);
    }
};