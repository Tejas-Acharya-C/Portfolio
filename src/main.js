import './style.css';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

// ============================
// Initialize
// ============================
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
});

function initAfterPreload() {
  if (window.lucide) lucide.createIcons();
  initSmoothScroll();
  initThreeScene();
  initNavbar();
  initTypewriter();
  initCursorGlow();

  initParallax();
  initTiltCards();
  initMagneticButtons();
  initGSAPReveals();
  initScrollProgress();
  initBackToTop();
  initCountUp();
  initContactForm();
}

// ============================
// PRELOADER
// ============================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  const preloaderLogo = document.querySelector('.preloader-logo');
  const navLogo = document.querySelector('.nav-logo');
  if (!preloader) { initAfterPreload(); return; }

  // Hide navbar logo initially so we can morph into its position
  if (navLogo) navLogo.style.opacity = '0';

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';

      setTimeout(() => {
        const preloaderBar = document.querySelector('.preloader-bar');
        // Fade out the progress bar
        gsap.to(preloaderBar, { opacity: 0, y: 10, duration: 0.3, ease: 'power2.in' });

        // IMPORTANT: Stop the CSS pulse animation so GSAP can control transform
        preloaderLogo.style.animation = 'none';
        preloaderLogo.style.opacity = '1';

        // Get navbar logo's position on screen
        const navRect = navLogo.getBoundingClientRect();
        const preRect = preloaderLogo.getBoundingClientRect();

        // Calculate delta to fly the logo from center to navbar
        const deltaX = navRect.left + navRect.width / 2 - (preRect.left + preRect.width / 2);
        const deltaY = navRect.top + navRect.height / 2 - (preRect.top + preRect.height / 2);
        const scaleRatio = navRect.height / preRect.height;

        // Animate: logo flies from center → navbar position
        gsap.to(preloaderLogo, {
          x: deltaX,
          y: deltaY,
          scale: scaleRatio,
          duration: 1,
          delay: 0.3,
          ease: 'power3.inOut',
          onComplete: () => {
            // Show the real navbar logo and fade away preloader
            navLogo.style.opacity = '1';
            gsap.to(preloader, {
              opacity: 0,
              duration: 0.4,
              ease: 'power2.out',
              onComplete: () => {
                preloader.classList.add('loaded');
                initAfterPreload();
              }
            });
          }
        });
      }, 350);
    } else {
      fill.style.width = progress + '%';
    }
  }, 150);
}

// ============================
// LENIS SMOOTH SCROLL
// ============================
let lenis;
function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Intercept all anchor links for smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        lenis.scrollTo(target, {
          offset: -70,
          duration: 1.8,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      }
    });
  });
}

