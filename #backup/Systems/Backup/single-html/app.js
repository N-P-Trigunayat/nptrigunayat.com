        /* ===== MULTI-PAGE NAVIGATION SYSTEM ===== */
        // Handles switching between different pages without reloading
        function navigateTo(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update active nav link - FIXED VERSION
        document.querySelectorAll('.nav-link.active, .nav-cta.active').forEach(link => {
            link.classList.remove('active');
        });
        
        // Use querySelectorAll to get all matching links (including nav-cta)
        const allMatchingLinks = document.querySelectorAll(`[data-page="${pageName}"]`);
        allMatchingLinks.forEach(link => {
            link.classList.add('active');
        });
        
        // Close mobile menu if open
        document.getElementById('navLinks').classList.remove('active');
        
        // Re-trigger reveal animations for new page
        setTimeout(() => {
            revealElements();
        }, 100);
    }
}

// Handle navigation link clicks
document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        navigateTo(page);
    });
});

// Set home as active on page load if no other page is active
window.addEventListener('DOMContentLoaded', () => {
    const activeLinks = document.querySelectorAll('.nav-link.active, .nav-cta.active');
    if (activeLinks.length === 0) {
        const homeLinks = document.querySelectorAll('[data-page="home"]');
        homeLinks.forEach(link => {
            link.classList.add('active');
        });
    }
});

        // Handle navigation link clicks
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                navigateTo(page);
            });
        });

        /* ===== PRELOADER ===== */
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 2000);
        });

        /* ===== ANIMATED PARTICLES ===== */
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (15 + Math.random() * 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }
        
        createParticles();

        /* ===== NAVBAR SCROLL EFFECT WITH HIDE/SHOW ===== */
        const navbar = document.getElementById('navbar');
        let lastScrollTop = 0;
        let scrollThreshold = 5;
        
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class for styling
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar based on scroll direction
            if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down & past threshold - hide navbar
                    navbar.classList.add('hidden');
                } else {
                    // Scrolling up - show navbar
                    navbar.classList.remove('hidden');
                }
                lastScrollTop = scrollTop;
            }
        });

        /* ===== MOBILE MENU TOGGLE ===== */
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');

        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        /* ===== NAVIGATE TO CONTACT WITH PLAN PRESELECTION ===== */
        function navigateToContactWithPlan(plan) {
            navigateTo('contact');
            setTimeout(() => {
                const planSelect = document.getElementById('selectedPlan');
                if (planSelect) {
                    planSelect.value = plan;
                }
            }, 150);
        }

        /* ===== SCROLL REVEAL ANIMATIONS ===== */
        function revealElements() {
            const reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        // Observe elements on scroll
        window.addEventListener('scroll', revealElements);
        
        // Initial reveal check
        setTimeout(revealElements, 100);

        /* ===== CONTACT FORM SUBMISSION ===== */
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                project: document.getElementById('project').value,
                message: document.getElementById('message').value
            };

            // TODO: Replace with your actual form submission logic
            // Options: Backend API, Formspree, EmailJS, Netlify Forms
            
            setTimeout(() => {
                console.log('Form submitted:', formData);
                
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                alert('✅ Thank you for reaching out! I will get back to you as soon as possible.');
                
                contactForm.reset();
            }, 1500);
        });

        /* ===== TESTIMONIAL CAROUSEL AUTO-SLIDE ===== */
        let currentTestimonial = 0;
        let testimonialTrack, testimonialSlides, indicators, totalTestimonials;

        function initCarousel() {
            testimonialTrack = document.getElementById('testimonialTrack');
            testimonialSlides = document.querySelectorAll('.testimonial-slide');
            indicators = document.querySelectorAll('.indicator');
            totalTestimonials = testimonialSlides.length;
        }

        function updateCarousel() {
            if (!testimonialTrack) return;
            
            const offset = -currentTestimonial * 100;
            testimonialTrack.style.transform = `translateX(${offset}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === currentTestimonial) {
                    indicator.classList.add('active');
                    indicator.style.background = 'var(--color-primary)';
                    indicator.style.width = '32px';
                    indicator.style.borderRadius = '6px';
                } else {
                    indicator.classList.remove('active');
                    indicator.style.background = 'var(--color-border)';
                    indicator.style.width = '12px';
                    indicator.style.borderRadius = '50%';
                }
            });
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            updateCarousel();
        }

        // Auto-advance every 5 seconds
        let testimonialInterval = setInterval(nextTestimonial, 5000);

        // Initialize carousel after DOM loads
        initCarousel();

        // Manual navigation with indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentTestimonial = index;
                updateCarousel();
                // Reset interval when manually navigating
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(nextTestimonial, 5000);
            });
        });

        // Initial update
        updateCarousel();

        // Pause on hover
        const carouselElement = document.getElementById('testimonialCarousel');
        if (carouselElement) {
            carouselElement.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });
            
            carouselElement.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(nextTestimonial, 5000);
            });
        }