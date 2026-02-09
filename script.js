

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzdkR37pMAJrSWnYsN2TeZGyeQaC8wCzDi2wqAXy1lPDCsvuG6HywoGKTyF6yAQ3H5IOQ/exec';

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// ===== MOBILE MENU =====
const mobileBtn = document.getElementById('mobile-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileBtn.querySelector('i').classList.remove('fa-times');
        mobileBtn.querySelector('i').classList.add('fa-bars');
    });
});

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
    const eventDate = new Date('February 15, 2026 08:30:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== PROGRAMME TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const programmeDays = document.querySelectorAll('.programme-day');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all buttons
        tabBtns.forEach(b => {
            b.classList.remove('bg-accent', 'text-navy-900');
            b.classList.add('text-gray-400');
        });
        
        // Add active to clicked button
        btn.classList.add('bg-accent', 'text-navy-900');
        btn.classList.remove('text-gray-400');
        
        // Hide all days
        programmeDays.forEach(day => {
            day.classList.add('hidden');
        });
        
        // Show selected day
        const dayNum = btn.getAttribute('data-day');
        const selectedDay = document.getElementById(`day-${dayNum}`);
        selectedDay.classList.remove('hidden');
        
        // Trigger timeline animation
        animateTimeline(selectedDay);
    });
});

// ===== TIMELINE ANIMATION =====
function animateTimeline(container) {
    const items = container.querySelectorAll('.timeline-item');
    const dots = container.querySelectorAll('.timeline-dot');
    
    // Reset
    items.forEach(item => {
        item.classList.remove('visible');
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });
    
    dots.forEach(dot => {
        dot.classList.remove('visible');
        dot.style.transform = 'scale(0)';
    });
    
    // Animate
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.classList.add('visible');
        }, index * 150);
    });
    
    dots.forEach((dot, index) => {
        setTimeout(() => {
            dot.style.transition = 'transform 0.4s ease';
            dot.style.transform = 'scale(1)';
            dot.classList.add('visible');
        }, index * 150 + 100);
    });
}

// Initial animation for day 1
document.addEventListener('DOMContentLoaded', () => {
    const day1 = document.getElementById('day-1');
    if (day1) {
        setTimeout(() => {
            animateTimeline(day1);
        }, 500);
    }
});

// Intersection Observer for timeline
const programmeSection = document.getElementById('programme');
if (programmeSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeDay = document.querySelector('.programme-day:not(.hidden)');
                if (activeDay) {
                    animateTimeline(activeDay);
                }
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(programmeSection);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== MODAL FUNCTIONS =====
function showModal(message) {
    const modal = document.getElementById('success-modal');
    const modalContent = document.getElementById('modal-content');
    const modalMessage = document.getElementById('modal-message');
    
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    const modalContent = document.getElementById('modal-content');
    
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}

// Close modal on backdrop click
document.getElementById('success-modal').addEventListener('click', (e) => {
    if (e.target.id === 'success-modal') {
        closeModal();
    }
});

// ===== FORM SUBMISSION - ENTREPRISES =====
const standForm = document.getElementById('stand-form');

standForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-entreprise');
    const originalContent = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Envoi en cours...</span>';
    
    // Collect form data
    const formData = {
        type: 'entreprise',
        timestamp: new Date().toLocaleString('fr-FR'),
        entreprise: document.getElementById('entreprise').value,
        secteur: document.getElementById('secteur').value,
        representant: document.getElementById('representant').value,
        fonction: document.getElementById('fonction').value,
        email: document.getElementById('email-entreprise').value,
        telephone: document.getElementById('telephone-entreprise').value,
        participation: document.querySelector('input[name="participation"]:checked')?.value || '',
        cvFormat: document.querySelector('input[name="cv_format"]:checked')?.value || '',
        message: document.getElementById('message-entreprise').value
    };
    
  try {
        // Envoi direct sans condition bloquante
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(formData)
        });
        
        console.log('Entreprise Form Data envoyé:', formData);
        standForm.reset();
        showModal('Votre demande de stand a été enregistrée avec succès.');
        
    } catch (error) {
        console.error('Error:', error);
        showModal('Une erreur est survenue.');
    
    } finally {
        // Restore button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }
});

