// Navigation with persistent active state
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Store current active section
    let currentActiveSection = '';
    
    // Function to update active link
    function updateActiveLink(sectionId) {
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current section link
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            currentActiveSection = sectionId;
            
            // Save to localStorage
            localStorage.setItem('activeNavSection', sectionId);
        }
    }
    
    // Function to check which section is in view
    function checkScroll() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Check if section is in view
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // If we found a section, update active link
        if (currentSection && currentSection !== currentActiveSection) {
            updateActiveLink(currentSection);
        } else if (!currentSection && scrollPosition < 100) {
            // If at top of page, activate home
            updateActiveLink('hero');
        }
    }
    
    // Function to handle link click
    function handleLinkClick(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Update active link immediately
            updateActiveLink(targetId);
            
            // Smooth scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            // Update URL
            history.pushState(null, null, `#${targetId}`);
        }
    }
    
    // Initialize on page load
    function init() {
        // Check if there's a saved active section
        const savedSection = localStorage.getItem('activeNavSection');
        const hash = window.location.hash.substring(1);
        
        if (hash) {
            // If URL has hash, activate that section
            updateActiveLink(hash);
        } else if (savedSection && window.scrollY > 100) {
            // If we have saved section and not at top
            updateActiveLink(savedSection);
        } else {
            // Otherwise activate home
            updateActiveLink('hero');
        }
        
        // Check initial scroll position
        checkScroll();
    }
    
    // Add event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
    
    // Update on scroll with debounce
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkScroll, 50);
    });
    
    // Handle hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target)) {
                navLinksContainer.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
    
    // Handle browser back/forward
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            updateActiveLink(hash);
            const targetSection = document.getElementById(hash);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'auto'
                });
            }
        } else {
            updateActiveLink('hero');
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    });
    
    // Initialize
    init();
});