// ============================
// THREE.JS 3D BACKGROUND
// ============================
function initThreeScene() {
  const canvas = document.getElementById('bg3d');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  // Floating 3D objects — kept light for performance
  const objects = [];
  const geometries = [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(0.8, 0),
    new THREE.TetrahedronGeometry(0.9, 0),
    new THREE.TorusGeometry(0.7, 0.25, 8, 16),
    new THREE.DodecahedronGeometry(0.7, 0),
  ];

  const colors = [0x8b5cf6, 0x06b6d4, 0xec4899, 0x22c55e, 0xf59e0b, 0x6366f1];

  for (let i = 0; i < 18; i++) {
    const geom = geometries[Math.floor(Math.random() * geometries.length)];
    const mat = new THREE.MeshBasicMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      transparent: true,
      opacity: 0.12 + Math.random() * 0.12,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 60,
      (Math.random() - 0.5) * 60,
      (Math.random() - 0.5) * 30 - 5
    );
    const scale = 0.3 + Math.random() * 1.2;
    mesh.scale.set(scale, scale, scale);

    mesh.userData = {
      rotationSpeedX: (Math.random() - 0.5) * 0.008,
      rotationSpeedY: (Math.random() - 0.5) * 0.008,
      rotationSpeedZ: (Math.random() - 0.5) * 0.004,
      floatSpeed: 0.3 + Math.random() * 0.5,
      floatAmplitude: 0.5 + Math.random() * 1.5,
      initialY: mesh.position.y,
      initialX: mesh.position.x,
      floatOffset: Math.random() * Math.PI * 2,
    };

    scene.add(mesh);
    objects.push(mesh);
  }

  // Single ambient light — MeshBasicMaterial doesn't need point lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  // Mouse tracking
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Scroll tracking for depth parallax
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  // Animate
  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    objects.forEach(obj => {
      const ud = obj.userData;
      obj.rotation.x += ud.rotationSpeedX;
      obj.rotation.y += ud.rotationSpeedY;
      obj.rotation.z += ud.rotationSpeedZ;

      // Float up/down
      obj.position.y = ud.initialY + Math.sin(time * ud.floatSpeed + ud.floatOffset) * ud.floatAmplitude;
      // Slight horizontal drift
      obj.position.x = ud.initialX + Math.sin(time * ud.floatSpeed * 0.5 + ud.floatOffset) * ud.floatAmplitude * 0.5;
    });

    // Camera follows mouse subtly
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
    // Scroll-based depth
    camera.position.z = 30 + scrollY * 0.005;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ============================
// NAVBAR
// ============================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Active link on scroll
  const sections = document.querySelectorAll('.section, .hero');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  });
}

// ============================
// TYPEWRITER
// ============================
function initTypewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return;

  const phrases = [
    'modern web apps.',
    'elegant UIs.',
    'scalable backends.',
    'full-stack solutions.',
    '3D experiences.',
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    el.textContent = current.substring(0, deleting ? --charIdx : ++charIdx);

    let delay = deleting ? 35 : 70;
    if (!deleting && charIdx === current.length) { delay = 2200; deleting = true; }
    else if (deleting && charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; delay = 400; }

    setTimeout(type, delay);
  }
  type();
}

// ============================
// CURSOR GLOW
// ============================
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || 'ontouchstart' in window) { if (glow) glow.style.display = 'none'; return; }

  let cx = 0, cy = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });

  function update() {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(update);
  }
  update();
}

// ============================
// PARALLAX
// ============================
function initParallax() {
  const elements = document.querySelectorAll('[data-parallax]');
  if (!elements.length) return;

  // Mouse-based parallax for hero content
  const heroContent = document.querySelector('.hero-content[data-parallax]');
  const heroVisual = document.querySelector('.hero-visual[data-parallax]');

  if (heroContent || heroVisual) {
    document.addEventListener('mousemove', (e) => {
      const xFrac = (e.clientX / window.innerWidth - 0.5);
      const yFrac = (e.clientY / window.innerHeight - 0.5);

      if (heroContent) {
        const speed = parseFloat(heroContent.dataset.speed) || 0.3;
        const scrollOffset = window.scrollY * speed;
        heroContent.style.transform = `translateY(${scrollOffset}px) translate(${xFrac * -8}px, ${yFrac * -8}px)`;
      }
      if (heroVisual) {
        const speed = parseFloat(heroVisual.dataset.speed) || -0.2;
        const scrollOffset = window.scrollY * speed;
        heroVisual.style.transform = `translateY(calc(-50% + ${scrollOffset}px)) translate(${xFrac * 15}px, ${yFrac * 15}px)`;
      }
    });
  }
}

// ============================
// 3D TILT CARDS
// ============================
function initTiltCards() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    const maxTilt = parseFloat(card.dataset.tiltMax) || 8;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width - 0.5) * 2;
      const yPercent = (y / rect.height - 0.5) * 2;

      const rotateY = xPercent * maxTilt;
      const rotateX = -yPercent * maxTilt;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

      // Move glow element if exists
      const glow = card.querySelector('.skill-card-glow');
      if (glow) {
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.transition = 'transform 0.5s ease-out';

      setTimeout(() => { card.style.transition = 'transform 0.15s ease-out'; }, 500);
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease-out';
    });
  });
}

