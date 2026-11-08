// ============================================
// KHALID IBN WALID INSTITUTES - MAIN JAVASCRIPT
// Ghana Islamic Educational Institution
// ============================================

const SITE_LANGUAGE_KEY = 'khalid-site-language';
const SITE_TRANSLATIONS = {
    en: {
        "Home": "Home",
        "About Us": "About Us",
        "Academics": "Academics",
        "Admissions": "Admissions",
        "Donations": "Donations",
        "General Donations": "General Donations",
        "Zakat": "Zakat",
        "Eid Sacrifice": "Eid Sacrifice",
        "Gallery": "Gallery",
        "News": "News",
        "Contact": "Contact",
        "CRM Admin": "CRM Admin",
        "Arabic Studies": "Arabic Studies",
        "Islamic Studies": "Islamic Studies",
        "Makaranta": "Makaranta",
        "Kindergarten": "Kindergarten",
        "Primary School": "Primary School",
        "Junior High School": "Junior High School",
        "Senior High School": "Senior High School",
        "Our Academic Programmes": "Our Academic Programmes",
        "Welcome to Our Institution": "Welcome to Our Institution",
        "Read Our Full Story": "Read Our Full Story",
        "Explore Programmes": "Explore Programmes",
        "Learn More": "Learn More",
        "Discover More": "Discover More",
        "ACTIVE MEMBERS": "ACTIVE MEMBERS",
        "EVENTS YEARLY": "EVENTS YEARLY",
        "YEARS ACTIVE": "YEARS ACTIVE",
        "PROGRAMS": "PROGRAMS",
        "Get In Touch": "Get In Touch",
        "Contact Us": "Contact Us",
        "Send Us a Message": "Send Us a Message",
        "Visit Us": "Visit Us",
        "Call Us": "Call Us",
        "Email Us": "Email Us",
        "Office Hours": "Office Hours",
        "Apply Now": "Apply Now",
        "Register Now": "Register Now",
        "Submit": "Submit",
        "Full Name *": "Full Name *",
        "Email Address *": "Email Address *",
        "Phone Number": "Phone Number",
        "Subject *": "Subject *",
        "Message *": "Message *",
        "Select Subject": "Select Subject",
        "Admissions Inquiry": "Admissions Inquiry",
        "Donations & Zakat": "Donations & Zakat",
        "Eid al-Adha Layyah": "Eid al-Adha Layyah",
        "General Inquiry": "General Inquiry",
        "Feedback": "Feedback",
        "Other": "Other",
        "Send Message": "Send Message",
        "Our Mission & Vision": "Our Mission & Vision",
        "Our Mission": "Our Mission",
        "Our Vision": "Our Vision",
        "Our Story": "Our Story",
        "Our Core Values": "Our Core Values",
        "Knowledge": "Knowledge",
        "Character": "Character",
        "Faith": "Faith",
        "Excellence": "Excellence",
        "Khalid Ibn Walid Institutes | Ghana Islamic Educational Institution": "Khalid Ibn Walid Institutes | Ghana Islamic Educational Institution",
        "Khalid Ibn Walid Institutes": "Khalid Ibn Walid Institutes",
        "Academic Programmes | Khalid Ibn Walid Institutes": "Academic Programmes | Khalid Ibn Walid Institutes",
        "About Us | Khalid Ibn Walid Institutes": "About Us | Khalid Ibn Walid Institutes",
        "Contact Us | Khalid Ibn Walid Institutes": "Contact Us | Khalid Ibn Walid Institutes",
        "Arabic Studies | Khalid Ibn Walid Institutes": "Arabic Studies | Khalid Ibn Walid Institutes",
        "Admissions | Khalid Ibn Walid Institutes": "Admissions | Khalid Ibn Walid Institutes",
        "Donations | Khalid Ibn Walid Institutes": "Donations | Khalid Ibn Walid Institutes",
        "Gallery | Khalid Ibn Walid Institutes": "Gallery | Khalid Ibn Walid Institutes",
        "News | Khalid Ibn Walid Institutes": "News | Khalid Ibn Walid Institutes"
    },
    ar: {
        "Home": "الرئيسية",
        "About Us": "معلومات عنا",
        "Academics": "الأكاديميات",
        "Admissions": "القبول",
        "Donations": "التبرعات",
        "General Donations": "التبرعات العامة",
        "Zakat": "الزكاة",
        "Eid Sacrifice": "أضحية العيد",
        "Gallery": "المعرض",
        "News": "الأخبار",
        "Contact": "اتصل بنا",
        "CRM Admin": "إدارة CRM",
        "Arabic Studies": "دراسات اللغة العربية",
        "Islamic Studies": "الدراسات الإسلامية",
        "Makaranta": "المكارنتا",
        "Kindergarten": "روضة الأطفال",
        "Primary School": "المدرسة الإبتدائية",
        "Junior High School": "المرحلة الإعدادية",
        "Senior High School": "المرحلة الثانوية",
        "Our Academic Programmes": "برامجنا الأكاديمية",
        "Welcome to Our Institution": "مرحباً بكم في مؤسستنا",
        "Read Our Full Story": "اقرأ قصتنا كاملة",
        "Explore Programmes": "استكشف البرامج",
        "Learn More": "اعرف المزيد",
        "Discover More": "اكتشف المزيد",
        "ACTIVE MEMBERS": "الأعضاء النشطون",
        "EVENTS YEARLY": "الأحداث سنوياً",
        "YEARS ACTIVE": "سنوات النشاط",
        "PROGRAMS": "البرامج",
        "Get In Touch": "تواصل معنا",
        "Contact Us": "اتصل بنا",
        "Send Us a Message": "أرسل لنا رسالة",
        "Visit Us": "زورنا",
        "Call Us": "اتصل بنا",
        "Email Us": "راسلنا",
        "Office Hours": "ساعات العمل",
        "Apply Now": "قدم الآن",
        "Register Now": "سجل الآن",
        "Submit": "إرسال",
        "Full Name *": "الاسم الكامل *",
        "Email Address *": "البريد الإلكتروني *",
        "Phone Number": "رقم الهاتف",
        "Subject *": "الموضوع *",
        "Message *": "الرسالة *",
        "Select Subject": "اختر الموضوع",
        "Admissions Inquiry": "استفسار القبول",
        "Donations & Zakat": "التبرعات والزكاة",
        "Eid al-Adha Layyah": "ضحايا عيد الأضحى",
        "General Inquiry": "استفسار عام",
        "Feedback": "ملاحظات",
        "Other": "أخرى",
        "Send Message": "إرسال الرسالة",
        "Our Mission & Vision": "مهمتنا ورؤيتنا",
        "Our Mission": "مهمتنا",
        "Our Vision": "رؤيتنا",
        "Our Story": "قصتنا",
        "Our Core Values": "قيمنا الأساسية",
        "Knowledge": "العلم",
        "Character": "الشخصية",
        "Faith": "الإيمان",
        "Excellence": "التميز",
        "Khalid Ibn Walid Institutes | Ghana Islamic Educational Institution": "معاهد خالد بن الوليد | مؤسسة تعليمية إسلامية في غانا",
        "Khalid Ibn Walid Institutes": "معاهد خالد بن الوليد",
        "Academic Programmes | Khalid Ibn Walid Institutes": "البرامج الأكاديمية | معاهد خالد بن الوليد",
        "About Us | Khalid Ibn Walid Institutes": "معلومات عنا | معاهد خالد بن الوليد",
        "Contact Us | Khalid Ibn Walid Institutes": "اتصل بنا | معاهد خالد بن الوليد",
        "Arabic Studies | Khalid Ibn Walid Institutes": "دراسات اللغة العربية | معاهد خالد بن الوليد",
        "Admissions | Khalid Ibn Walid Institutes": "القبول | معاهد خالد بن الوليد",
        "Donations | Khalid Ibn Walid Institutes": "التبرعات | معاهد خالد بن الوليد",
        "Gallery | Khalid Ibn Walid Institutes": "المعرض | معاهد خالد بن الوليد",
        "News | Khalid Ibn Walid Institutes": "الأخبار | معاهد خالد بن الوليد"
    }
};

