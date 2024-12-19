// Inizializza EmailJS con la tua chiave pubblica
emailjs.init("ncCVMSvwgYoXtlD0x");

// Aggiungi l'event listener per l'invio del modulo
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Previene l'invio del modulo in modo tradizionale

    // Raccogli i dati del modulo
    const formData = {
        from_name: document.querySelector("input[name='from_name']").value, // Nome e cognome
        reply_to_email: document.querySelector("input[name='reply_to_email']").value, // Email
        scelta: document.querySelector("select[name='scelta']").value, // Categoria scelta
        instagram_username: document.querySelector("input[name='instagram_username']").value, // Username Instagram
        facebook_link: document.querySelector("input[name='facebook_link']").value, // Link Pagina Facebook
        ideas: document.querySelector("textarea").value // Idee o commenti aggiuntivi
    };

    // Invio dei dati a EmailJS
    emailjs.send("service_luq6t2s", "template_v974w9f", formData)
        .then(function (response) {
            console.log("SUCCESS", response); // Se il messaggio è stato inviato con successo
            alert("Il modulo è stato inviato con successo!"); // Messaggio di conferma
            window.location.href = 'grazie.html'; // Puoi reindirizzare l'utente alla pagina di conferma
        }, function (error) {
            console.log("FAILED", error); // Se c'è stato un errore
            alert("C'è stato un errore nell'invio del modulo. Per favore riprova."); // Messaggio di errore
        });
});
