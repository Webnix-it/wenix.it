// Configurazione iniziale
let currentStep = 1;

// Funzione per passare al passaggio successivo
function nextStep(step) {
    // Validazione del passo attuale
    if (!validateStep(currentStep)) {
        return; // Interrompi se la validazione fallisce
    }

    // Nascondi il passo attuale
    document.getElementById(`step${currentStep}`).style.display = 'none';
    currentStep++;

    if (currentStep > 13) {
        showSummary();
    } else {
        document.getElementById(`step${currentStep}`).style.display = 'block';
    }
}

// Funzione per validare i campi di input di un passaggio
function validateStep(step) {
    const inputs = document.querySelectorAll(`#step${step} input, #step${step} select, #step${step} textarea`);
    for (const input of inputs) {
        if (!input.checkValidity()) {
            alert(`Per favore, compila correttamente il campo: ${input.placeholder}`);
            return false; // Se un campo non è valido, restituisci false
        }
    }
    return true; // Tutti i campi sono validi
}

// Funzione per mostrare il riepilogo delle risposte
function showSummary() {
    document.getElementById('form').style.display = 'none';
    document.getElementById('summary').style.display = 'block';

    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = `
        <p><strong>Nome:</strong> ${document.querySelector('input[name="from_name"]').value}</p>
        <p><strong>Email:</strong> ${document.querySelector('input[name="reply_to_email"]').value}</p>
        <p><strong>Link:</strong> ${document.querySelector('input[name="website"]').value}</p>
        <p><strong>Nome Attività:</strong> ${document.querySelector('input[name="business_name"]').value}</p>
        <p><strong>Colori Preferiti:</strong> ${document.querySelector('input[name="colors"]').value}</p>
        <p><strong>Stili di Logo:</strong> ${document.querySelector('input[name="logo_style"]').value}</p>
        <p><strong>Loghi Ispiratori:</strong> ${document.querySelector('input[name="inspiration"]').value}</p>
        <p><strong>Valori:</strong> ${document.querySelector('input[name="values"]').value}</p>
        <p><strong>Simboli o Immagini:</strong> ${document.querySelector('input[name="symbols"]').value}</p>
        <p><strong>Messaggio Principale:</strong> ${document.querySelector('input[name="message"]').value}</p>
        <p><strong>Utilizzo del Logo:</strong> ${document.querySelector('input[name="usage"]').value}</p>
        <p><strong>Categoria:</strong> ${document.querySelector('select[name="scelta"]').value}</p>
        <p><strong>Commenti:</strong> ${document.querySelector('textarea[name="comments"]').value}</p>
    `;
}

// Funzione per modificare le risposte
function editResponses() {
    // Nascondi il riepilogo e mostra di nuovo il modulo
    document.getElementById('summary').style.display = 'none';
    document.getElementById('form').style.display = 'block';
    currentStep = 1; // Reimposta il passo corrente
    for (let i = 1; i <= 13; i++) {
        document.getElementById(`step${i}`).style.display = 'none';
    }
    document.getElementById('step1').style.display = 'block'; // Mostra il primo passo
}

// Funzione per inviare il modulo tramite EmailJS
function submitForm() {
    // Configura EmailJS
    emailjs.init("ncCVMSvwgYoXtlD0x");

    // Raccogli i dati del modulo
    const templateParams = {
        Nome_e_cognome: document.querySelector('input[name="from_name"]').value,
        email_cliente: document.querySelector('input[name="reply_to_email"]').value,
        Link_Instagram: document.querySelector('input[name="website"]').value,
        Nome_Attività: document.querySelector('input[name="business_name"]').value,
        Colori_Preferiti: document.querySelector('input[name="colors"]').value,
        stile_logo: document.querySelector('input[name="logo_style"]').value,
        Loghi_Ispiratori: document.querySelector('input[name="inspiration"]').value,
        valori_da_trasmettere: document.querySelector('input[name="values"]').value,
        simboli_immagini: document.querySelector('input[name="symbols"]').value,
        messaggio: document.querySelector('input[name="message"]').value,
        utilizzo_logo: document.querySelector('input[name="usage"]').value,
        comments: document.querySelector('textarea[name="comments"]').value,
        scelta: document.querySelector('select[name="scelta"]').value,
    };

    // Invia l'email
    emailjs.send("service_luq6t2s", "template_v974w9f", templateParams)
        .then((response) => {
            console.log("Email inviata con successo!", response.status, response.text);
            // Reindirizza l'utente alla pagina di ringraziamento
            window.location.href = 'grazie.html';
        }, (error) => {
            console.error("Errore nell'invio dell'email:", error);
            alert("Si è verificato un errore durante l'invio del modulo. Riprova più tardi.");
        });
}
