document.addEventListener('DOMContentLoaded', async function () {
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id');
    const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZDk2MDJkN2IxMTAwMTkwZTZkZTQiLCJpYXQiOjE3MDk4OTYxMjcsImV4cCI6MTcxMTEwNTcyN30.6JoS5h08iZASbUomRGLUffPPDNP7LVfNtSd9HjRXpQM';

    const optionsGet = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(apiUrl, optionsGet);
        if (!response.ok) {
            throw new Error('Errore durante il recupero dei dettagli del prodotto');
        }
        const prodotto = await response.json();

        const prodottoInfoContainer = document.getElementById('prodotto-info');

        // Creazione degli elementi HTML per visualizzare i dettagli del prodotto
        const immagineProdotto = document.createElement('img');
        immagineProdotto.src = prodotto.imageUrl;
        immagineProdotto.alt = prodotto.name;

        const nomeProdotto = document.createElement('h2');
        nomeProdotto.textContent = prodotto.name;

        const prezzoProdotto = document.createElement('p');
        prezzoProdotto.textContent = `Prezzo: ${prodotto.price} €`;

        const descrizioneProdotto = document.createElement('p');
        descrizioneProdotto.textContent = `Descrizione: ${prodotto.description}`;

        // Aggiunta degli elementi al contenitore dei dettagli del prodotto
        prodottoInfoContainer.appendChild(immagineProdotto);
        prodottoInfoContainer.appendChild(nomeProdotto);
        prodottoInfoContainer.appendChild(prezzoProdotto);
        prodottoInfoContainer.appendChild(descrizioneProdotto);
    } catch (error) {
        console.error('Si è verificato un errore durante il recupero dei dettagli del prodotto:', error);
    }
});
