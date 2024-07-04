import { fetchQuotes } from './api.js'
import { displayQuote } from './interface.js';

export const initEventListeners = () => {
    const nextBtn = document.getElementById('next2');

    // Asinhrona metoda za dobijanje novog citata
    const getNewQuote = async () => {
        const allQuotes = await fetchQuotes();
        const index = Math.floor(Math.random() * allQuotes.length);
        const quote = allQuotes[index].text;
        let author = allQuotes[index].author;

        if (author) {
            author = author.split(',')[0]; // Uzimam samo ime pre zareza
            if (author.trim().toLowerCase() === "type.fit") {
                author = "Anonymous";
            }
        } else {
            author = "Anonymous";
        }

        displayQuote(quote, author);
    };

    // Poziv asinhrone metode getNewQuote klikom na dugme
    nextBtn.addEventListener('click', getNewQuote);

    getNewQuote()
};
