// Portfolio Filtering and Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const loadMoreBtn = document.querySelector('.btn-load-more');
    
    // Function to filter portfolio items
    function filterPortfolio(category) {
        let visibleCount = 0;
        
        portfolioCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            // Show all or matching category
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Update project count in load more button
        if (loadMoreBtn) {
            const remainingProjects = portfolioCards.length - visibleCount;
            const projectCount = loadMoreBtn.querySelector('.project-count');
            if (projectCount && remainingProjects > 0) {
                projectCount.textContent = `(${remainingProjects} مشاريع إضافية)`;
                loadMoreBtn.style.display = 'flex';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }
    
    // Add click events to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter category and apply filter
            const category = this.getAttribute('data-filter');
            filterPortfolio(category);
            
            // Store filter in localStorage
            localStorage.setItem('portfolioFilter', category);
        });
    });
    
    // Restore filter from localStorage
    const savedFilter = localStorage.getItem('portfolioFilter');
    if (savedFilter) {
        const savedBtn = document.querySelector(`[data-filter="${savedFilter}"]`);
        if (savedBtn) {
            savedBtn.click();
        }
    }
    
    // Load More Projects
    if (loadMoreBtn) {
        let visibleProjects = 3; // Show 3 projects initially
        
        function showMoreProjects() {
            const allProjects = Array.from(portfolioCards);
            const hiddenProjects = allProjects.slice(visibleProjects, visibleProjects + 3);
            
            hiddenProjects.forEach((project, index) => {
                setTimeout(() => {
                    project.style.display = 'block';
                    project.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 200);
            });
            
            visibleProjects += 3;
            
            // Hide button if all projects are shown
            if (visibleProjects >= portfolioCards.length) {
                loadMoreBtn.style.display = 'none';
            }
        }
        
        loadMoreBtn.addEventListener('click', showMoreProjects);
        
        // Initially show only 3 projects
        portfolioCards.forEach((project, index) => {
            if (index >= visibleProjects) {
                project.style.display = 'none';
            }
        });
    }
    
    // Hover effects for project cards
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.project-badge');
            if (badge) {
                badge.style.transform = 'translateY(-5px)';
                badge.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.project-badge');
            if (badge) {
                badge.style.transform = 'translateY(0)';
                badge.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });
    });
    
    // Animate tech tags on hover
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });


    // Canva Portfolio Functionality

    // Initialize Canva slideshow
    const canvaSlides = document.querySelectorAll('.canva-slide');
    if (canvaSlides.length > 0) {
        let currentSlide = 0;
        
        function showNextSlide() {
            // Hide all slides
            canvaSlides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Show next slide
            currentSlide = (currentSlide + 1) % canvaSlides.length;
            canvaSlides[currentSlide].classList.add('active');
        }
        
        // Start slideshow
        setInterval(showNextSlide, 3000);
    }
    
    // Filter Canva projects
    const designFilter = document.querySelector('[data-filter="design"]');
    if (designFilter) {
        designFilter.addEventListener('click', function() {
            const portfolioCards = document.querySelectorAll('.portfolio-card');
            portfolioCards.forEach(card => {
                if (card.getAttribute('data-category') === 'design') {
                    // Add special animation for Canva cards
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                    card.style.animationDelay = '0.2s';
                }
            });
        });
    }
    
    // Download Canva templates
    document.querySelectorAll('.project-link .fa-download').forEach(link => {
        link.closest('.project-link').addEventListener('click', function(e) {
            const projectCard = this.closest('.portfolio-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            
            // Show download confirmation
            const confirmDownload = confirm(`هل تريد تنزيل ملفات مشروع "${projectTitle}"؟`);
            if (confirmDownload) {
                // Simulate download process
                const downloadBtn = this;
                const originalHTML = downloadBtn.innerHTML;
                downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    alert('بدأ تنزيل الملفات...');
                    downloadBtn.innerHTML = originalHTML;
                }, 1000);
            }
            e.preventDefault();
        });
    });

});