// Caesar Schoorl Portfolio Website - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initHeroName();
    initReveal();
    initClock();
    initCalendlyModal();
    initContactSuccess();
});

// Mobile menu
function initMenu() {
    const btn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    if (!btn || !nav) return;

    const setOpen = (open) => {
        nav.classList.toggle('open', open);
        btn.textContent = open ? (btn.dataset.close || 'Close') : (btn.dataset.open || 'Menu');
        btn.setAttribute('aria-expanded', open);
    };

    btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
}

// Scale the hero name so it spans the full width
function initHeroName() {
    const el = document.querySelector('.hero-name');
    if (!el) return;
    const span = el.querySelector('span');
    const fit = () => {
        const style = getComputedStyle(el);
        const available = el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        el.style.fontSize = '100px';
        const width = span.getBoundingClientRect().width;
        if (width > 0) el.style.fontSize = (100 * available / width * 0.99) + 'px';
    };
    fit();
    window.addEventListener('resize', fit);
    if (document.fonts) document.fonts.ready.then(fit);
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
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => observer.observe(el));
}

// Amsterdam clock
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
