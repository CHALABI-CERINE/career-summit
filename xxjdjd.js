// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-navy-900/95', 'nav-blur', 'border-b', 'border-white/5');
    } else {
        navbar. classList.remove('bg-navy-900/95', 'nav-blur', 'border-b', 'border-white/5');
    }
});

// ===== MOBILE MENU =====
const mobileBtn = document.getElementById('mobile-btn');
const mobileMenu = document. getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu. classList.add('hidden');
        mobileBtn.querySelector('i').classList.remove('fa-times');
        mobileBtn. querySelector('i').classList.add('fa-bars');
    });
});

// ===== COUNTDOWN =====
function updateCountdown() {
    const eventDate = new Date('February 14, 2026 08:30:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days. toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
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
        tabBtns. forEach(b => {
            b.classList.remove('bg-accent', 'text-navy-900');
            b.classList.add('text-gray-400');
        });
        
        // Add active to clicked button
        btn.classList. add('bg-accent', 'text-navy-900');
        btn.classList. remove('text-gray-400');
        
        // Hide all days
        programmeDays.forEach(day => {
            day. classList.add('hidden');
            day.classList.remove('active');
        });
        
        // Show selected day
        const dayNum = btn.getAttribute('data-day');
        const selectedDay = document.getElementById(`day-${dayNum}`);
        selectedDay.classList. remove('hidden');
        selectedDay.classList.add('active');
    });
});

// Set initial active state for first tab
document.querySelector('.tab-btn[data-day="1"]').classList.add('bg-accent', 'text-navy-900');

// ===== REGISTRATION FORM =====
const registrationForm = document.getElementById('registration-form');

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(registrationForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // Show success message
    alert('🎉 Merci pour votre inscription!\n\nVous recevrez un email de confirmation sous peu.');
    
    // Reset form
    registrationForm.reset();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor. addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this. getAttribute('href'));
        
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

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('section').forEach(section => {
    section. style.opacity = '0';
    section.style. transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add the animate-in class styles
const style = document.createElement('style');
style.textContent = `
    . animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head. appendChild(style);

// Make hero section visible immediately
document.getElementById('accueil').style.opacity = '1';
document.getElementById('accueil').style.transform = 'translateY(0)';