// ===== FORM SUBMISSION - ÉTUDIANTS =====
const studentForm = document.getElementById('studentForm'); // Changed ID

if (studentForm) {
    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!validateStudentForm(studentForm)) {
            showMessage('Veuillez corriger les erreurs dans le formulaire.', 'error');
            return;
        }
        
        // // Check CV (either file upload or link required)
        // const cvFile = selectedCVFile;
        // const cvLink = document.getElementById('cvLink')?.value.trim() || '';
        
        // if (!cvFile && !cvLink) {
        //     showMessage('Veuillez télécharger votre CV ou fournir un lien vers votre CV.', 'error');
        //     document.getElementById('cv')?.focus();
        //     return;
        // }
        
        // ✅ NOUVEAU CODE - CV OPTIONNEL
        // Get CV data (optional)
        const cvFile = selectedCVFile;
        const cvLink = document.getElementById('cvLink')?.value.trim() || '';



        const submitBtn = document.getElementById('submitBtn');
        const submitBtnText = document.getElementById('submitBtnText');
        const originalContent = submitBtnText.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtnText.textContent = 'Envoi en cours...';
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
        
        try {
            // Prepare form data
            const formData = await prepareStudentFormData(studentForm, cvFile, cvLink);
            
            // Submit to Google Apps Script
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(formData)
            });
            
            console.log('Student Form Data envoyé:', formData);
            
            // Success
            showMessage('✅ Inscription réussie! Merci pour votre participation. Vous recevrez une confirmation par email.', 'success');
            studentForm.reset();
            removeCV();
            
            // Also show modal for consistency
            showModal('Votre inscription a été enregistrée avec succès.');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } catch (error) {
            console.error('Error:', error);
            showMessage('❌ Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter.', 'error');
            showModal('Une erreur est survenue.');
        } finally {
            // Restore button
            submitBtn.disabled = false;
            submitBtnText.textContent = originalContent;
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        }
    });
}
// ===== CV UPLOAD HANDLING =====
let selectedCVFile = null;

// Initialize CV upload when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const cvInput = document.getElementById('cv');
    const removeCvBtn = document.getElementById('removeCv');
    
    if (cvInput) {
        cvInput.addEventListener('change', handleCVUpload);
    }
    
    if (removeCvBtn) {
        removeCvBtn.addEventListener('click', removeCV);
    }
    
    // Setup real-time validation
    setupStudentFormValidation();
});

