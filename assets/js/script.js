document.addEventListener('DOMContentLoaded', function () {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZDk2MDJkN2IxMTAwMTkwZTZkZTQiLCJpYXQiOjE3MDk4OTYxMjcsImV4cCI6MTcxMTEwNTcyN30.6JoS5h08iZASbUomRGLUffPPDNP7LVfNtSd9HjRXpQM';

    const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';

    
    const optionsGet = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };



    const renderProdotti = (prodotti) => {
        const prodottiContainer = document.getElementById('prodotti-container');
        prodottiContainer.innerHTML = '';
        prodotti.forEach(prodotto => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-3');
            card.innerHTML = `
                <div class="card">
                    <img src="${prodotto.imageUrl}" class="card-img-top" alt="${prodotto.name}">
                    <div class="card-body">
                        <h5 class="card-title">${prodotto.name}</h5>
                        <p class="card-text">${prodotto.description}</p>
                        <p class="card-text">Prezzo: ${prodotto.price} €</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-primary" onclick="modificaProdotto('${prodotto._id}')">Modifica</button>
                            <button class="btn btn-danger" onclick="cancellaProdotto('${prodotto._id}')">Cancella</button>
                            <button class="btn btn-success" onclick="visualizzaDettagli('${prodotto._id}')">Dettagli</button>
                        </div>
                    </div>
                </div>
            `;
            prodottiContainer.appendChild(card);
        });
    };

   


    fetch(apiUrl, optionsGet)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta API');
            }
            return response.json();
        })
        .then(data => {
            
            renderProdotti(data);
        })
        .catch(error => {
            console.error('Si è verificato un errore durante la richiesta API:', error);
        });



window.cancellaProdotto = async (id) => {
    try {
        
        const cardToRemove = document.querySelector(`.card[data-prodotto-id="${id}"]`);
        if (cardToRemove) {
            cardToRemove.remove();
        }

        // Invia una richiesta DELETE all'API per cancellare il prodotto
        const optionsDelete = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await fetch(`${apiUrl}/${id}`, optionsDelete);
        const data = await response.json(); 

        if (!response.ok) {
            throw new Error(data.message || 'Errore nella cancellazione del prodotto');
        }

        console.log('Prodotto cancellato con successo:', id);
    } catch (error) {
        console.error('Si è verificato un errore durante la cancellazione del prodotto:', error);
    }
};

// Funzione per gestire la modifica di un prodotto
window.modificaProdotto = (id) => {
    
    window.location.href = `index3.html?id=${id}`;
};

window.visualizzaDettagli = (id) => {
    window.location.href = `index4.html?id=${id}`;
};
   

    // Funzione per aggiungere un nuovo prodotto
    const aggiungiProdotto = async (prodotto) => {
        const optionsPost = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(prodotto)
        };

        try {
            const response = await fetch(apiUrl, optionsPost);
            if (!response.ok) {
                throw new Error('Errore nella richiesta API');
            }
            const data = await response.json();
            console.log('Prodotto aggiunto con successo:', data);
            return data;
        } catch (error) {
            console.error('Si è verificato un errore durante l\'aggiunta del prodotto:', error);
        }
    };

    
    const prodotto1 = {
        name: "Laptop",
        brand: "Hp",
        imageUrl: "https://i.dell.com/sites/csimages/Product_Imagery/all/fp-aw-laptops-hero-a-1920x1440-v2.png",
        price: 200,
        description: "Display da 18,3 pollici; FHD (1920 x 1080) a 165Hz 3ms o 360Hz 1ms; 4K (3840x 2160) a 120Hz 4ms\nCPU:  PCIe NVMe a stato liquido"
    };

    
    const prodotto2 = {
        name: "Monitor Full HD",
        brand: "Sony6",
        imageUrl: "https://cdn.idealo.com/folder/Product/202011/2/202011273/s10_produktbild_gross_4/sony-inzone-m3.jpg",
        price: 499,
        description: "Monitor schermo piatto da 18 pollici, next gen"
    };

    const prodotto3 = {
        name: "Ps5",
        brand: "sony",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP1Q0naVo5moktGdSk2zEK6JiMsymikZ8ywg&usqp=CAU",
        price: 500,
        description: "Console Next gen"
    };
    const prodotto4 = {
        name: "airpods",
        brand: "apple",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSwhgd4EtRwxmqyxgfGQGs8yzr83QxShUHcA&usqp=CAU",
        price: 60,
        description: "cuffie next gen"
    };
    const prodotto5 = {
        name: "Mac",
        brand: "applee",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROuVJd7KIwViSpTgmluCn__NUTlrG-_1L10A&usqp=CAU",
        price: 1200,
        description: "pc portatile (può causare svariate crisi)"
    };

      // Aggiunta dei prodotti all'API
    aggiungiProdotto(prodotto1);
    aggiungiProdotto(prodotto2);
    aggiungiProdotto(prodotto3);
    aggiungiProdotto(prodotto4);
    aggiungiProdotto(prodotto5); 
});











  
 
  
