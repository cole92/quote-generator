import { fetchQuotes } from './api.js'
import { displayQuote } from './interface.js';
import { saveFavoriteQuote, removeFavoriteQuote, showFavoriteQuotes, isFavorite, clearAllFavorites } from './storage.js';

export const initEventListeners = () => {
    const nextBtn = document.getElementById('next2');
    const heartBtn = document.getElementById('heart');
    const fullHeartBtn = document.getElementById('fullHeart');
    const favBtn = document.getElementById('favBtn');

    // Asinhrona metoda za dobijanje novog citata
    const getNewQuote = async () => {
        const allQuotes = await fetchQuotes();
        const index = Math.floor(Math.random() * allQuotes.length);
        const quote = allQuotes[index].text;
        let author = allQuotes[index].author;

        if (author) {
            author = author.replace(', type.fit', ''); // Uklanja ", type.fit" iz imena
            if (author.trim().toLowerCase() === "type.fit" || author.trim() === "") {
                author = "Anonymous";
            }
        } else {
            author = "Anonymous";
        }

        displayQuote(quote, author);

        // Provera da li je citat dodat u 'omiljeno'
        if (isFavorite(quote)) {
            heartBtn.style.display = 'none';
            fullHeartBtn.style.display = 'inline-block';
        } else {
            heartBtn.style.display = 'inline-block';
            fullHeartBtn.style.display = 'none';
        }
    };

    // Poziv asinhrone metode getNewQuote klikom na dugme
    nextBtn.addEventListener('click', getNewQuote);

    getNewQuote();

    // Logika za puno-prazno srce i cuvanje u localStorage
    heartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        heartBtn.style.display = 'none';
        fullHeartBtn.style.display = 'inline-block';
        const quote = document.getElementById('quote').innerText;
        saveFavoriteQuote(quote);
    });
    fullHeartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        heartBtn.style.display = 'inline-block';
        fullHeartBtn.style.display = 'none';
        const quote = document.getElementById('quote').innerText;
        removeFavoriteQuote(quote);
    });
    favBtn.addEventListener('click', showFavoriteQuotes);
};

// Listener za prikaz omiljenih citata
favBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showFavoriteQuotes();
    document.getElementById('favoritesModal').style.display = 'block';
});

const clearFavoritesBtn = document.getElementById('clearFavorites');
// Brisanje svih omiljenih
clearFavoritesBtn.addEventListener('click', () => {
    clearAllFavorites();
    showFavoriteQuotes();
});

// Listener za zatvaranje modala
const closeModalBtn = document.querySelector('.close');
closeModalBtn.addEventListener('click', () => {
    document.getElementById('favoritesModal').style.display = 'none';
});

// Listener za zatvaranje modala klikom izvan sadrzaja
window.addEventListener('click', (event) => {
    const modal = document.getElementById('favoritesModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});