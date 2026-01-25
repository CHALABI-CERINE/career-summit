// =====================================================
// CAREER SUMMIT 2026 - JavaScript
// =====================================================
// REMINDER: Les données des formulaires seront envoyées 
// vers Google Sheets comme base de données.
// Voir les instructions de configuration ci-dessous.
// =====================================================

// ===== CONFIGURATION GOOGLE SHEETS =====
// Pour connecter les formulaires à Google Sheets:
// 
// 1. Créer un nouveau Google Sheet avec 2 onglets:
//    - "Entreprises" (colonnes: Timestamp, Entreprise, Secteur, Représentant, Fonction, Email, Téléphone, Participation, Format CV, Message)
//    - "Étudiants" (colonnes: Timestamp, Nom, Matricule, Email, Téléphone, Niveau, Filière, Recherche)
//
// 2. Aller dans Extensions > Apps Script
//
// 3. Coller le code Google Apps Script (voir fichier google-apps-script.js)
//
// 4. Déployer comme Web App (Exécuter en tant que: Moi, Accès: Tout le monde)
//
// 5. Copier l'URL du déploiement et la coller ci-dessous:

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyvXNXSHMLu5KU8lIpJMwd6yHcoVV6SHrjMXmvqpEkglFm9oHVeYRmIO33TMZdjEK1VDg/exec';

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
const studentForm = document.getElementById('student-form');

studentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-etudiant');
    const originalContent = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Envoi en cours...</span>';
    
    // Collect recherche checkboxes
    const recherche = [];
    document.querySelectorAll('input[name="recherche"]:checked').forEach(cb => {
        recherche.push(cb.value);
    });
    
    // Collect form data
    const formData = {
        type: 'etudiant',
        timestamp: new Date().toLocaleString('fr-FR'),
        nom: document.getElementById('nom-etudiant').value,
        matricule: document.getElementById('matricule').value,
        email: document.getElementById('email-etudiant').value,
        telephone: document.getElementById('telephone-etudiant').value,
        niveau: document.getElementById('niveau').value,
        filiere: document.getElementById('filiere').value,
        recherche: recherche.join(', ')
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
        
        console.log('Student Form Data envoyé:', formData);
        studentForm.reset();
        showModal('Votre inscription a été enregistrée avec succès.');
        
    } catch (error) {
        console.error('Error:', error);
        showModal('Une erreur est survenue.');
    } finally {
        // Restore button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }
});

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

// ===== FADE IN ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.animate-fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '1';
    });
});

console.log('Career Summit 2026 - Website Loaded');
console.log('REMINDER: Configure Google Sheets URL in GOOGLE_SCRIPT_URL variable');