document.addEventListener('DOMContentLoaded', function () {
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${id}`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZDk2MDJkN2IxMTAwMTkwZTZkZTQiLCJpYXQiOjE3MDk4OTYxMjcsImV4cCI6MTcxMTEwNTcyN30.6JoS5h08iZASbUomRGLUffPPDNP7LVfNtSd9HjRXpQM';

    // Funzione per ottenere i dettagli del prodotto
    const getDettagliProdotto = async () => {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Errore nel caricamento dei dettagli del prodotto');
            }
            const prodotto = await response.json();
            return prodotto;
        } catch (error) {
            console.error(error);
        }
    };

    // Funzione per popolare il form con i dettagli del prodotto
    const popolaForm = (prodotto) => {
        document.getElementById('nomeProdotto').value = prodotto.name;
        document.getElementById('brand').value = prodotto.brand;
        document.getElementById('imageUrl').value = prodotto.imageUrl;
        document.getElementById('description').value = prodotto.description;
        document.getElementById('prezzo').value = prodotto.prezzo;
    };

    // Funzione per gestire il submit del form
    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const formData = new FormData(document.getElementById('modifica-prodotto-form'));
        const modificheProdotto = Object.fromEntries(formData.entries());
       
        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(modificheProdotto)
            });
            if (!response.ok) {
                throw new Error('Errore durante il salvataggio delle modifiche');
            }
            console.log('Modifiche salvate con successo');
        } catch (error) {
            console.error(error);
        }
    };

    // Carica i dettagli del prodotto e popola il form all'avvio
    getDettagliProdotto()
        .then(prodotto => {
            popolaForm(prodotto);
        })
        .catch(error => {
            console.error(error);
        });

    
    document.getElementById('modifica-prodotto-form').addEventListener('submit', handleSubmit);
});

