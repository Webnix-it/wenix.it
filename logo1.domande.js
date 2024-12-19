function scegliSocial() {
    document.getElementById('bordo1').style.display = 'none';
    document.getElementById('socialChoice').style.display = 'block';
    document.getElementById('testo1').innerText = 'Quale social usi per la tua Attività?';
}

function domandaAlternativa() {
    document.getElementById('bordo1').style.display = 'none';
    document.getElementById('domandaSito').style.display = 'block'; // Mostra la nuova domanda
    document.getElementById('testo1').innerText = 'Hai un sito web?'; // Modifica il testo
}

document.getElementById('bottone1').addEventListener('click', scegliSocial);
document.getElementById('bottone2').addEventListener('click', domandaAlternativa);
document.getElementById('bottoneInstagram').addEventListener('click', apriInstagram);
document.getElementById('bottoneFacebook').addEventListener('click', apriFacebook);

// Gestisci le risposte alla domanda "Hai un sito web?"
document.getElementById('bottoneSitoSi').addEventListener('click', function() {
    alert("Hai risposto: Sì, hai un sito web.");
    // Puoi aggiungere ulteriori azioni qui
});

document.getElementById('bottoneSitoNo').addEventListener('click', function() {
    alert("Hai risposto: No, non hai un sito web.");
    // Puoi aggiungere ulteriori azioni qui
});

document.getElementById('inviaRisposta').addEventListener('click', function() {
    const risposta = document.getElementById('rispostaAlternativa').value;
    alert(`Hai risposto: ${risposta}`);
});

function apriInstagram() {
    window.location.href = 'sitowebpersonlinsta.html';
}

function apriFacebook() {
    window.location.href = 'sitowebpersonlfacebook.html';
}
