export const displayQuote = (quote, author) => {
    const text = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const tweetBtn = document.getElementById('tweet');

    // Dinamicki prikaz za citat i ime autora
    text.innerHTML = quote;
    authorElement.innerHTML = author ? `~ ${author}` : 'Anonymous';

    // Postavljanje linka za tweet
    tweetBtn.href = `https://twitter.com/intent/tweet?text=${quote} ~ ${author}`;
};