function getDefaultLanguage() {
    const saved = window.localStorage.getItem(SITE_LANGUAGE_KEY);
    if (saved === 'ar' || saved === 'en') {
        return saved;
    }
    return 'en';
}

function injectLanguageSwitcher() {
    const navbarContainer = document.querySelector('.navbar-container');
    if (!navbarContainer || navbarContainer.querySelector('.language-switcher')) {
        return;
    }

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.setAttribute('aria-label', 'Language switcher');
    switcher.innerHTML = `
        <button type="button" class="lang-btn active" data-lang="en" aria-label="Switch to English">EN</button>
        <button type="button" class="lang-btn" data-lang="ar" aria-label="Switch to Arabic">AR</button>
    `;
    navbarContainer.appendChild(switcher);

    switcher.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', function() {
            applySiteLanguage(this.dataset.lang);
        });
    });
}

function applySiteLanguage(language) {
    const normalized = language === 'ar' ? 'ar' : 'en';
    window.localStorage.setItem(SITE_LANGUAGE_KEY, normalized);
    document.documentElement.lang = normalized;
    document.body.classList.toggle('rtl', normalized === 'ar');
    document.body.setAttribute('data-language', normalized);
    document.body.dir = normalized === 'ar' ? 'rtl' : 'ltr';

    const switcher = document.querySelector('.language-switcher');
    if (switcher) {
        switcher.querySelectorAll('.lang-btn').forEach(button => {
            const isActive = button.dataset.lang === normalized;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    const pageName = window.location.pathname.split('/').pop() || 'index.html';
    const pageTitleMap = {
        'index.html': {
            en: 'Khalid Ibn Walid Institutes | Ghana Islamic Educational Institution',
            ar: 'معاهد خالد بن الوليد | مؤسسة تعليمية إسلامية في غانا'
        },
        'about.html': {
            en: 'About Us | Khalid Ibn Walid Institutes',
            ar: 'معلومات عنا | معاهد خالد بن الوليد'
        },
        'academics.html': {
            en: 'Academic Programmes | Khalid Ibn Walid Institutes',
            ar: 'البرامج الأكاديمية | معاهد خالد بن الوليد'
        },
        'admissions.html': {
            en: 'Admissions | Khalid Ibn Walid Institutes',
            ar: 'القبول | معاهد خالد بن الوليد'
        },
        'donations.html': {
            en: 'Donations | Khalid Ibn Walid Institutes',
            ar: 'التبرعات | معاهد خالد بن الوليد'
        },
        'gallery.html': {
            en: 'Gallery | Khalid Ibn Walid Institutes',
            ar: 'المعرض | معاهد خالد بن الوليد'
        },
        'news.html': {
            en: 'News | Khalid Ibn Walid Institutes',
            ar: 'الأخبار | معاهد خالد بن الوليد'
        },
        'contact.html': {
            en: 'Contact Us | Khalid Ibn Walid Institutes',
            ar: 'اتصل بنا | معاهد خالد بن الوليد'
        },
        'arabic.html': {
            en: 'Arabic Studies | Khalid Ibn Walid Institutes',
            ar: 'دراسات اللغة العربية | معاهد خالد بن الوليد'
        }
    };

    const pageTitle = pageTitleMap[pageName] || { en: document.title, ar: document.title };
    document.title = pageTitle[normalized] || document.title;

    const textMap = SITE_TRANSLATIONS[normalized];
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    while (textNodes.nextNode()) {
        const node = textNodes.currentNode;
        const parent = node.parentElement;
        if (!parent || parent.closest('script, style, noscript') || !node.textContent || !node.textContent.trim()) {
            continue;
        }

        const text = node.textContent.trim();
        if (!node.parentElement.dataset.originalText) {
            node.parentElement.dataset.originalText = text;
        }

        const originalText = node.parentElement.dataset.originalText || text;
        const nextText = textMap[originalText] || originalText;
        node.textContent = nextText;
    }

    document.querySelectorAll('[placeholder], [aria-label], [title]').forEach(element => {
        const key = element.getAttribute('placeholder') || element.getAttribute('aria-label') || element.getAttribute('title');
        if (!key) {
            return;
        }
        if (!element.dataset.originalText) {
            element.dataset.originalText = key;
        }
        const originalKey = element.dataset.originalText || key;
        const nextValue = textMap[originalKey] || originalKey;
        element.setAttribute('placeholder', nextValue);
        element.setAttribute('aria-label', nextValue);
        element.setAttribute('title', nextValue);
    });

    document.querySelectorAll('option').forEach(option => {
        const key = option.textContent.trim();
        if (!key) {
            return;
        }
        if (!option.dataset.originalText) {
            option.dataset.originalText = key;
        }
        const originalKey = option.dataset.originalText || key;
        const nextValue = textMap[originalKey] || originalKey;
        option.textContent = nextValue;
    });
}

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
                // Use tap-to-open dropdowns while the navigation is collapsed.
                if (window.innerWidth <= 1200) {
                    if (!dropdown.classList.contains('active')) {
                        e.preventDefault();
                        dropdown.classList.add('active');
                    }
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

function saveWebsiteSubmission(type, data) {
    const storageKey = 'khalid-ibn-walid-submissions';

    try {
        const saved = window.localStorage.getItem(storageKey);
        const submissions = saved ? JSON.parse(saved) : [];
        if (!Array.isArray(submissions)) {
            throw new Error('Stored website submissions are not in the expected format.');
        }

        const id = window.crypto && typeof window.crypto.randomUUID === 'function'
            ? window.crypto.randomUUID()
            : `submission-${Date.now()}-${Math.random().toString(16).slice(2)}`;

        submissions.unshift({
            id,
            type,
            data,
            status: 'New',
            submittedAt: new Date().toISOString()
        });
        window.localStorage.setItem(storageKey, JSON.stringify(submissions));
        return true;
    } catch (error) {
        console.error('Unable to save website submission in this browser.', error);
        return false;
    }
}

function getSubmissionData(form) {
    return Object.fromEntries(new FormData(form).entries());
}

// Admission Form Handler
function handleAdmissionSubmit(e) {
    e.preventDefault();
    
    const data = getSubmissionData(e.target);
    
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (!saveWebsiteSubmission('admission', data)) {
        showNotification('Your application could not be saved in this browser. Please try again.', 'error');
        return;
    }

    showNotification('Application submitted successfully! We will contact you soon.', 'success');
    e.target.reset();
}

// Donation Form Handler
function handleDonationSubmit(e) {
    e.preventDefault();
    
    const data = getSubmissionData(e.target);
    
    if (!data.amount || !data.donorName) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (!saveWebsiteSubmission('donation', data)) {
        showNotification('Your donation request could not be saved in this browser. Please try again.', 'error');
        return;
    }

    showNotification('Thank you for your generous donation! May Allah reward you.', 'success');
    e.target.reset();
}

// Zakat Form Handler
function handleZakatSubmit(e) {
    e.preventDefault();
    
    const data = getSubmissionData(e.target);
    
    if (!data.zakatAmount || !data.zakatType) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (!saveWebsiteSubmission('zakat', data)) {
        showNotification('Your Zakat request could not be saved in this browser. Please try again.', 'error');
        return;
    }

    showNotification('Your Zakat contribution has been recorded. JazakAllah Khair.', 'success');
    e.target.reset();
}

// Qurbani Form Handler
function handleQurbaniSubmit(e) {
    e.preventDefault();
    
    const data = getSubmissionData(e.target);
    
    if (!data.animalType || !data.quantity || !data.qurbaniName) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    const total = calculateQurbaniTotal(data.animalType, parseInt(data.quantity));
    if (!saveWebsiteSubmission('qurbani', { ...data, amount: total })) {
        showNotification('Your Layyah arrangement could not be saved in this browser. Please try again.', 'error');
        return;
    }

    showNotification(`Layyah arrangement submitted! Total: GHS ${total}. We will contact you for payment.`, 'success');
    e.target.reset();
}

// Contact Form Handler
function handleContactSubmit(e) {
    e.preventDefault();
    
    const data = getSubmissionData(e.target);
    
    if (!data.contactName || !data.contactEmail || !data.contactMessage) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (!saveWebsiteSubmission('message', data)) {
        showNotification('Your message could not be saved in this browser. Please try again.', 'error');
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
    if (window.KWTranslate) {
        message = window.KWTranslate(message);
    }

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
