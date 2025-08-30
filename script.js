document.addEventListener('DOMContentLoaded', () => {

    // Helper function to check if an element is in the viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    };

    // --- 1. Skill Progress Bar Animation ---
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateSkills = () => {
        progressBars.forEach(bar => {
            if (isInViewport(bar) && !bar.classList.contains('animated')) {
                const progressValue = bar.getAttribute('data-progress');
                bar.style.width = progressValue;
                bar.classList.add('animated');
            }
        });
    };

    // --- 2. Section Fade-In Animation ---
    const sections = document.querySelectorAll('.section');
    const animateSections = () => {
        sections.forEach(sec => {
            if (isInViewport(sec) && !sec.classList.contains('show')) {
                sec.classList.add('show');
            }
        });
    };

    // --- 3. Navbar Sticky Effect and Active Link ---
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const handleSticky = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    };
    
    // --- 4. Hamburger Menu Functionality (for mobile) ---
    const navToggle = document.querySelector('.nav-toggle');
    const navUl = document.querySelector('.nav-links ul');

    navToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navUl.classList.contains('active'));
    });

    // Close mobile menu when a link is clicked
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // --- 5. Hide/Show Header on Scroll ---
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 150) {
            // Scrolling Down
            navbar.classList.add('header-hidden');
        } else {
            // Scrolling Up
            navbar.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;

        // Keep active link on scroll
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.clientHeight;
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sec.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // --- 6. Initial Animations and Event Listeners ---
    // Combined scroll handler to avoid multiple event listeners
    const onScroll = () => {
        animateSkills();
        animateSections();
        handleSticky();
    };
    
    window.addEventListener('scroll', onScroll);

    // Animate on initial load
    onScroll();
});