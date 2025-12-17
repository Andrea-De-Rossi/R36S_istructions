// Progress Bar
function updateProgressBar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = scrollPercentage + '%';
}

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all content sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add scroll event listener for progress bar
    window.addEventListener('scroll', updateProgressBar);
    
    // Initial progress bar update
    updateProgressBar();
    
    // Animate hero section on load
    animateHero();
    
    // Add particle effect
    createParticles();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Hero animation
function animateHero() {
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    
    setTimeout(() => {
        hero.style.transition = 'opacity 1s ease';
        hero.style.opacity = '1';
    }, 100);
}

// Particle system
function createParticles() {
    const particleCount = 50;
    const animatedBg = document.querySelector('.animated-bg');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color
        const colors = ['#a855f7', '#ec4899', '#3b82f6', '#06b6d4', '#10b981', '#f97316'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = delay + 's';
        
        animatedBg.appendChild(particle);
    }
}

// Add particle styles dynamically
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
        filter: blur(1px);
        animation: particleFloat 15s infinite ease-in-out;
    }
    
    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
        }
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Create explosion effect
    const body = document.body;
    body.style.animation = 'shake 0.5s';
    
    // Add shake animation
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            10% { transform: translate(-10px, -10px) rotate(-1deg); }
            20% { transform: translate(10px, 10px) rotate(1deg); }
            30% { transform: translate(-10px, 10px) rotate(-1deg); }
            40% { transform: translate(10px, -10px) rotate(1deg); }
            50% { transform: translate(-10px, -10px) rotate(-1deg); }
            60% { transform: translate(10px, 10px) rotate(1deg); }
            70% { transform: translate(-10px, 10px) rotate(-1deg); }
            80% { transform: translate(10px, -10px) rotate(1deg); }
            90% { transform: translate(-10px, -10px) rotate(-1deg); }
        }
    `;
    document.head.appendChild(shakeStyle);
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '💥 HAI FATTO ESPLODERE TUTTO! 💥';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Press Start 2P', cursive;
        font-size: 2rem;
        color: #ff0000;
        text-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000;
        z-index: 10000;
        animation: pulse 0.5s infinite;
        text-align: center;
        padding: 2rem;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 20px;
    `;
    body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        body.style.animation = '';
    }, 3000);
}

// Add interactive sound effects (optional - using Web Audio API)
class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.enabled = false;
    }
    
    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.enabled = true;
        }
    }
    
    playBeep(frequency = 440, duration = 100) {
        if (!this.enabled) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }
}

const soundFX = new SoundEffects();

// Add sound to buttons and interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize sound on first user interaction
    document.addEventListener('click', () => {
        if (!soundFX.enabled) {
            soundFX.init();
        }
    }, { once: true });
    
    // Add hover sounds to cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            soundFX.playBeep(800, 50);
        });
    });
    
    // Add click sounds to kbd elements
    const kbdElements = document.querySelectorAll('kbd');
    kbdElements.forEach(kbd => {
        kbd.addEventListener('click', () => {
            soundFX.playBeep(1000, 100);
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add typing effect to console display
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Observe console display and trigger typing effect
const consoleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const matrixTexts = entry.target.querySelectorAll('.matrix-text span');
            const texts = ['Loading...', 'Initializing system...', "Don't panic..."];
            
            matrixTexts.forEach((span, index) => {
                setTimeout(() => {
                    typeWriter(span, texts[index], 100);
                }, index * 1000);
            });
            
            consoleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const consoleDisplay = document.querySelector('.console-display');
    if (consoleDisplay) {
        consoleObserver.observe(consoleDisplay);
    }
});

// Add glow effect on mouse move
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        }
    });
});

// Add radial gradient follow effect
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    .glass-card {
        --mouse-x: 50%;
        --mouse-y: 50%;
    }
    
    .glass-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
            circle 200px at var(--mouse-x) var(--mouse-y),
            rgba(168, 85, 247, 0.1),
            transparent
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        border-radius: 30px;
    }
    
    .glass-card:hover::after {
        opacity: 1;
    }
`;
document.head.appendChild(glowStyle);

console.log('🎮 Guida R36S caricata! Premi ↑↑↓↓←→←→BA per un easter egg! 🎮');
