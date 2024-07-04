// Asinhrona funckija
export const fetchQuotes = async () => {
    let apiUrl = 'https://type.fit/api/quotes';

    const response = await fetch(apiUrl);
    const allQuotes = await response.json();
    return allQuotes;
};