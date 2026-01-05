// ===== PRELOADER =====
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 2000);
});

// ===== ANIMATED PARTICLES =====
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = 15 + Math.random() * 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// ===== NAVBAR SCROLL EFFECT WITH HIDE/SHOW =====
const navbar = document.getElementById("navbar");
let lastScrollTop = 0;
let scrollThreshold = 5;

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add scrolled class for styling
  if (scrollTop > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Hide/show navbar based on scroll direction
  if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down & past threshold - hide navbar
      navbar.classList.add("hidden");
    } else {
      // Scrolling up - show navbar
      navbar.classList.remove("hidden");
    }
    lastScrollTop = scrollTop;
  }
});

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ===== NAVIGATE TO CONTACT WITH PLAN =====
function navigateToContactWithPlan(plan) {
  const encoded = encodeURIComponent(plan);
  window.location.href = `contact.html?plan=${encoded}`;
}

// ===== SCROLL REVEAL ANIMATIONS =====
function revealElements() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealElements);
setTimeout(revealElements, 100);

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  // Initialize EmailJS
  emailjs.init("LK_dyax9fqTqVrw6H");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitButton = contactForm.querySelector(".submit-button");
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML = "✉️ Sending...";
    submitButton.disabled = true;

    // Send email to YOU with form details
    const sendToYou = emailjs.sendForm(
      "service_28t4x8p",
      "template_ns0ydki",
      this
    );

    // Send auto-reply to USER
    const sendToUser = emailjs.sendForm(
      "service_28t4x8p",
      "template_b9bu9c7",
      this
    );

    // Wait for both emails to send
    Promise.all([sendToYou, sendToUser])
      .then(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        alert(
          "✅ Thank you for reaching out! I will get back to you as soon as possible. Check your email for confirmation."
        );
        contactForm.reset();
      })
      .catch((error) => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        alert(
          "❌ Something went wrong. Please try again or email me directly at hello@nptrigunayat.com"
        );
        console.error("EmailJS error:", error);
      });
  });
}

// ===== TESTIMONIAL CAROUSEL AUTO-SLIDE =====
let currentTestimonial = 0;
let testimonialTrack, testimonialSlides, indicators, totalTestimonials;
let testimonialInterval;

function initCarousel() {
  testimonialTrack = document.getElementById("testimonialTrack");
  testimonialSlides = document.querySelectorAll(".testimonial-slide");
  indicators = document.querySelectorAll(".indicator");
  totalTestimonials = testimonialSlides.length;

  console.log("Carousel initialized:", {
    track: !!testimonialTrack,
    slides: testimonialSlides.length,
    indicators: indicators.length,
  });
}

function updateCarousel() {
  if (!testimonialTrack || !testimonialSlides.length) return;

  const offset = -currentTestimonial * 100;
  testimonialTrack.style.transform = `translateX(${offset}%)`;

  // Update indicators
  indicators.forEach((indicator, index) => {
    if (index === currentTestimonial) {
      indicator.classList.add("active");
      indicator.style.background = "var(--color-primary)";
      indicator.style.width = "32px";
      indicator.style.borderRadius = "6px";
    } else {
      indicator.classList.remove("active");
      indicator.style.background = "var(--color-border)";
      indicator.style.width = "12px";
      indicator.style.borderRadius = "50%";
    }
  });
}

function nextTestimonial() {
  if (!totalTestimonials) return;
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
  updateCarousel();
}

function setupCarousel() {
  initCarousel();

  // Manual navigation with indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentTestimonial = index;
      updateCarousel();
      clearInterval(testimonialInterval);
      testimonialInterval = setInterval(nextTestimonial, 5000);
    });
  });

  // Auto-advance every 5 seconds
  testimonialInterval = setInterval(nextTestimonial, 5000);

  // Initial update
  updateCarousel();

  // Pause on hover
  const carouselElement = document.getElementById("testimonialCarousel");
  if (carouselElement) {
    carouselElement.addEventListener("mouseenter", () => {
      clearInterval(testimonialInterval);
    });

    carouselElement.addEventListener("mouseleave", () => {
      testimonialInterval = setInterval(nextTestimonial, 5000);
    });
  }
}

// Call when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupCarousel);
} else {
  setupCarousel();
}

// ===== PLAN & MESSAGE AUTO-FILL =====
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const planParam = params.get("plan");
  if (planParam) {
    const planSelect = document.getElementById("selectedPlan");
    if (planSelect) planSelect.value = planParam;
  }

  const messageParam = params.get("message");
  if (messageParam) {
    const messageField = document.getElementById("message");
    if (messageField) messageField.value = messageParam;
  }
});

// ============================================================================================================
// =========================================== FAQs Page JS ===================================================
// ============================================================================================================

function closeFAQ(item) {
  const answer = item.querySelector(".faq-answer");

  // If it's already closed, do nothing
  if (!item.classList.contains("active")) return;

  // Set current height first (so closing animates smoothly from current size)
  answer.style.maxHeight = answer.scrollHeight + "px";
  answer.offsetHeight; // force reflow

  // Then animate to 0
  item.classList.remove("active");
  answer.style.maxHeight = "0px";
}

function openFAQ(item) {
  const answer = item.querySelector(".faq-answer");

  item.classList.add("active");

  answer.style.maxHeight = "0px";
  answer.offsetHeight;

  // 24px bottom padding + a little buffer
  answer.style.maxHeight = answer.scrollHeight + 32 + "px";

  answer.addEventListener(
    "transitionend",
    (e) => {
      if (
        e.propertyName === "max-height" &&
        item.classList.contains("active")
      ) {
        answer.style.maxHeight = "none";
      }
    },
    { once: true }
  );
}

function toggleFAQ(button) {
  const item = button.parentElement;

  // Close others
  document.querySelectorAll(".faq-item").forEach((faq) => {
    if (faq !== item) closeFAQ(faq);
  });

  // Toggle current
  if (item.classList.contains("active")) {
    closeFAQ(item);
  } else {
    openFAQ(item);
  }
}

// ============================================================================================================
// ============================================ T&C Page JS ===================================================
// ============================================================================================================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = [...document.querySelectorAll(".terms-nav-link")];
  const linkById = new Map(
    navLinks
      .map((a) => [a.getAttribute("href")?.slice(1), a])
      .filter(([id]) => id)
  );

  const sections = [...document.querySelectorAll(".terms-section")].filter(
    (s) => linkById.has(s.id)
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((a) => a.classList.remove("active"));
      linkById.get(visible.target.id)?.classList.add("active");
    },
    {
      root: null,
      threshold: [0.15, 0.25, 0.4],
      rootMargin: "-120px 0px -60% 0px",
    }
  );

  sections.forEach((s) => observer.observe(s));

  // Toggle Logic (if needed in future)
  const toggleBtn = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("termsSidebar");
  const closeBtn = document.getElementById("sidebarClose");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidebar.style.display = "block";
      // Note: CSS !important in mobile query will override this unless removed
    });
  }
});
