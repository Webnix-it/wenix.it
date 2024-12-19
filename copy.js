let currentStep = 1;

function nextStep(step) {
    // Validazione del passo attuale
    if (!validateStep(currentStep)) {
        return; // Interrompi se la validazione fallisce
    }

    // Nascondi il passo attuale
    document.getElementById(`step${currentStep}`).style.display = 'none';
    currentStep++;

    if (currentStep > 11) { // Cambiato a 11 per riflettere il numero totale di passaggi
        showSummary();
    } else {
        document.getElementById(`step${currentStep}`).style.display = 'block';
    }
}

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

function showSummary() {
    document.getElementById('form').style.display = 'none';
    document.getElementById('summary').style.display = 'block';

    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = `
        <p>Nome: ${document.querySelector('input[name="from_name"]').value}</p>
        <p>Email: ${document.querySelector('input[name="reply_to_email"]').value}</p>
        <p>Sito Web: ${document.querySelector('input[name="website"]').value}</p>
        <p>Nome Azienda: ${document.querySelector('input[name="business_name"]').value}</p>
        <p>Colori Preferiti: ${document.querySelector('input[name="colors"]').value}</p>
        <p>Stili di Logo: ${document.querySelector('input[name="logo_style"]').value}</p>
        <p>Loghi Ispiratori: ${document.querySelector('input[name="inspiration"]').value}</p>
        <p>Successo del Progetto: ${document.querySelector('input[name="message"]').value}</p>
        <p>Call-to-Action: ${document.querySelector('input[name="usage"]').value}</p>
        <p>Commenti e Richieste: ${document.querySelector('textarea[name="comments"]').value}</p>
        <p>Categoria: ${document.querySelector('select[name="scelta"]').value}</p>
    `;
}

function editResponses() {
    // Nascondi il riepilogo e mostra di nuovo il modulo
    document.getElementById('summary').style.display = 'none';
    document.getElementById('form').style.display = 'block';
    currentStep = 1; // Reimposta il passo corrente
    for (let i = 1; i <= 11; i++) { // Cambiato a 11
        document.getElementById(`step${i}`).style.display = 'none';
    }
    document.getElementById('step1').style.display = 'block'; // Mostra il primo passo
}

function submitForm() {
    // Raccogli tutte le risposte dai campi del modulo
    const formData = {
        from_name: document.querySelector('input[name="from_name"]').value,
        reply_to_email: document.querySelector('input[name="reply_to_email"]').value,
        website: document.querySelector('input[name="website"]').value,
        business_name: document.querySelector('input[name="business_name"]').value,
        colors: document.querySelector('input[name="colors"]').value,
        logo_style: document.querySelector('input[name="logo_style"]').value,
        inspiration: document.querySelector('input[name="inspiration"]').value,
        message: document.querySelector('input[name="message"]').value,
        usage: document.querySelector('input[name="usage"]').value,
        comments: document.querySelector('textarea[name="comments"]').value,
        scelta: document.querySelector('select[name="scelta"]').value
    };

    // Crea una stringa di riepilogo
    let summaryText = `
        Nome: ${formData.from_name}
        Email: ${formData.reply_to_email}
        Sito Web: ${formData.website}
        Nome Azienda: ${formData.business_name}
        Colori Preferiti: ${formData.colors}
        Stili di Logo: ${formData.logo_style}
        Loghi Ispiratori: ${formData.inspiration}
        Successo del Progetto: ${formData.message}
        Call-to-Action: ${formData.usage}
        Commenti e Richieste: ${formData.comments}
        Categoria: ${formData.scelta}
    `;

    // Invia tutte le risposte tramite EmailJS
    emailjs.send("service_luq6t2s", "template_v974w9f", {
        from_name: formData.from_name,
        reply_to_email: formData.reply_to_email,
        website: formData.website,
        business_name: formData.business_name,
        colors: formData.colors,
        logo_style: formData.logo_style,
        inspiration: formData.inspiration,
        message: formData.message,
        usage: formData.usage,
        comments: formData.comments,
        scelta: formData.scelta,
        summary: summaryText // Invia anche il riepilogo come campo
    }).then(function(response) {
        console.log("Email inviata con successo!", response);
        window.location.href = 'grazie.html'; // Redirect alla pagina di ringraziamento
    }).catch(function(error) {
        console.error("Errore durante l'invio dell'email:", error);
        alert("Errore durante l'invio dell'email. Riprova più tardi.");
    });
}

// Inizializza EmailJS con la tua chiave pubblica
emailjs.init("ncCVMSvwgYoXtlD0x");
