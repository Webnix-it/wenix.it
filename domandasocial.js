function scegliSocial() {
    document.getElementById('bordo1').style.display = 'none'; // Nascondi le opzioni Sì e No
    document.getElementById('socialChoice').style.display = 'block'; // Mostra le scelte dei social
    document.getElementById('testo1').innerText = 'Quale social usi per la tua Attività ?'; // Cambia il titolo
}

function apriInstagram() {
    window.location.href = 'sitowebpersonlinsta.html'; // Reindirizza a sitoweb.html
}

function apriFacebook() {
    window.location.href = 'sitowebpersonlfacebook.html'; // Reindirizza a sitoweb.html

}
