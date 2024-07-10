# Random Quote Generator

## Opis
Random Quote Generator je jednostavna aplikacija koja generise nasumicne citate pomocu javnog API-ja i omogucava korisnicima da sacuvaju omiljene citate. Korisnici mogu pregledati, dodavati i uklanjati citate iz liste omiljenih, kao i deliti citate na Twitter-u.

## Funkcionalnosti
- Generisanje nasumicnih citata sa API-ja.
- Prikazivanje citata i autora.
- Obelezavanje omiljenih citata pomocu srca.
- Pregledavanje sacuvanih omiljenih citata u modalnom prozoru.
- Uklanjanje citata iz omiljenih.
- Brisanje svih omiljenih citata odjednom.
- Deljenje citata na Twitter-u.

## Tehnologije
- HTML
- CSS
- JavaScript
- FontAwesome za ikone
- Lokalno skladiste (Local Storage) za cuvanje omiljenih citata

## Izmene i Resavanje Problema
### Opis Problema
Prethodno je aplikacija imala problem sa prepoznavanjem i prikazivanjem omiljenih citata zbog razlicitih formata autora citata. Konkretno, API je vracao autore u formatu "Ime, type.fit", sto je uzrokovalo neuspesne provere pri dodavanju ili uklanjanju omiljenih citata.

### Resenje
Problem je resen izmenom logike za proveru omiljenih citata tako da se proverava samo tekst citata (`quote`), a ne i autor. Ova promena je omogucila ispravno prepoznavanje i prikazivanje omiljenih citata.

#### Koraci Izmene:
1. **Provera citata bez autora**: Izmenjena je logika tako da se provera omiljenih citata vrsi samo na osnovu citata (`quote`), bez obzira na autora.
2. **Uklanjanje provere autora**: Uklonjena je provera autora iz funkcija `saveFavoriteQuote`, `removeFavoriteQuote`, i `isFavorite` u `storage.js`.
3. **Provera omiljenih citata**: Funkcija `isFavorite` sada proverava da li je citat omiljen samo na osnovu `quote`.
4. **Prikaz srca**: Prikazivanje praznog ili punog srca sada zavisi samo od citata, sto je omogucilo ispravno prikazivanje stanja srca.

#### Primer koda:
```javascript
// Cuvanje novog citata u localStorage
export const saveFavoriteQuote = (quote) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Provera da li vec postoji u omiljenim
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
