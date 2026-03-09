// api.js
export const fetchQuotes = async () => {
    const apiUrl = "./data/quotes.json"; 
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const allQuotes = await response.json();
        return allQuotes;
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to fetch quotes. Please try again later.');
        return [];
    }
};
