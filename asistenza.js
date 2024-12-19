// Inizializza EmailJS con la tua Public Key
emailjs.init("ncCVMSvwgYoXtlD0x");

// Aggiungi l'evento per inviare il modulo
document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Blocca l'invio del modulo di default

    // Prepara i dati usando i nuovi nomi dei parametri del template
    const params = {
        nome_cliente: document.querySelector("input[name='from_name']").value, // Nome e Cognome
        emal_cliente: document.querySelector("input[name='reply_to_email']").value, // Email
        scelta: document.querySelector("select[name='scelta']").value, // Categoria
        messaggio: document.querySelector("textarea[name='message']").value // Messaggio
    };

    // Invia i dati utilizzando EmailJS
    emailjs.send("service_luq6t2s", "template_1k9qvh8", params)
        .then(function(response) {
            // Reindirizza alla pagina di ringraziamento
            window.location.href = "grazie.html";
        }, function(error) {
            // Gestisci l'errore
            alert("Errore nell'invio del messaggio: " + error.text);
        });
});
