// Portfolio — Main JS

document.addEventListener('DOMContentLoaded', () => {

    // ── Page fade-in ──────────────────────────────────────────────
    document.body.classList.add('loaded');

    // ── Header scroll state (rAF optimized) ───────────────────────
    const header = document.querySelector('header');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 40);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ── Mobile nav toggle ─────────────────────────────────────────
    const navToggle = document.getElementById('nav-toggle');
    const navLinks  = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // ── Smooth scroll + close mobile nav ─────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            navLinks?.classList.remove('active');
            navToggle?.setAttribute('aria-expanded', 'false');
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ── Active nav link (IntersectionObserver optimized) ──────────
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                navAnchors.forEach(a => {
                    a.classList.toggle('nav-active', a.getAttribute('href') === `#${currentId}`);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-10% 0px -40% 0px' });

    sections.forEach(sec => sectionObserver.observe(sec));

    // ── Scroll-reveal observer ────────────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.07,
        rootMargin: '0px 0px -48px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
        .forEach(el => revealObserver.observe(el));

    // ── Email copy-to-clipboard ───────────────────────────────────
    const emailBtn  = document.getElementById('email-btn');
    const copyHint  = document.getElementById('copy-hint');

    if (emailBtn && copyHint && navigator.clipboard) {
        emailBtn.addEventListener('click', async (e) => {
            // Only intercept if user is holding Alt/Option — otherwise let mailto open
            if (!e.altKey) return;
            e.preventDefault();
            const email = emailBtn.getAttribute('href').replace('mailto:', '').trim();
            try {
                await navigator.clipboard.writeText(email);
                copyHint.textContent = 'Email address copied to clipboard.';
                setTimeout(() => { copyHint.textContent = ''; }, 3000);
            } catch {
                // Clipboard API unavailable — mailto fallback already works
            }
        });
    }

});
