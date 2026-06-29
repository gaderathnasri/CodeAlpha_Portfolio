// ── NAVBAR SCROLL ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const open = navMenu.classList.contains('open');
    hamburger.innerHTML = open
        ? '<span style="transform:rotate(45deg) translate(5px,5px)"></span><span style="opacity:0"></span><span style="transform:rotate(-45deg) translate(5px,-5px)"></span>'
        : '<span></span><span></span><span></span>';
});
navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
    });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

// ── ACTIVE NAVBAR LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.pageYOffset >= sec.offsetTop - 140) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('section').forEach(sec => observer.observe(sec));

// ── TYPING EFFECT ──
const roles = ['Java Developer', 'Frontend Developer', 'Problem Solver', 'Web Developer'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.querySelector('.typing-text');
function typeLoop() {
    const current = roles[roleIdx];
    typingEl.textContent = deleting
        ? current.slice(0, charIdx--)
        : current.slice(0, charIdx++);
    let speed = deleting ? 60 : 100;
    if (!deleting && charIdx > current.length) {
        deleting = true; speed = 1500;
    } else if (deleting && charIdx < 0) {
        deleting = false; charIdx = 0;
        roleIdx = (roleIdx + 1) % roles.length; speed = 300;
    }
    setTimeout(typeLoop, speed);
}
typeLoop();

// ── FLOATING PARTICLES ──
const particlesContainer = document.getElementById('particles');
function createParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 6;
    p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${left}%; bottom:-10px;
        animation-duration:${duration}s;
        animation-delay:${delay}s;
        opacity:${Math.random() * 0.5 + 0.2};
    `;
    particlesContainer.appendChild(p);
    setTimeout(() => p.remove(), (duration + delay) * 1000);
}
setInterval(createParticle, 600);
for (let i = 0; i < 12; i++) createParticle();

// ── SKILL HOVER STAGGER ──
document.querySelectorAll('.skill-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 40}ms`;
});

// ── BACK TO TOP on scroll ──
window.addEventListener('scroll', () => {
    document.body.classList.toggle('scrolled', window.scrollY > 300);
});