// ===================================
// LOCARB WEBSITE JAVASCRIPT
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
   

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
        }
    });

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

    // Modal data
    const modalData = {
        about: {
            title: 'About Us',
            image: 'images/meal2.jpg',
            content: `
                <p>Established in 2015, Locarb Healthy Meals Company specializes in offering a diverse range of delicious, high-quality and nutritious meals that promote health and wellbeing. Locarb prides itself on using only natural, fresh and organic ingredients in the preparation of its meals, making it an excellent choice for individuals seeking healthy and well-balanced food options.</p>

                <p>To ensure the quality and freshness of its meals, Locarb employs the best practices in meal preparation and packaging. The company also provides meal delivery services to homes, offices and institutions, and adheres to strict standards in meal distribution to ensure prompt and efficient delivery.</p>

                <p>With a fully equipped central kitchen and three restaurant branches, Locarb has rapidly expanded since its inception and has established itself as one of the leading companies in Kuwait offering healthy meal solutions.</p>

                <ul>
                    <li>Established in 2015</li>
                    <li>Fresh, natural, organic ingredients</li>
                    <li>Advanced preparation & packaging systems</li>
                    <li>Home, office & institutional delivery</li>
                    <li>Three branches across Kuwait</li>
                </ul>
            `
        },

        balanced: {
            title: 'Vision and Mission',
            image: 'images/meal3.jpg',
            content: `
                <p>Locarb Healthy Meals Company envisions a world where individuals have access to healthy and balanced food options that promote their overall health and well-being. The company's mission is to provide customers with delicious and nutritious meals that cater to their unique dietary needs and preferences.</p>

                <p>Locarb aims to raise awareness about the importance of maintaining a healthy diet and to inspire individuals to adopt healthy eating habits as a sustainable lifestyle. Additionally, the company is committed to offering its high-quality meals at affordable prices, making them accessible to everyone.</p>

                <p>Locarb strives to become the leading provider of healthy eating solutions in Kuwait and beyond, delivering nutritious and balanced meals to customers across the region.</p>

                <ul>
                    <li>Promoting healthy eating awareness</li>
                    <li>Providing nutritious & affordable meals</li>
                    <li>Supporting lifestyle-based health improvement</li>
                    <li>Ensuring accessibility across Kuwait & the region</li>
                    <li>Delivering personalized meal solutions</li>
                </ul>
            `
        },

        farm: {
            title: 'Quality, Safety and Hygien System',
            image: 'images/meal1.jpg',
            content: `
                <p>Locarb Healthy Meals Company places great emphasis on maintaining high standards of quality, hygiene, and safety in all operations to ensure customer satisfaction. The company applies the ISO 9001:2015 Quality Management System, which includes specialized procedures that guarantee quality at every stage of meal production and distribution.</p>

                <p>Locarb also adheres to the principles of HACCP (Hazard Analysis and Critical Control Points) to ensure food safety and prevent contamination. The company maintains a safe and healthy work environment for employees and guests, following industry best practices and preventive measures to avoid risks during production and distribution.</p>

                <p>Additionally, Locarb follows strict storage and refrigeration standards to maintain food quality and safety. The company regularly reviews and updates its quality, safety, and hygiene systems to meet international standards and evolving customer needs.</p>

                <ul>
                    <li>ISO 9001:2015 Quality Management System</li>
                    <li>HACCP-certified food safety practices</li>
                    <li>Strict hygiene & preventive procedures</li>
                    <li>Safe storage & refrigeration processes</li>
                    <li>Continuous evaluation & improvement</li>
                </ul>
            `
        },

        vision: {
            title: 'Our Goals',
            image: 'images/meal4.jpg',
            content: `
                <p>Locarb Healthy Meals Company has set several strategic goals to support its mission and vision. The company aims to promote a culture of healthy living by offering nutritious, organic and well-balanced meals that encourage individuals to adopt healthier lifestyle habits.</p>

                <p>Locarb also strives to expand its presence in the regional market by offering exceptional services and building long-term partnerships with local and international companies and institutions. The company provides customized nutritional solutions designed to meet the needs of individuals, companies, and organizations.</p>

                <p>Committed to innovation, Locarb continuously improves its production, packaging, and distribution technologies. The company also plans to develop new products that meet the evolving expectations of its customers.</p>

                <p>Ultimately, Locarb aims to become the leading provider of healthy, high-quality meals in the region while maintaining its commitment to exceptional service, innovation, and promoting healthy living.</p>

                <ul>
                    <li>Promoting a healthy lifestyle culture</li>
                    <li>Expanding regional market presence</li>
                    <li>Providing customized meal solutions</li>
                    <li>Continuous product & process innovation</li>
                    <li>Building long-term partnerships</li>
                    <li>Becoming the leading healthy meals provider</li>
                </ul>
            `
        }
    };

    // Open modal function
    function openModal(cardType) {
        const data = modalData[cardType];
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
    }

    // Close modal function
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
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

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

});

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