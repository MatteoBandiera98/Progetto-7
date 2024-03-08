document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZDk2MDJkN2IxMTAwMTkwZTZkZTQiLCJpYXQiOjE3MDk4OTYxMjcsImV4cCI6MTcxMTEwNTcyN30.6JoS5h08iZASbUomRGLUffPPDNP7LVfNtSd9HjRXpQM';

    // Funzione per creare un nuovo prodotto
    const creaProdotto = async (prodotto) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(prodotto)
            });

            if (!response.ok) {
                throw new Error('Errore nella creazione del prodotto: ' + response.statusText);
            }

            const data = await response.json();
            console.log('Prodotto creato con successo:', data);
            return data;
        } catch (error) {
            console.error('Si è verificato un errore durante la creazione del prodotto:', error);
        }
    };

    // Funzione per gestire il submit del form
    const handleSubmit = async (event) => {
        event.preventDefault(); 

        
        const nomeProdotto = document.getElementById('nomeProdotto').value;
        const brand = document.getElementById('brand').value;
        const imageUrl = document.getElementById('imageUrl').value;
        const description = document.getElementById('description').value;
        const prezzo = document.getElementById('prezzo').value;

        
        const prodotto = {
            name: nomeProdotto,
            brand: brand,
            imageUrl: imageUrl,
            description: description,
            price: prezzo
        };

        
        await creaProdotto(prodotto);

        // Resetta il form
        event.target.reset();
    };

    
    document.getElementById('modifica-prodotto-form').addEventListener('submit', handleSubmit);
});


