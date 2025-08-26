// Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initActiveNavigation();
    initFadeInAnimations();
    initInteractiveEffects();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navElement = document.querySelector('.nav');
                const navHeight = navElement ? navElement.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state immediately
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Active navigation highlighting based on scroll position
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section[id]');
    
    function updateActiveNav() {
        const navElement = document.querySelector('.nav');
        const navHeight = navElement ? navElement.offsetHeight : 0;
        const scrollPosition = window.scrollY + navHeight + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active navigation link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update on scroll with throttling
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    setTimeout(updateActiveNav, 100);
}

// Fade-in animations for elements
function initFadeInAnimations() {
    const animatedElements = document.querySelectorAll('.card, .skill-item, .timeline-item');
    
    // Add fade-in class to all animated elements
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Intersection Observer for fade-in effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll animations for timeline items
function initScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(timelineItems).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.classList.add('animate-timeline');
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Initialize all interactive effects
function initInteractiveEffects() {
    initSkillHoverEffects();
    initContactLinkEffects();
    initAchievementCardEffects();
    initLeadershipCardEffects();
    initCertificationEffects();
    initHeroParticles();
}

// Enhanced hover effects for skill items
function initSkillHoverEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
            this.style.boxShadow = 'var(--shadow-lg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Contact link enhancements
function initContactLinkEffects() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        // Add click tracking for analytics (if needed)
        item.addEventListener('click', function(e) {
            const contactType = this.href ? (
                this.href.includes('mailto:') ? 'email' : 
                this.href.includes('tel:') ? 'phone' : 'linkedin'
            ) : 'unknown';
            
            console.log(`Contact clicked: ${contactType}`);
        });
        
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Achievement cards interaction
function initAchievementCardEffects() {
    const achievementCards = document.querySelectorAll('.achievement-item');
    
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.achievement-icon');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.achievement-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
}

// Leadership cards interaction
function initLeadershipCardEffects() {
    const leadershipCards = document.querySelectorAll('.leadership-item');
    
    leadershipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.leadership-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.leadership-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Certification cards interaction
function initCertificationEffects() {
    const certificationCards = document.querySelectorAll('.certification-item');
    
    certificationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.certification-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.certification-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Initialize particle effect for hero section (subtle)
function initHeroParticles() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && !heroSection.querySelector('.particle')) {
        // Add subtle background animation
        heroSection.style.position = 'relative';
        heroSection.style.overflow = 'hidden';
        
        // Create animated background elements
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 80 + 40}px;
                height: ${Math.random() * 80 + 40}px;
                background: rgba(var(--color-teal-500-rgb), 0.03);
                border-radius: 50%;
                pointer-events: none;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 15 + 15}s infinite linear;
                z-index: 0;
            `;
            heroSection.appendChild(particle);
        }
        
        // Ensure content is above particles
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.position = 'relative';
            heroContent.style.zIndex = '1';
        }
    }
}

// Add CSS animations dynamically
function addDynamicStyles() {
    if (!document.querySelector('#dynamic-animations')) {
        const style = document.createElement('style');
        style.id = 'dynamic-animations';
        style.textContent = `
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes float {
                0% { transform: translate(0, 0) rotate(0deg); }
                33% { transform: translate(20px, -20px) rotate(120deg); }
                66% { transform: translate(-15px, 15px) rotate(240deg); }
                100% { transform: translate(0, 0) rotate(360deg); }
            }
            
            .animate-timeline {
                animation: slideInLeft 0.6s ease forwards;
            }
            
            .achievement-icon, 
            .leadership-icon, 
            .certification-icon {
                transition: transform 0.3s ease;
            }
            
            .contact-item {
                transition: transform 0.2s ease;
            }
            
            .skill-item {
                transition: all 0.3s ease;
            }
            
            /* Ensure smooth scrolling is supported */
            html {
                scroll-behavior: smooth;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize dynamic styles
addDynamicStyles();

// Debug function to test navigation
function debugNavigation() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Sections found:', sections.length);
    console.log('Nav links found:', navLinks.length);
    
    sections.forEach(section => {
        console.log(`Section: ${section.id}, Position: ${section.offsetTop}`);
    });
}