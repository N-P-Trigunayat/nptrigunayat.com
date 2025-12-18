document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. PURE AUTO-THEME LOGIC
  // =========================================
  const html = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle"); // Kept optional if you leave button in HTML
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

  // Define the system preference query
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  // Function to apply theme based on system status
  function applySystemTheme() {
    if (systemPrefersDark.matches) {
      html.classList.add("dark");
      updateIcon(true);
    } else {
      html.classList.remove("dark");
      updateIcon(false);
    }
  }

  // Helper to update icon (Visual feedback only)
  function updateIcon(isDark) {
    if (!themeIcon) return;
    if (isDark) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun"); // Shows Sun icon in Dark Mode
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon"); // Shows Moon icon in Light Mode
    }
  }

  // A. Run immediately on load
  applySystemTheme();

  // B. Listen for live system changes (Real-time auto-switch)
  systemPrefersDark.addEventListener("change", () => {
    applySystemTheme();
  });

  // Event: Toggle Button Click
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = html.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateIcon(isDark);
    });
  }

  // Event: System Preference Change (Auto-switch)
  systemPrefersDark.addEventListener("change", (e) => {
    // Only auto-switch if the user hasn't manually overridden the theme
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches);
    }
  });

  // =========================================
  // 2. MOBILE MENU LOGIC
  // =========================================
  const menuBtn = document.getElementById("menu-btn");
  // FIX: Changed 'mobile-menu' to 'menu' to match your HTML ID
  const mobileMenu = document.getElementById("menu");
  const menuSpans = menuBtn ? menuBtn.querySelectorAll("span") : [];

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      // Check if hidden (using the class list directly)
      const isHidden = mobileMenu.classList.contains("hidden");

      if (isHidden) {
        // OPEN MENU
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("flex");
        document.body.style.overflow = "hidden"; // Lock scroll

        // Animate Hamburger to "X"
        if (menuSpans.length >= 3) {
          menuSpans[0].style.transform = "rotate(45deg) translate(5px, 6px)";
          menuSpans[1].style.opacity = "0";
          menuSpans[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
        }
      } else {
        // CLOSE MENU
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
        document.body.style.overflow = ""; // Unlock scroll

        // Reset Hamburger
        if (menuSpans.length >= 3) {
          menuSpans[0].style.transform = "none";
          menuSpans[1].style.opacity = "1";
          menuSpans[2].style.transform = "none";
        }
      }
    });
  }

  // =========================================
  // 3. SCROLL ANIMATIONS
  // =========================================
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Trigger Number Counter
        if (entry.target.classList.contains("stat-number")) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".fade-up, .stat-number")
    .forEach((el) => observer.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"));
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.innerText = target + "+";
        clearInterval(timer);
      } else {
        el.innerText = Math.ceil(current);
      }
    }, stepTime);
  }
});

// Toast Helper (Global Scope)
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
