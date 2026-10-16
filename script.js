// Caesar Schoorl Portfolio Website - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarScroll();
    initReveal();
    initMarquee();
    initClock();
    initCalendlyModal();
    initContactSuccess();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const links = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    if (!btn || !links) return;

    const setOpen = (open) => {
        links.classList.toggle('active', open);
        btn.classList.toggle('active', open);
        navbar.classList.toggle('menu-open', open);
        btn.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
    };

    btn.addEventListener('click', () => setOpen(!links.classList.contains('active')));
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
}

// Navbar background once the page is scrolled
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const update = () => navbar.classList.toggle('scrolled', window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
}

// Fade elements in as they enter the viewport
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('in'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => observer.observe(el));
}

// Duplicate marquee items so the loop is seamless
function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(track => {
        track.innerHTML += track.innerHTML;
    });
}

// Amsterdam clock in the footer
function initClock() {
    const els = document.querySelectorAll('.tz-time');
    if (!els.length) return;
    const update = () => {
        const time = new Date().toLocaleTimeString('en-GB', {
            timeZone: 'Europe/Amsterdam',
            hour: '2-digit', minute: '2-digit'
        });
        els.forEach(el => el.textContent = time);
    };
    update();
    setInterval(update, 30000);
}

// Calendly Modal
function initCalendlyModal() {
    const modal = document.getElementById('calendly-modal');
    if (!modal) return;

    const open = () => {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    };
    const close = () => {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    };

    document.querySelectorAll('.open-calendly').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            open();
        });
    });
    modal.querySelector('.modal-close')?.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) close();
    });
}

// Show the thank-you message after FormSubmit redirects back
function initContactSuccess() {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('success-message');
    if (!form || !success) return;
    if (window.location.search.includes('success=true')) {
        form.style.display = 'none';
        success.style.display = 'block';
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// Console easter egg
console.log('%c👋 Hey there!\n%cInterested in working together?\nLet\'s chat: caesar.schoorl@gmail.com\n\n%c— Caesar Schoorl',
'font-size: 20px; font-weight: bold;',
'font-size: 14px; color: #666;',
'font-size: 12px; color: #999; font-style: italic;'
);
