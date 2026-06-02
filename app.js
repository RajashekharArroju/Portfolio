// Portfolio JavaScript functionality
function onReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

onReady(function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initActiveNavigation();
    initFadeInAnimations();
    initInteractiveEffects();
    initExperienceCalculations();
    initTypingAnimation();
    initCounterAnimation();
    initScrollProgress();
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

// Calculate and update experience values based on the current date
function initExperienceCalculations() {
    const timelinePeriods = document.querySelectorAll('.timeline-period');

    const today = new Date();
    const startDates = [];

    timelinePeriods.forEach(span => {
        const startValue = span.dataset.start;
        const endValue = span.dataset.end;
        if (!startValue || !endValue) return;

        const startDate = parseTimelineDate(startValue);
        const endDate = parseTimelineDate(endValue);
        if (!startDate || !endDate) return;

        startDates.push(startDate);

        const originalLabel = span.textContent.split('·')[0].trim();
        const formattedLabel = getFormattedLabel(startValue, endValue, originalLabel);
        const duration = getFormattedDuration(startDate, endDate);

        span.textContent = `${formattedLabel} · ${duration}`;
    });

    function parseTimelineDate(value) {
        if (!value) return null;
        if (value.toLowerCase() === 'present') {
            return new Date();
        }
        if (/^\d{4}-\d{2}$/.test(value)) {
            return new Date(`${value}-01`);
        }
        return new Date(value);
    }

    function getFormattedLabel(startValue, endValue, originalLabel) {
        const hasRange = originalLabel && (originalLabel.includes('-') || originalLabel.includes('–'));
        if (!originalLabel || !hasRange) {
            return originalLabel;
        }
        const start = parseTimelineDate(startValue);
        const endLabel = endValue.toLowerCase() === 'present' ? 'Present' : formatMonthYear(parseTimelineDate(endValue));
        return `${formatMonthYear(start)} - ${endLabel}`;
    }

    function formatMonthYear(date) {
        return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    }

    function getFormattedDuration(start, end) {
        let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        if (months < 0) {
            months = 0;
        }
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        if (years > 0 && remainingMonths > 0) {
            return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
        }
        if (years > 0) {
            return `${years} yr${years > 1 ? 's' : ''}`;
        }
        if (remainingMonths > 0) {
            return `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
        }
        return 'Less than 1 mo';
    }

    function getOverallExperienceLabel(earliest, now) {
        let years = now.getFullYear() - earliest.getFullYear();
        let months = now.getMonth() - earliest.getMonth();
        if (months < 0) {
            years -= 1;
            months += 12;
        }
        if (years < 0) {
            years = 0;
        }
        return months > 0 ? `${years}+` : `${years}`;
    }
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

// Typing animation for hero title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title-sub');
    if (!heroTitle) return;

    const text = "Enterprise-Scale Automation & Cloud Platforms";
    let index = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentText = text.substring(0, index);
        heroTitle.textContent = currentText;

        if (!isDeleting && index < text.length) {
            index++;
            typingSpeed = 100;
        } else if (isDeleting && index > 0) {
            index--;
            typingSpeed = 50;
        } else if (!isDeleting && index === text.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            typingSpeed = 500; // Pause before restart
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start typing animation after initial fade-in
    setTimeout(typeWriter, 1500);
}

// Animated counters for hero stats
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.dataset.target);
                animateCounter(statNumber, target);
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
}

// Enhanced interactive effects for new sections
function initInteractiveEffects() {
    initSkillHoverEffects();
    initContactLinkEffects();
    initAchievementCardEffects();
    initLeadershipCardEffects();
    initCertificationEffects();
    initHeroParticles();
    initExpertiseCardEffects();
    initCaseStudyEffects();
    initInnovationCardEffects();
    initTechIconEffects();
    initTestimonialEffects();
}

// Expertise cards hover effects
function initExpertiseCardEffects() {
    const expertiseCards = document.querySelectorAll('.expertise-card');

    expertiseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.expertise-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.expertise-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Case study expandable effects
function initCaseStudyEffects() {
    const caseStudies = document.querySelectorAll('.case-study-card');

    caseStudies.forEach(card => {
        const content = card.querySelector('.case-study-content');
        let isExpanded = false;

        card.addEventListener('click', function() {
            isExpanded = !isExpanded;
            if (isExpanded) {
                content.style.maxHeight = content.scrollHeight + 'px';
                card.classList.add('expanded');
            } else {
                content.style.maxHeight = '200px';
                card.classList.remove('expanded');
            }
        });
    });
}

// Innovation card preview effects
function initInnovationCardEffects() {
    const innovationCards = document.querySelectorAll('.innovation-card');

    innovationCards.forEach(card => {
        const preview = card.querySelector('.innovation-preview');

        card.addEventListener('mouseenter', function() {
            preview.style.transform = 'scale(1.05)';
            preview.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            preview.style.transform = 'scale(1)';
        });
    });
}

// Tech item floating effects
function initTechIconEffects() {
    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('floating');
    });
}

// Testimonial card effects
function initTestimonialEffects() {
    const testimonials = document.querySelectorAll('.testimonial-card');

    testimonials.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(1deg)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
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

            @keyframes floating {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }

            .animate-timeline {
                animation: slideInLeft 0.6s ease forwards;
            }

            .achievement-icon,
            .leadership-icon,
            .certification-icon,
            .expertise-icon {
                transition: transform 0.3s ease;
            }

            .contact-item {
                transition: transform 0.2s ease;
            }

            .skill-item {
                transition: all 0.3s ease;
            }

            .floating {
                animation: floating 3s ease-in-out infinite;
            }

            .case-study-content {
                max-height: 200px;
                overflow: hidden;
                transition: max-height 0.3s ease;
            }

            .case-study-card.expanded .case-study-content {
                max-height: none;
            }

            /* Ensure smooth scrolling is supported */
            html {
                scroll-behavior: smooth;
            }

            /* Fade-in animations */
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }

            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
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