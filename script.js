// Caesar Schoorl Portfolio Website - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimations();
    initNavbarScroll();
    initTimezone();
    initCalendlyModal();
    initPortfolioExpand();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (!isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }
}

// Scroll-based Animations
function initScrollAnimations() {
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

    const animateElements = document.querySelectorAll(
        '.service-card, .blog-card, .portfolio-card, .service-section, .contact-method, .about-card'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(el);
    });
}

// Add animate-in class styles
const style = document.createElement('style');
style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// Navbar background on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            }
        });
    }
}

// Timezone Widget
function initTimezone() {
    function updateTime() {
        const options = { timeZone: 'Europe/Amsterdam' };
        const now = new Date();
        
        const dateOptions = { ...options, month: 'short', day: 'numeric', year: 'numeric' };
        const timeOptions = { ...options, hour: 'numeric', minute: '2-digit', hour12: true };
        
        const dateStr = now.toLocaleDateString('en-US', dateOptions);
        const timeStr = now.toLocaleTimeString('en-US', timeOptions);
        
        const dateElements = document.querySelectorAll('[id^="timezone-date"]');
        const timeElements = document.querySelectorAll('[id^="timezone-time"]');
        
        dateElements.forEach(el => el.textContent = dateStr);
        timeElements.forEach(el => el.textContent = timeStr);
    }
    
    updateTime();
    setInterval(updateTime, 60000);
}

// Calendly Modal
function initCalendlyModal() {
    const modal = document.getElementById('calendly-modal');
    const openButtons = document.querySelectorAll('.open-calendly');
    const closeButton = document.querySelector('.modal-close');
    
    if (!modal) return;
    
    // Open modal
    openButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });
    
    // Close modal with button
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
}

// Portfolio Expand on Click
function initPortfolioExpand() {
    const readMoreButtons = document.querySelectorAll('.portfolio-read-more');
    
    readMoreButtons.forEach(button => {
        const textWrapper = button.closest('.portfolio-text-wrapper');
        if (!textWrapper) return;
        
        // Show full text on click
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            textWrapper.classList.add('expanded');
        });
    });
}

// Console easter egg
console.log('%c👋 Hey there!\n%cInterested in working together?\nLet\'s chat: caesar.schoorl@gmail.com\n\n%c— Caesar Schoorl', 
'font-size: 20px; font-weight: bold;',
'font-size: 14px; color: #666;',
'font-size: 12px; color: #999; font-style: italic;'
);