// ============================
// MAGNETIC BUTTONS
// ============================
function initMagneticButtons() {
  const magneticElements = document.querySelectorAll('[data-magnetic]');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      setTimeout(() => { el.style.transition = ''; }, 400);
    });
  });
}

// ============================
// GSAP SCROLL REVEALS
// ============================
function initGSAPReveals() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  revealElements.forEach(el => {
    const delay = parseFloat(el.dataset.revealDelay) || 0;

    gsap.fromTo(el,
      {
        opacity: 0,
        y: 40,
        scale: 0.97,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
        onComplete: () => el.classList.add('revealed'),
      }
    );
  });



  // Hero entrance animations
  gsap.from('.hero-badge', {
    opacity: 0, y: 30, duration: 0.7, delay: 0.2, ease: 'power3.out'
  });
  gsap.from('.hero-title', {
    opacity: 0, y: 40, duration: 0.8, delay: 0.4, ease: 'power3.out'
  });
  gsap.from('.hero-typewriter', {
    opacity: 0, y: 30, duration: 0.7, delay: 0.6, ease: 'power3.out'
  });
  gsap.from('.hero-description', {
    opacity: 0, y: 30, duration: 0.7, delay: 0.8, ease: 'power3.out'
  });
  gsap.from('.hero-actions', {
    opacity: 0, y: 30, duration: 0.7, delay: 1.0, ease: 'power3.out'
  });
  gsap.from('.hero-stats .stat-item', {
    opacity: 0, y: 20, stagger: 0.15, duration: 0.6, delay: 1.2, ease: 'power3.out'
  });
  gsap.from('.hero-visual', {
    opacity: 0, x: 60, rotateY: -15, duration: 1.2, delay: 0.8, ease: 'power2.out'
  });
  gsap.from('.scroll-indicator', {
    opacity: 0, y: -15, duration: 0.6, delay: 1.8, ease: 'power3.out'
  });

  // Timeline line animation
  gsap.from('.timeline::before', {
    scaleY: 0,
    transformOrigin: 'top',
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 80%',
      end: 'bottom 60%',
      scrub: 1,
    }
  });

  // Skill tags stagger
  document.querySelectorAll('.skill-category').forEach(cat => {
    gsap.from(cat.querySelectorAll('.skill-tag'), {
      opacity: 0,
      y: 15,
      scale: 0.9,
      stagger: 0.06,
      duration: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cat,
        start: 'top 85%',
        once: true,
      }
    });
  });
}

// ============================
// COUNT UP
// ============================
function initCountUp() {
  const counters = document.querySelectorAll('.stat-number');
  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.target, 10);
          gsap.to(counter, {
            innerText: target,
            duration: 1.5,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate: function () {
              counter.textContent = Math.floor(parseFloat(counter.textContent));
            }
          });
        });
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ============================
// CONTACT FORM
// ============================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Sent!</span>';
    btn.style.pointerEvents = 'none';

    gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.pointerEvents = '';
      form.reset();
      if (window.lucide) lucide.createIcons();
    }, 2500);
  });
}

// ============================
// CUSTOM CURSOR
// ============================
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  if (!cursor || 'ontouchstart' in window) { if (cursor) cursor.style.display = 'none'; return; }

  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');
  let dotX = 0, dotY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    dotX = e.clientX;
    dotY = e.clientY;
  });

  function animateCursor() {
    // Dot follows instantly
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';

    // Ring follows with lag
    ringX += (dotX - ringX) * 0.12;
    ringY += (dotY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, input, textarea, .btn, .nav-link, .nav-cta, .project-card, .skill-category, .social-link, .contact-card, .tilt-card';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  // Click effect
  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
}

// ============================
// SCROLL PROGRESS BAR
// ============================
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}

// ============================
// BACK TO TOP
// ============================
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
