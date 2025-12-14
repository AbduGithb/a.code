// Footer Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update current year
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.style.transform = 'translateY(10px)';
        }
    }
    
    if (backToTopBtn) {
        // Initially hide button
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transform = 'translateY(10px)';
        
        // Smooth transition
        backToTopBtn.style.transition = 'all 0.3s ease';
        
        // Show/hide on scroll
        window.addEventListener('scroll', toggleBackToTop);
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Initial check
        toggleBackToTop();
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (!emailInput.value || !isValidEmail(emailInput.value)) {
                showNewsletterMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNewsletterMessage('تم الاشتراك بنجاح! شكراً لك', 'success');
                emailInput.value = '';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showNewsletterMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.newsletter-message');
        if (existingMessage) existingMessage.remove();
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `newsletter-message ${type}`;
        messageEl.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        messageEl.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 15px;
            border-radius: 8px;
            margin-top: 15px;
            font-size: 0.9rem;
            animation: slideIn 0.3s ease;
            ${type === 'success' ? 
                'background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981;' : 
                'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444;'}
        `;
        
        // Insert message
        const newsletter = document.querySelector('.newsletter');
        if (newsletter) {
            newsletter.appendChild(messageEl);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                messageEl.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => messageEl.remove(), 300);
            }, 5000);
        }
    }
    
    // Smooth scroll for footer links
    document.querySelectorAll('.footer-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Social links click tracking
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.getAttribute('title') || 'Social Media';
            console.log(`Clicked on ${platform} link`);
            // Here you can add analytics tracking
        });
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
        
        .footer-links a {
            position: relative;
            overflow: hidden;
        }
        
        .footer-links a::before {
            content: '';
            position: absolute;
            right: -100%;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(52, 152, 219, 0.2), transparent);
            transition: right 0.5s ease;
        }
        
        .footer-links a:hover::before {
            right: 100%;
        }
    `;
    document.head.appendChild(style);
});