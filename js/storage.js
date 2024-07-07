// Cuvanje novog citata u localStorage
export const saveFavoriteQuote = (quote, author) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push({ quote, author });
    localStorage.setItem('favorites', JSON.stringify(favorites));
};
// Uklanjanje omiljenog citata iz localStorage
export const removeFavoriteQuote = (quote, author) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.quote !== quote || fav.author !== author);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};
// Prikazivanje omiljenih citata
export const showFavoriteQuotes = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteQuoteList = document.getElementById('favoriteQuotesList');
    favoriteQuoteList.innerHTML = '';

    favorites.forEach(fav => {
        const quoteDiv = document.createElement('div');
        quoteDiv.classList.add('favorite-quote');
        quoteDiv.innerHTML = `<p>${fav.quote}</p><p>~ ${fav.author}</p>`;
        favoriteQuoteList.appendChild(quoteDiv);
    })
};