// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    }
    
    // Hide/show navbar on scroll (optional)
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = '#FFFFFF';
            } else {
                navLink.style.color = '#B8B8B8';
            }
        }
    });
};

window.addEventListener('scroll', highlightNav);

// ===== TYPING EFFECT FOR HERO TITLE (Optional Enhancement) =====
const heroTitle = document.querySelector('.title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let charIndex = 0;
    const typingSpeed = 50;
    
    const typeWriter = () => {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(() => {
        typeWriter();
    }, 1000);
}

// ===== PARALLAX EFFECT FOR HERO SECTION =====
// Disabled to prevent overlap issues
// const hero = document.querySelector('.hero');
// if (hero) {
//     window.addEventListener('scroll', () => {
//         const scrolled = window.pageYOffset;
//         const parallax = scrolled * 0.5;
//         hero.style.transform = `translateY(${parallax}px)`;
//     });
// }

// ===== CARD HOVER EFFECTS WITH TILT =====
const cards = document.querySelectorAll('.card:not(.org-card)');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== SCROLL PROGRESS INDICATOR =====
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #000 0%, #6C757D 100%);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== COPY EMAIL TO CLIPBOARD =====
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        const email = emailLink.getAttribute('href').replace('mailto:', '');
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Email copied!';
        tooltip.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #000;
            color: #fff;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                document.body.appendChild(tooltip);
                setTimeout(() => {
                    tooltip.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => tooltip.remove(), 300);
                }, 2000);
            });
        }
    });
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    highlightNav();
}, 10));

// ===== PRELOAD CRITICAL RESOURCES =====
window.addEventListener('load', () => {
    // Remove loading class from body if exists
    document.body.classList.remove('loading');
    
    // Trigger animations
    document.querySelectorAll('.fade-in').forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
        }, index * 100);
    });
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Add focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add keyboard navigation support for cards
cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// Remove keyboard navigation from org cards
document.querySelectorAll('.org-card').forEach(card => {
    card.removeAttribute('tabindex');
});

// Toggle org card descriptions on mobile
function handleOrgCardClick() {
    if (window.innerWidth <= 968) {
        document.querySelectorAll('.org-card').forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });
        });
    }
}

// Initialize on load and resize
handleOrgCardClick();
window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        document.querySelectorAll('.org-card').forEach(card => {
            card.classList.remove('expanded');
        });
    }
});

// ===== MODAL FUNCTIONALITY FOR CARDS =====
let currentSlide = 0;
let totalSlides = 0;

const createModal = () => {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="modal-carousel"></div>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
};

const modal = createModal();
const modalBody = modal.querySelector('.modal-body');
const modalCarousel = modal.querySelector('.modal-carousel');
const modalClose = modal.querySelector('.modal-close');

const createCarousel = (images) => {
    if (!images || images.length === 0) {
        modalCarousel.style.display = 'none';
        return;
    }
    
    modalCarousel.style.display = 'block';
    currentSlide = 0;
    totalSlides = images.length;
    
    const carouselHTML = `
        <div class="carousel-track">
            ${images.map(img => `
                <div class="carousel-slide">
                    <img src="${img}" alt="Project image" loading="lazy">
                </div>
            `).join('')}
        </div>
        ${totalSlides > 1 ? `
            <button class="carousel-btn prev" aria-label="Previous image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <button class="carousel-btn next" aria-label="Next image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
            <div class="carousel-indicators">
                ${images.map((_, i) => `
                    <button class="carousel-indicator ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to image ${i + 1}"></button>
                `).join('')}
            </div>
        ` : ''}
    `;
    
    modalCarousel.innerHTML = carouselHTML;
    
    // Add carousel navigation
    if (totalSlides > 1) {
        const track = modalCarousel.querySelector('.carousel-track');
        const prevBtn = modalCarousel.querySelector('.carousel-btn.prev');
        const nextBtn = modalCarousel.querySelector('.carousel-btn.next');
        const indicators = modalCarousel.querySelectorAll('.carousel-indicator');
        
        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === currentSlide);
            });
        };
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                currentSlide = index;
                updateCarousel();
            });
        });
        
        // Keyboard navigation
        const handleKeyboard = (e) => {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
            } else if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            }
        };
        document.addEventListener('keydown', handleKeyboard);
    }
};

// Close modal on button click
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal on overlay click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add click handlers to all cards (except org-cards)
document.querySelectorAll('.card:not(.org-card)').forEach(card => {
    card.addEventListener('click', () => {
        // Get images from data attribute
        const imagesData = card.getAttribute('data-images');
        const images = imagesData ? imagesData.split(',') : [];
        
        // Create carousel
        createCarousel(images);
        
        // Clone card content
        const cardClone = card.cloneNode(true);
        
        // Show hidden elements in modal
        const description = cardClone.querySelector('p:not(.card-date)');
        const techTags = cardClone.querySelector('.tech-tags');
        
        if (description) description.style.display = 'block';
        if (techTags) {
            techTags.style.display = 'flex';
        }
        
        // Remove card icon from modal body (already in carousel area)
        const cardIcon = cardClone.querySelector('.card-icon');
        if (cardIcon) cardIcon.remove();
        
        // Update modal content
        modalBody.innerHTML = cardClone.innerHTML;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code behind this portfolio?', 'font-size: 14px;');
console.log('%cFeel free to reach out! 🚀', 'font-size: 14px; color: #6C757D;');
console.log('%cEmail: alvaro.cleosanda@binus.ac.id', 'font-size: 12px; color: #000;');

// ===== DARK MODE TOGGLE (Optional - currently disabled) =====
// Uncomment to enable dark mode functionality
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #000;
    background: #fff;
    font-size: 20px;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
`;

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

document.body.appendChild(darkModeToggle);
*/

// ===== ANALYTICS (Placeholder) =====
// Add your analytics tracking code here
// Example: Google Analytics, Plausible, etc.

console.log('✅ Portfolio website loaded successfully!');