function handleCVUpload(e) {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    if (file.type !== 'application/pdf') {
        showMessage('Erreur: Seuls les fichiers PDF sont acceptés.', 'error');
        e.target.value = '';
        return;
    }
    
    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        showMessage(
            `Erreur: Le fichier est trop volumineux (${(file.size / 1024 / 1024).toFixed(2)} MB). Maximum: 5 MB. Veuillez utiliser l'Option 2 (lien vers CV) à la place.`,
            'error'
        );
        e.target.value = '';
        return;
    }
    
    // Store file
    selectedCVFile = file;
    
    // Show file name
    const fileNameDisplay = document.getElementById('cvFileName');
    const fileNameText = document.getElementById('cvFileNameText');
    
    if (fileNameDisplay && fileNameText) {
        fileNameText.textContent = `${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
        fileNameDisplay.classList.remove('hidden');
    }
    
    // Clear CV link if file is uploaded
    const cvLinkInput = document.getElementById('cvLink');
    if (cvLinkInput) {
        cvLinkInput.value = '';
    }
}

function removeCV() {
    selectedCVFile = null;
    const cvInput = document.getElementById('cv');
    const fileNameDisplay = document.getElementById('cvFileName');
    
    if (cvInput) cvInput.value = '';
    if (fileNameDisplay) fileNameDisplay.classList.add('hidden');
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// ===== PREPARE STUDENT FORM DATA =====
async function prepareStudentFormData(form, cvFile, cvLink) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 PRÉPARATION DES DONNÉES ÉTUDIANTES');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const formData = {
        type: 'etudiant',
        timestamp: new Date().toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        nom: form.nom.value.trim(),
        prenom: form.prenom.value.trim(),
        email: form.email.value.trim(),
        telephone: form.telephone.value.trim(),
        niveau: form.niveau.value,
                filiere: form.filiere.value === 'Autre' 
            ? (form.autreFiliere?.value.trim() || 'Autre') 
            : form.filiere.value,
        linkedin: form.linkedin.value.trim(),
        github: form.github?.value.trim() || '',
        portfolio: form.portfolio?.value.trim() || '',
        domaines: form.domaines?.value.trim() || '',
        commentaires: form.commentaires?.value.trim() || '',
        consentement: form.consentement.checked ? 'Oui' : 'Non',
        matricule: form.matricule.value.trim(),
               universite: form.universite.value === 'Autre' 
            ? (form.autreUniversite?.value.trim() || 'Autre') 
            : form.universite.value,
        carteNationale: form.carteNationale.value.trim(),
    };
    
    console.log('📝 Données de base collectées:');
    console.table(formData);
    
    // Handle Type de Poste (checkboxes)
   // Handle Type de Poste (text input)
formData.typePoste = form.typePoste?.value.trim() || '';
    console.log('💼 Type de poste:', formData.typePoste);
    
    // Handle CV Upload (Option 1: File)
    if (cvFile) {
        try {
            console.log('📄 Conversion du CV en base64...');
            const base64CV = await fileToBase64(cvFile);
            formData.cvData = base64CV;
            formData.cvFileName = cvFile.name;
            formData.cvUrl = ''; // Will be generated by Google Apps Script
            console.log('✅ CV converti:', cvFile.name, '(' + (cvFile.size / 1024).toFixed(2) + ' KB)');
        } catch (error) {
            console.error('❌ Erreur conversion CV:', error);
            throw new Error('Erreur lors du traitement du CV');
        }
    } else {
        formData.cvData = '';
        formData.cvFileName = '';
        console.log('⚠️ Pas de fichier CV uploadé');
    }
    
    // Handle CV Link (Option 2: Link for files > 5MB)
    if (cvLink && !cvFile) {
        formData.cvUrl = cvLink;
        formData.cvData = '';
        formData.cvFileName = '';
        console.log('🔗 Lien CV fourni:', cvLink);
    } else if (!cvFile && !cvLink) {
        formData.cvUrl = '';
        console.log('⚠️ Pas de lien CV fourni');
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📦 DONNÉES FINALES À ENVOYER:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Type:', formData.type);
    console.log('Timestamp:', formData.timestamp);
    console.log('Nom:', formData.nom);
    console.log('Prénom:', formData.prenom);
    console.log('Email:', formData.email);
    console.log('Téléphone:', formData.telephone);
    console.log('CV Data:', formData.cvData ? 'BASE64 (' + (formData.cvData.length) + ' chars)' : 'VIDE');
    console.log('CV FileName:', formData.cvFileName || 'VIDE');
    console.log('CV URL:', formData.cvUrl || 'VIDE');
    console.log('LinkedIn:', formData.linkedin);
    console.log('Niveau:', formData.niveau);
    console.log('Filière:', formData.filiere);
    console.log('GitHub:', formData.github || 'VIDE');
    console.log('Portfolio:', formData.portfolio || 'VIDE');
    console.log('Type Poste:', formData.typePoste || 'VIDE');
    console.log('Domaines:', formData.domaines || 'VIDE');
    console.log('Commentaires:', formData.commentaires || 'VIDE');
    console.log('Consentement:', formData.consentement);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    return formData;
}

// ===== STUDENT FORM VALIDATION =====
function setupStudentFormValidation() {
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this.value, this);
        });
    }
    
    // Phone validation
    const phoneInput = document.getElementById('telephone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 10);
        });
        phoneInput.addEventListener('blur', function() {
            validatePhone(this.value, this);
        });
    }
        // Carte Nationale validation
    const carteInput = document.getElementById('carteNationale');
    if (carteInput) {
        carteInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 18);
        });
        carteInput.addEventListener('blur', function() {
            validateCarteNationale(this.value, this);
        });
    }
    // LinkedIn validation
    const linkedinInput = document.getElementById('linkedin');
    if (linkedinInput) {
        linkedinInput.addEventListener('blur', function() {
            validateLinkedIn(this.value, this);
        });
    }
    
    // GitHub validation
    const githubInput = document.getElementById('github');
    if (githubInput) {
        githubInput.addEventListener('blur', function() {
            if (this.value) validateGitHub(this.value, this);
        });
    }
    
    // Portfolio validation
    const portfolioInput = document.getElementById('portfolio');
    if (portfolioInput) {
        portfolioInput.addEventListener('blur', function() {
            if (this.value) validateURL(this.value, this);
        });
    }
    
    // CV Link validation
    const cvLinkInput = document.getElementById('cvLink');
    if (cvLinkInput) {
        cvLinkInput.addEventListener('blur', function() {
            if (this.value) validateURL(this.value, this);
        });
    }
    
    // Comments character limit
    const commentsInput = document.getElementById('commentaires');
    if (commentsInput) {
        commentsInput.addEventListener('input', function() {
            if (this.value.length > 500) {
                this.value = this.value.substring(0, 500);
            }
        });
    }
}

function validateStudentForm(form) {
    let isValid = true;
    
    // Validate email
    const emailInput = form.email;
    if (!validateEmail(emailInput.value, emailInput)) {
        isValid = false;
    }
    
    // Validate phone
    const phoneInput = form.telephone;
    if (!validatePhone(phoneInput.value, phoneInput)) {
        isValid = false;
    }
    
        // Validate Carte Nationale
    const carteInput = form.carteNationale;
    if (!validateCarteNationale(carteInput.value, carteInput)) {
        isValid = false;
    }
    // Validate LinkedIn
    const linkedinInput = form.linkedin;
    if (!validateLinkedIn(linkedinInput.value, linkedinInput)) {
        isValid = false;
    }
    
    // Validate GitHub (if provided)
    const githubInput = form.github;
    if (githubInput && githubInput.value && !validateGitHub(githubInput.value, githubInput)) {
        isValid = false;
    }
    
    // Validate Portfolio (if provided)
    const portfolioInput = form.portfolio;
    if (portfolioInput && portfolioInput.value && !validateURL(portfolioInput.value, portfolioInput)) {
        isValid = false;
    }
    
    // Validate CV Link (if provided)
    const cvLinkInput = form.cvLink;
    if (cvLinkInput && cvLinkInput.value && !validateURL(cvLinkInput.value, cvLinkInput)) {
        isValid = false;
    }
    
    // Validate consent
    const consentInput = form.consentement;
    if (!consentInput.checked) {
        showMessage('Vous devez accepter le partage de vos données avec les entreprises partenaires.', 'error');
        consentInput.focus();
        isValid = false;
    }
    
    return isValid;
}

function validateEmail(email, inputElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!isValid && email) {
        showFieldError(inputElement, 'Format email invalide');
        return false;
    } else {
        clearFieldError(inputElement);
        return true;
    }
}

function validatePhone(phone, inputElement) {
    const phoneRegex = /^[0-9]{10}$/;
    const isValid = phoneRegex.test(phone);
    
    if (!isValid && phone) {
        showFieldError(inputElement, 'Le numéro doit contenir 10 chiffres (ex: 0555123456)');
        return false;
    } else {
        clearFieldError(inputElement);
        return true;
    }
}
function validateCarteNationale(carte, inputElement) {
    const carteRegex = /^[0-9]{18}$/;
    const isValid = carteRegex.test(carte);
    
    if (!isValid && carte) {
        showFieldError(inputElement, 'Le numéro de carte nationale doit contenir exactement 18 chiffres');
        return false;
    } else {
        clearFieldError(inputElement);
        return true;
    }
}

function validateLinkedIn(url, inputElement) {
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
    const isValid = linkedinRegex.test(url);
    
    if (!isValid && url) {
        showFieldError(inputElement, 'Format LinkedIn invalide. Ex: https://linkedin.com/in/votre-profil');
        return false;
    } else {
        clearFieldError(inputElement);
        return true;
    }
}

function validateGitHub(url, inputElement) {
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/?$/i;
    const isValid = githubRegex.test(url);
    
    if (!isValid && url) {
        showFieldError(inputElement, 'Format GitHub invalide. Ex: https://github.com/votre-profil');
        return false;
    } else {
        clearFieldError(inputElement);
        return true;
    }
}

function validateURL(url, inputElement) {
    try {
        new URL(url);
        clearFieldError(inputElement);
        return true;
    } catch (e) {
        showFieldError(inputElement, 'URL invalide');
        return false;
    }
}

function showFieldError(inputElement, message) {
    inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
    inputElement.classList.remove('border-gray-300', 'focus:ring-accent', 'focus:border-accent');
    
    // Remove existing error message
    const existingError = inputElement.parentElement.querySelector('.field-error');
    if (existingError) existingError.remove();
    
    // Add error message
    const errorMsg = document.createElement('p');
    errorMsg.className = 'field-error text-xs text-red-500 mt-1';
    errorMsg.textContent = message;
    inputElement.parentElement.appendChild(errorMsg);
}

function clearFieldError(inputElement) {
    inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
    inputElement.classList.add('border-gray-300', 'focus:ring-accent', 'focus:border-accent');
    
    const errorMsg = inputElement.parentElement.querySelector('.field-error');
    if (errorMsg) errorMsg.remove();
}

// ===== SHOW MESSAGE FUNCTION (for inline messages) =====
function showMessage(message, type = 'success') {
    const messageDiv = document.getElementById('formMessage');
    
    if (!messageDiv) {
        // Fallback to modal if formMessage div doesn't exist
        showModal(message);
        return;
    }
    
    messageDiv.className = 'mt-4 p-4 rounded-lg';
    
    if (type === 'success') {
        messageDiv.classList.add('bg-green-100', 'border', 'border-green-400', 'text-green-700');
        messageDiv.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>${message}</span>
            </div>
        `;
    } else {
        messageDiv.classList.add('bg-red-100', 'border', 'border-red-400', 'text-red-700');
        messageDiv.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <span>${message}</span>
            </div>
        `;
    }
    
    messageDiv.classList.remove('hidden');
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide after 8 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 8000);
    }
}
// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to cards
document.querySelectorAll('.card-lift').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(card);
});

// ===== TOGGLE AUTRE FILIÈRE =====
function toggleAutreFiliere() {
    const filiereSelect = document.getElementById('filiere');
    const autreDiv = document.getElementById('autreFilierDiv');
    const autreInput = document.getElementById('autreFiliere');
    
    if (filiereSelect.value === 'Autre') {
        autreDiv.classList.remove('hidden');
        autreInput.setAttribute('required', 'required');
    } else {
        autreDiv.classList.add('hidden');
        autreInput.removeAttribute('required');
        autreInput.value = ''; // Clear the value when hidden
    }
}

// ===== TOGGLE AUTRE UNIVERSITÉ =====
function toggleAutreUniversite() {
    const universiteSelect = document.getElementById('universite');
    const autreDiv = document.getElementById('autreUniversiteDiv');
    const autreInput = document.getElementById('autreUniversite');
    
    if (universiteSelect.value === 'Autre') {
        autreDiv.classList.remove('hidden');
        autreInput.setAttribute('required', 'required');
    } else {
        autreDiv.classList.add('hidden');
        autreInput.removeAttribute('required');
        autreInput.value = ''; // Clear the value when hidden
    }
}
// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    toggleAutreFiliere();
    toggleAutreUniversite(); // AJOUTER CETTE LIGNE
});
// ===== FADE IN ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.animate-fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '1';
    });
});

console.log('Career Summit 2026 - Website Loaded');


