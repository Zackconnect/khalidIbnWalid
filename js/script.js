// ============================================
// KHALID IBN WALID INSTITUTES - MAIN JAVASCRIPT
// Ghana Islamic Educational Institution
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initDropdowns();
    initActiveNavigation();
    initSmoothScroll();
    initFormHandling();
    initAnimations();
    initHeroTextFlipper();
    initStatsCounter();
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (mobileToggle && navbarMenu) {
        mobileToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (navbarMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
                navbarMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// ============================================
// DROPDOWN MENUS (MOBILE)
// ============================================
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                // Only prevent default on mobile
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
}

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// FORM HANDLING
// ============================================
function initFormHandling() {
    // Admission Form
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', handleAdmissionSubmit);
    }

    // Donation Form
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', handleDonationSubmit);
    }

    // Zakat Form
    const zakatForm = document.getElementById('zakatForm');
    if (zakatForm) {
        zakatForm.addEventListener('submit', handleZakatSubmit);
    }

    // Qurbani Form
    const qurbaniForm = document.getElementById('qurbaniForm');
    if (qurbaniForm) {
        qurbaniForm.addEventListener('submit', handleQurbaniSubmit);
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Admission Form Handler
function handleAdmissionSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Simulate form submission
    showNotification('Application submitted successfully! We will contact you soon.', 'success');
    e.target.reset();
}

// Donation Form Handler
function handleDonationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    if (!data.amount || !data.donorName) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    showNotification('Thank you for your generous donation! May Allah reward you.', 'success');
    e.target.reset();
}

// Zakat Form Handler
function handleZakatSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    if (!data.amount || !data.zakatType) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    showNotification('Your Zakat contribution has been recorded. JazakAllah Khair.', 'success');
    e.target.reset();
}

// Qurbani Form Handler
function handleQurbaniSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    if (!data.animalType || !data.quantity || !data.donorName) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    const total = calculateQurbaniTotal(data.animalType, parseInt(data.quantity));
    showNotification(`Layyah arrangement submitted! Total: GHS ${total}. We will contact you for payment.`, 'success');
    e.target.reset();
}

// Contact Form Handler
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    e.target.reset();
}

// Calculate Qurbani Total
function calculateQurbaniTotal(animalType, quantity) {
    const prices = {
        'sheep': 450,
        'goat': 400,
        'cow': 2800,
        'camel': 3500
    };
    return (prices[animalType] || 0) * quantity;
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === 'success' ? '#0d5c2e' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        max-width: 350px;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and feature boxes
    document.querySelectorAll('.card, .feature-box, .testimonial').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================
function updateYear() {
    const yearElements = document.querySelectorAll('.-current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// Initialize year update
updateYear();

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format currency
function formatCurrency(amount, currency = 'GHS') {
    return `${currency} ${amount.toLocaleString()}`;
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone number (Ghana format)
function validatePhone(phone) {
    const re = /^(\+233|0)?[2-9]\d{8}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// ============================================
// QURBANI PRICE CALCULATOR (Live Update)
// ============================================
function initQurbaniCalculator() {
    const animalSelect = document.getElementById('animalType');
    const quantityInput = document.getElementById('quantity');
    const totalDisplay = document.getElementById('totalAmount');

    if (animalSelect && quantityInput && totalDisplay) {
        function updateTotal() {
            const animalType = animalSelect.value;
            const quantity = parseInt(quantityInput.value) || 0;
            const total = calculateQurbaniTotal(animalType, quantity);
            totalDisplay.textContent = formatCurrency(total);
        }

        animalSelect.addEventListener('change', updateTotal);
        quantityInput.addEventListener('input', updateTotal);
        updateTotal(); // Initialize
    }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', initQurbaniCalculator);

// ============================================
// HERO TEXT FLIPPER ANIMATION
// ============================================
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const statsSection = document.querySelector('.stats-band');

    function setValue(counter, value) {
        const suffix = counter.dataset.suffix || '';
        counter.textContent = `${value.toLocaleString()}${suffix}`;
    }

    function animateCounters() {
        counters.forEach(counter => {
            const target = Number(counter.dataset.count);
            const duration = 1600;
            const startTime = performance.now();

            function updateCounter(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const value = Math.floor(target * easedProgress);
                setValue(counter, value);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    setValue(counter, target);
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    function showFinalValues() {
        counters.forEach(counter => setValue(counter, Number(counter.dataset.count)));
    }

    if (prefersReducedMotion || !('IntersectionObserver' in window) || !statsSection) {
        showFinalValues();
        return;
    }

    const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        animateCounters();
    }, { threshold: 0.1 });

    observer.observe(statsSection);
}

// ============================================
// HERO TEXT FLIPPER ANIMATION
// ============================================
function initHeroTextFlipper() {
    const quoteSlides = document.querySelectorAll('.hero-quote-slide');
    if (quoteSlides.length < 2) return;

    let currentIndex = 0;
    const flipInterval = 5000;

    function flipText() {
        const currentSlide = quoteSlides[currentIndex];
        currentSlide.classList.remove('active');
        currentSlide.classList.add('exit');
        currentSlide.setAttribute('aria-hidden', 'true');

        const nextIndex = (currentIndex + 1) % quoteSlides.length;
        setTimeout(() => {
            currentSlide.classList.remove('exit');
            quoteSlides[nextIndex].classList.add('active');
            quoteSlides[nextIndex].setAttribute('aria-hidden', 'false');
            currentIndex = nextIndex;
        }, 400);
    }

    setInterval(flipText, flipInterval);
}

// ============================================
// PAGE PRELOADER
// ============================================
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            preloader.setAttribute('aria-hidden', 'true');
        }, 500);
    }, 1500);
}

if (document.readyState === 'complete') {
    hidePreloader();
} else {
    window.addEventListener('load', hidePreloader, { once: true });
}
