// ===================================
// LOCARB WEBSITE JAVASCRIPT
// ===================================

// Initialize modalData globally - will be updated by TranslationManager
window.modalData = {
    about: {
        title: 'About Us',
        image: 'images/meal2.jpg',
        content: '<p>Loading...</p>'
    },
    balanced: {
        title: 'Vision and Mission',
        image: 'images/meal3.jpg',
        content: '<p>Loading...</p>'
    },
    farm: {
        title: 'Quality, Safety and Hygien System',
        image: 'images/meal1.jpg',
        content: '<p>Loading...</p>'
    },
    vision: {
        title: 'Our Goals',
        image: 'images/meal4.jpg',
        content: '<p>Loading...</p>'
    }
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // INITIALIZE TRANSLATION MANAGER
    // ===================================
    if (typeof TranslationManager !== 'undefined') {
        const translationManager = new TranslationManager();
        
        const langBtn = document.getElementById('langToggle');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                translationManager.switchLanguage();
            });
        }
    }

    // ===================================
    // MOBILE NAVIGATION TOGGLE
    // ===================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // ===================================
    // STICKY NAVIGATION ON SCROLL
    // ===================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when page is scrolled
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // BACK TO TOP BUTTON
    // ===================================
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================
    const animationObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                animationObserver.unobserve(entry.target);
            }
        });
    }, animationObserverOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature, .meal-card, .mission-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        animationObserver.observe(element);
    });

    // ===================================
    // ASSETS TIMELINE OBSERVER
    // ===================================
    const assetObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.3
    });
    
    document.querySelectorAll('.asset-item').forEach(item => {
        assetObserver.observe(item);
    });

    // ===================================
    // SUPPLIERS SECTION OBSERVER
    // ===================================
    const observeSuppliers = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.supplier-card').forEach(card => {
                    card.style.animationPlayState = 'running';
                });
            }
        });
    }, { threshold: 0.2 });

    const suppliersSection = document.querySelector('.suppliers-section');
    if (suppliersSection) {
        observeSuppliers.observe(suppliersSection);
    }

    // ===================================
    // CONTACT SECTION ANIMATIONS
    // ===================================
    const contactObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, contactObserverOptions);

    // Observe contact section
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }

    // ===================================
    // IMAGE LAZY LOADING ERROR HANDLING
    // ===================================
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // If image fails to load, set a placeholder
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="250"%3E%3Crect width="250" height="250" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23999"%3EImage unavailable%3C/text%3E%3C/svg%3E';
            console.warn('Image failed to load:', this.alt);
        });
    });

    // ===================================
    // DYNAMIC YEAR IN FOOTER
    // ===================================
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-bottom p');
    
    if (footerYear) {
        footerYear.textContent = `© ${currentYear} LoCarb. All rights reserved.`;
    }

    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Use debounce for resize events
    window.addEventListener('resize', debounce(function() {
        console.log('Window resized');
        // Add any resize-specific logic here
    }, 250));

    // ===================================
    // CONSOLE MESSAGE
    // ===================================
    console.log('%c🥗 LoCarb Website Loaded Successfully! 🥗', 
        'color: #b46e1dff; font-size: 16px; font-weight: bold;'
    );
    console.log('%cWebsite by LoCarb Team', 
        'color: #666; font-size: 12px;'
    );

    // ===================================
    // MODAL FUNCTIONALITY
    // ===================================
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContainer = document.getElementById('modalContainer');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');

    // Open modal function
    function openModal(cardType) {
        const data = window.modalData[cardType];
        if (!data) return;

        const imageHTML = data.image 
            ? `<img src="${data.image}" alt="${data.title}">`
            : `<div class="placeholder-circle">Image unavailable</div>`;

        modalContent.innerHTML = `
            <div class="modal-content-inner">
                <div class="modal-image">
                    ${imageHTML}
                </div>
                <div class="modal-text">
                    <h2>${data.title}</h2>
                    ${data.content}
                </div>
            </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Store which modal was opened so it can refresh on language change
        sessionStorage.setItem('lastOpenedModal', cardType);
    }

    // Close modal function
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        sessionStorage.removeItem('lastOpenedModal');
    }

    // Event listeners for meal cards
    const mealCards = document.querySelectorAll('.meal-card');
    mealCards.forEach(card => {
        const readMoreBtn = card.querySelector('.read-more-btn');
        const cardType = card.getAttribute('data-card');

        if (readMoreBtn && cardType) {
            readMoreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(cardType);
            });
        }

        // Make entire card clickable
        card.addEventListener('click', () => {
            if (cardType) {
                openModal(cardType);
            }
        });
    });

    // Event listener for vision card
    const visionCard = document.querySelector('.vision-card');
    if (visionCard) {
        const visionBtn = visionCard.querySelector('.read-more-btn');
        const cardType = visionCard.getAttribute('data-card');

        if (visionBtn && cardType) {
            visionBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(cardType);
            });
        }

        visionCard.addEventListener('click', () => {
            if (cardType) {
                openModal(cardType);
            }
        });
    }

    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // ===================================
    // ACCESSIBILITY ENHANCEMENTS
    // ===================================
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
            // ESC key closes modal
            if (modalOverlay && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        }
    });

}); // END OF DOMContentLoaded

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll position
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// Scroll to element
function scrollToElement(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop - offset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}