// Inizializza il passaggio attuale
let currentStep = 1;

// Funzione per passare al passo successivo
function nextStep(step) {
    const currentDiv = document.getElementById(`step${currentStep}`);

    // Verifica se il passo attuale è compilato correttamente
    if (!validateStep(currentStep)) {
        alert("Per favore, compila tutti i campi obbligatori.");
        return;
    }

    // Nascondi il passo attuale
    currentDiv.style.display = 'none';

    // Incrementa il passo attuale
    currentStep = step + 1;

    // Mostra il nuovo passo o il riepilogo
    if (currentStep <= 9) {
        document.getElementById(`step${currentStep}`).style.display = 'block';
    } else {
        showSummary();
    }
}

// Funzione per validare il passo corrente
function validateStep(step) {
    const inputs = document.querySelectorAll(`#step${step} input[required], #step${step} textarea[required]`);
    for (const input of inputs) {
        if (!input.value.trim()) {
            return false; // Ritorna false se un campo obbligatorio è vuoto
        }
    }
    return true; // Ritorna true se tutti i campi obbligatori sono compilati
}

// Funzione per mostrare il riepilogo delle risposte
function showSummary() {
    document.getElementById('form').style.display = 'none'; // Nasconde il modulo
    document.getElementById('summary').style.display = 'block'; // Mostra il riepilogo

    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = ''; // Pulire il riepilogo precedente

    // Itera su ogni step per ottenere domande e risposte
    for (let i = 1; i <= 9; i++) {
        const stepDiv = document.getElementById(`step${i}`);
        const question = stepDiv.querySelector('p').innerText; // Trova la domanda
        const input = stepDiv.querySelector('input, textarea'); // Trova l'input

        // Caso speciale per la domanda del passo 2 (conferma della gestione dei costi di hosting e dominio)
        if (i === 2) {
            summaryContent.innerHTML += `<p><strong>${question}</strong> Sì, confermo di aver letto.</p>`;
        } 
        // Per gli altri passi, verifica che l'input esista e sia compilato
        else if (input && input.value.trim() !== '') {
            const answer = input.value;
            summaryContent.innerHTML += `<p><strong>${question}</strong> ${answer}</p>`;
        }
    }
}

// Funzione per modificare le risposte
function editResponses() {
    document.getElementById('summary').style.display = 'none';
    document.getElementById('form').style.display = 'block';
    currentStep = 1; // Ripristina il passo a 1
    document.getElementById(`step${currentStep}`).style.display = 'block'; // Mostra il primo passo
}

// Funzione per inviare il form e reindirizzare alla pagina grazie.html
function submitForm() {
    // Configura EmailJS con la chiave pubblica
    emailjs.init("ncCVMSvwgYoXtlD0x");

    // Raccogli le risposte dal modulo
    const formData = new FormData(document.getElementById("form"));
    const emailData = {};
    formData.forEach((value, key) => {
        emailData[key] = value;
    });

    // Aggiungi il riepilogo al messaggio email
    let summaryContent = "";
    for (let i = 1; i <= 9; i++) {
        const stepDiv = document.getElementById(`step${i}`);
        const question = stepDiv.querySelector("p").innerText; // Testo della domanda
        const input = stepDiv.querySelector("input, textarea"); // Campo di input o textarea

        if (i === 2) {
            summaryContent += `<p><strong>${question}</strong> Sì, confermo di aver letto.</p>`;
        } else if (input && input.value.trim() !== "") {
            const answer = input.value;
            summaryContent += `<p><strong>${question}</strong> ${answer}</p>`;
        }
    }

    // Aggiungi il riepilogo al corpo del messaggio
    emailData.summary = summaryContent;

    // Invia l'email con EmailJS
    emailjs
        .send("service_luq6t2s", "template_v974w9f", emailData)
        .then(
            () => {
                alert("Email inviata con successo!");
                window.location.href = "grazie.html"; // Reindirizza alla pagina grazie.html
            },
            (error) => {
                console.error("Errore nell'invio dell'email:", error);
                alert("C'è stato un errore durante l'invio. Riprova più tardi.");
            }
        );
}
