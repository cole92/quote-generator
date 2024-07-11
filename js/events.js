import { fetchQuotes } from './api.js'
import { displayQuote } from './interface.js';
import { saveFavoriteQuote, removeFavoriteQuote, showFavoriteQuotes, isFavorite, clearAllFavorites, sortFavoriteQuotes} from './storage.js';

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
            author = author.split(',')[0]; // Uzimam samo ime pre zareza
            if (author.trim().toLowerCase() === "type.fit") {
                author = "Anonymous";
            }
        } else {
            author = "Anonymous";
        }

        displayQuote(quote, author);
        
        // Provera da li je citat dodat u 'omiljeno'
        if (isFavorite(quote, author)) {
            heartBtn.style.display = 'none';
            fullHeartBtn.style.display = 'inline-block';
        } else {
            heartBtn.style.display = 'inline-block';
            fullHeartBtn.style.display = 'none';
        }
    };

    // Poziv asinhrone metode getNewQuote klikom na dugme
    nextBtn.addEventListener('click', getNewQuote);

    getNewQuote()

    // Logika za puno-prazno srce i cuvanje u localStorage
    heartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        heartBtn.style.display = 'none';
        fullHeartBtn.style.display = 'inline-block';
        const quote = document.getElementById('quote').innerText;
        const author = document.getElementById('author').innerText;
        saveFavoriteQuote(quote, author);
    });
    fullHeartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        heartBtn.style.display = 'inline-block';
        fullHeartBtn.style.display = 'none';
        const quote = document.getElementById('quote').innerText;
        const author = document.getElementById('author').innerText;
        removeFavoriteQuote(quote, author);
    });
    favBtn.addEventListener('click', showFavoriteQuotes);
};
    // Listener za prikaz omiljenih citata
    favBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showFavoriteQuotes();
        document.getElementById('favoritesModal').style.display = 'block';
    })

    const clearFavoritesBtn = document.getElementById('clearFavorites');
    // Brisanje svih omiljenih
    clearFavoritesBtn.addEventListener('click', () => {
        clearAllFavorites();
        showFavoriteQuotes();
        resetHearts()
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
    // Funkcija za resetovanje srca nakon clear all metode!
    const resetHearts = () => {
        const quote = document.getElementById('quote').innerText;
        const heartBtn = document.getElementById('heart');
        const fullHeartBtn = document.getElementById('fullHeart');
    if (!isFavorite(quote)) {
        heartBtn.style.display = 'inline-block';
        fullHeartBtn.style.display = 'none';
    }
};
    // Padajuci meni
    const sortSelect = document.getElementById('sortQuotes');
    sortSelect.addEventListener('change', (e) => {
        const sortOption = e.target.value;
        sortFavoriteQuotes(sortOption)
    });