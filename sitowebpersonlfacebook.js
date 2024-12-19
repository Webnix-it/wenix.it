let currentStep = 1; // Start at the first step
const totalSteps = 10; // Total number of steps

function nextStep(step) {
    const current = document.getElementById(`step${currentStep}`);

    // Validate current step inputs
    if (!validateStep(currentStep)) {
        return; // Stop here if validation fails
    }

    // Hide current step
    current.style.display = 'none';

    // Move to the next step
    currentStep++;

    // Show the next step or the summary
    if (currentStep <= totalSteps) {
        const next = document.getElementById(`step${currentStep}`);
        next.style.display = 'block';
    } else {
        showSummary(); // Show summary if there are no more steps
    }
}

function validateStep(step) {
    const current = document.getElementById(`step${step}`);
    const inputs = current.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
            input.reportValidity(); // Show error message
        }
    });

    return isValid; // Return true if all inputs are valid
}

function showSummary() {
    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = ''; // Clear previous content

    // Collect and display responses
    for (let i = 1; i <= totalSteps; i++) {
        const inputs = document.querySelectorAll(`#step${i} input, #step${i} select, #step${i} textarea`);
        const labelText = document.querySelector(`#step${i} p`) ? document.querySelector(`#step${i} p`).innerText : "";

        inputs.forEach(input => {
            let response;
            if (input.type === 'checkbox') {
                response = input.checked ? "Sì" : "No"; // Display checked status
            } else if (input.type === 'text' && i === 2) {
                response = "Sì, confermo di aver letto"; // Add specific response for step 2
            } else {
                response = input.value; // Get value for text inputs and selects
            }

            // Add question and response to summary
            summaryContent.innerHTML += `<p><strong>${labelText}</strong>: ${response}</p>`;
        });
    }

    // Add the specific question and answer to the summary
    summaryContent.innerHTML += `<p><strong>Sei a conoscenza che le spese per la gestione dell'hosting e del dominio non sono incluse nel nostro servizio?</strong>: Sì, confermo di aver letto</p>`;

    // Show the summary and hide all steps
    document.getElementById('summary').style.display = 'block';
    for (let i = 1; i <= totalSteps; i++) {
        document.getElementById(`step${i}`).style.display = 'none';
    }
}

function editResponses() {
    // Hide summary and reset to the first step
    document.getElementById('summary').style.display = 'none';
    currentStep = 1; // Reset to the first step
    nextStep(currentStep); // Show first step
}

function submitForm() {
    // Initialize EmailJS with your public key
    emailjs.init("ncCVMSvwgYoXtlD0x");

    // Gather summary content
    const summaryContent = document.getElementById('summaryContent').innerHTML;

    // Prepare the email data
    const emailData = {
        summary: summaryContent
    };

    // Send the email
    emailjs
        .send("service_luq6t2s", "template_v974w9f", emailData)
        .then(() => {
            alert("Email inviata con successo!");
            window.location.href = "grazie.html"; // Redirect after successful email
        })
        .catch(error => {
            console.error("Errore nell'invio dell'email:", error);
            alert("C'è stato un errore durante l'invio. Riprova più tardi.");
        });
}
