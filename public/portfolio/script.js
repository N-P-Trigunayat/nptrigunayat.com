document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle Logic ---
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check saved preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        html.classList.remove('dark');
        updateIcon(false);
    } else {
        html.classList.add('dark');
        updateIcon(true);
    }

    function updateIcon(isDark) {
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateIcon(isDark);
    });

    // --- Mobile Menu Logic ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuSpans = menuBtn.querySelectorAll('span');

    menuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            // Close
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.style.overflow = ''; // Enable scroll
            
            // Reset hamburger
            menuSpans[0].style.transform = 'none';
            menuSpans[1].style.opacity = '1';
            menuSpans[2].style.transform = 'none';
        } else {
            // Open
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Lock scroll
            
            // Animate hamburger to X
            menuSpans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            menuSpans[1].style.opacity = '0';
            menuSpans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        }
    });

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Number Counter Animation
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                obs.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .stat-number').forEach(el => {
        observer.observe(el);
    });

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // ms
        const steps = 50;
        const interval = duration / steps;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = target;
                clearInterval(timer);
            } else {
                el.innerText = Math.ceil(current);
            }
        }, interval);
    }
});

// --- Toast Notification Helper ---
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}
