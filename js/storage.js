// Cuvanje novog citata u localStorage
export const saveFavoriteQuote = (quote) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Provera da li već postoji u omiljenim
    const alreadyFavorite = favorites.some(fav => fav.quote === quote);
    if (!alreadyFavorite) {
        favorites.push({ quote });
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

// Uklanjanje omiljenog citata iz localStorage
export const removeFavoriteQuote = (quote) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.quote !== quote);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Provera da li je citat stavljen u 'omiljeno'
export const isFavorite = (quote) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(fav => fav.quote === quote);
};

// Prikazivanje omiljenih citata
export const showFavoriteQuotes = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteQuoteList = document.getElementById('favoriteQuotesList');
    favoriteQuoteList.innerHTML = '';

    favorites.forEach(fav => {
        const quoteDiv = document.createElement('div');
        quoteDiv.classList.add('favorite-quote');
        quoteDiv.innerHTML = `<p>${fav.quote}</p>`;
        favoriteQuoteList.appendChild(quoteDiv);
    });
};

// Funkcija za brisanje svih omiljenih citata iz localStorage
export const clearAllFavorites = () => {
    localStorage.removeItem('favorites');
};
