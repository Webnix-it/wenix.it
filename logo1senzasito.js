// Inizializzazione di EmailJS con la Public Key
(function() {
    emailjs.init("ncCVMSvwgYoXtlD0x"); // La tua Public Key di EmailJS
})();

let currentStep = 1;  // Passo iniziale

// Funzione per passare al passo successivo
function nextStep(step) {
    // Validazione del passo attuale
    if (!validateStep(currentStep)) {
        return; // Interrompi se la validazione fallisce
    }

    // Nascondi il passo attuale
    document.getElementById(`step${currentStep}`).style.display = 'none';
    currentStep++;

    if (currentStep > 12) {
        showSummary(); // Mostra il riepilogo quando siamo all'ultimo passo
    } else {
        document.getElementById(`step${currentStep}`).style.display = 'block';
    }
}

// Funzione di validazione del passo attuale
function validateStep(step) {
    const inputs = document.querySelectorAll(`#step${step} input, #step${step} select`);
    for (const input of inputs) {
        if (!input.checkValidity()) {
            alert(`Per favore, compila correttamente il campo: ${input.placeholder}`);
            return false; // Se un campo non è valido, restituisci false
        }
    }
    return true; // Tutti i campi sono validi
}

// Funzione per mostrare il riepilogo
function showSummary() {
    document.getElementById('form').style.display = 'none';
    document.getElementById('summary').style.display = 'block';

    // Raccogli i dati e crea il riepilogo
    const summaryContent = document.getElementById('summaryContent');
    const formData = {
        nome: document.querySelector('input[name="from_name"]').value,
        email: document.querySelector('input[name="reply_to_email"]').value,
        categoria: document.querySelector('select[name="scelta"]').value,
        nomeAzienda: document.querySelector('input[name="business_name"]').value,
        colori: document.querySelector('input[name="colors"]').value,
        stileLogo: document.querySelector('input[name="logo_style"]').value,
        loghiIspiratori: document.querySelector('input[name="inspiration"]').value,
        valori: document.querySelector('input[name="values"]').value,
        simboli: document.querySelector('input[name="symbols"]').value,
        messaggio: document.querySelector('input[name="message"]').value,
        utilizzo: document.querySelector('input[name="usage"]').value,
        commenti: document.querySelector('textarea[name="comments"]').value
    };

    // Creiamo il riepilogo in formato HTML
    summaryContent.innerHTML = `
        <h2>Riepilogo delle risposte:</h2>
        <p><strong>Nome:</strong> ${formData.nome}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Categoria:</strong> ${formData.categoria}</p>
        <p><strong>Nome Azienda:</strong> ${formData.nomeAzienda}</p>
        <p><strong>Colori Preferiti:</strong> ${formData.colori}</p>
        <p><strong>Stili di Logo:</strong> ${formData.stileLogo}</p>
        <p><strong>Loghi Ispiratori:</strong> ${formData.loghiIspiratori}</p>
        <p><strong>Valori da Trasmettere:</strong> ${formData.valori}</p>
        <p><strong>Simboli o Immagini:</strong> ${formData.simboli}</p>
        <p><strong>Messaggio Principale:</strong> ${formData.messaggio}</p>
        <p><strong>Utilizzo Principale:</strong> ${formData.utilizzo}</p>
        <p><strong>Commenti e Richieste:</strong> ${formData.commenti}</p>
    `;
}

// Funzione per modificare le risposte
function editResponses() {
    // Nascondi il riepilogo e mostra di nuovo il modulo
    document.getElementById('summary').style.display = 'none';
    document.getElementById('form').style.display = 'block';
    currentStep = 1; // Reimposta il passo corrente
    for (let i = 1; i <= 12; i++) {
        document.getElementById(`step${i}`).style.display = 'none';
    }
    document.getElementById('step1').style.display = 'block'; // Mostra il primo passo
}

// Funzione per inviare il modulo tramite EmailJS
function submitForm() {
    // Raccogliere i dati dal modulo
    const formData = {
        nome: document.querySelector('input[name="from_name"]').value,
        email: document.querySelector('input[name="reply_to_email"]').value,
        categoria: document.querySelector('select[name="scelta"]').value,
        nomeAzienda: document.querySelector('input[name="business_name"]').value,
        colori: document.querySelector('input[name="colors"]').value,
        stileLogo: document.querySelector('input[name="logo_style"]').value,
        loghiIspiratori: document.querySelector('input[name="inspiration"]').value,
        valori: document.querySelector('input[name="values"]').value,
        simboli: document.querySelector('input[name="symbols"]').value,
        messaggio: document.querySelector('input[name="message"]').value,
        utilizzo: document.querySelector('input[name="usage"]').value,
        commenti: document.querySelector('textarea[name="comments"]').value
    };

    // Creiamo il riepilogo completo in formato HTML
    const summary = `
        <h2>Riepilogo delle risposte:</h2>
        <p><strong>Nome:</strong> ${formData.nome}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Categoria:</strong> ${formData.categoria}</p>
        <p><strong>Nome Azienda:</strong> ${formData.nomeAzienda}</p>
        <p><strong>Colori Preferiti:</strong> ${formData.colori}</p>
        <p><strong>Stili di Logo:</strong> ${formData.stileLogo}</p>
        <p><strong>Loghi Ispiratori:</strong> ${formData.loghiIspiratori}</p>
        <p><strong>Valori da Trasmettere:</strong> ${formData.valori}</p>
        <p><strong>Simboli o Immagini:</strong> ${formData.simboli}</p>
        <p><strong>Messaggio Principale:</strong> ${formData.messaggio}</p>
        <p><strong>Utilizzo Principale:</strong> ${formData.utilizzo}</p>
        <p><strong>Commenti e Richieste:</strong> ${formData.commenti}</p>
    `;

    // Usa EmailJS per inviare il modulo via email
    emailjs.send('service_luq6t2s', 'template_1k9qvh8', {
        from_name: formData.nome,
        reply_to_email: formData.email,
        summary: summary // Invia tutto il riepilogo come corpo dell'email
    }).then(function(response) {
        console.log("Successo nell'invio!", response);
        window.location.href = 'grazie.html';  // Reindirizza a una pagina di conferma
    }, function(error) {
        console.error("Errore nell'invio:", error);
        alert("Si è verificato un errore durante l'invio del modulo. Riprova.");
    });
}
