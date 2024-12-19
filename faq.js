const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(faqItem => {
    const question = faqItem.querySelector('.faq-question');  // Seleziona la domanda
    question.addEventListener('click', () => {
        faqItem.classList.toggle('active');  // Aggiungi/rimuovi la classe 'active' quando la domanda viene cliccata
    });
});
