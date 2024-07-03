// Pristupanje elementima
const text = document.getElementById('quote');
const author = document.getElementById('author');
const tweetBtn = document.getElementById('tweet');
const nextBtn = document.getElementById('next2');

// Kreiram asinhronu funkciju
const getNewQuote = async () => {
    // Api
    let apiUrl = 'https://type.fit/api/quotes';

    const response = await fetch(apiUrl);
    // Kovertujem response u json i smestam u allQuotes
    const allQuotes = await response.json();
    // Generisem slucajni broj izmedju 0 i duzine niza
    const index = Math.floor(Math.random()*allQuotes.length);
    
    const quote = allQuotes[index].text;
    const auth = allQuotes[index].author;
    
    // Provera postojeceg autora
    if (auth === null) {
        author = 'Anonymous'; 
    }
    // Dinamicki prikaz za citat i ime autora
    text.innerHTML = quote;
    author.innerHTML = `~ ${auth}`;
    // Tweet za citat
    tweetBtn.href = `https://twitter.com/intent/tweet?text= ${quote} ~ ${auth}`;
};
// Poziv asinhrone metode getNewQuote klikom na dugme
nextBtn.addEventListener('click', getNewQuote);
