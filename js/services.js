// Final Fixed Solution
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesGrid = document.querySelector('.services-grid');
    
    // التأكد من أن جميع البطاقات لديها class "all"
    serviceCards.forEach(card => {
        if (!card.classList.contains('all')) {
            card.classList.add('all');
        }
    });
    
    // دالة لتصفية الخدمات
    function filterServices(category) {
        let visibleCards = 0;
        
        serviceCards.forEach((card, index) => {
            const shouldShow = category === 'all' || card.classList.contains(category);
            
            if (shouldShow) {
                card.style.display = 'block';
                // تأخير بسيط للرسوم المتحركة
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
                visibleCards++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // تعديل ارتفاع الحاوية بناءً على عدد البطاقات المرئية
        if (servicesGrid) {
            const rows = Math.ceil(visibleCards / 3);
            servicesGrid.style.minHeight = `${rows * 400}px`;
        }
    }
    
    // إضافة أحداث النقر للأزرار
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة active من الكل
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            
            // إضافة active للزر المختار
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // تطبيق التصفية
            const category = this.dataset.tab;
            filterServices(category);
        });
    });
    
    // تفعيل زر "الكل" افتراضياً
    const allBtn = document.querySelector('[data-tab="all"]');
    if (allBtn) {
        allBtn.classList.add('active');
        allBtn.setAttribute('aria-selected', 'true');
    }
    
    // Optional: Reset to "all" when clicking logo or home
    const resetTabs = () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('[data-tab="all"]');
        if (allBtn) {
            allBtn.classList.add('active');
            filterServices('all');
        }
    };
    
    // يمكنك ربط هذه الدالة بزر في موقعك
     // Add new tab for design services
    const servicesTabs = document.querySelector('.services-tabs');
    const designTab = document.createElement('button');
    designTab.className = 'tab-btn';
    designTab.setAttribute('data-tab', 'design');
    designTab.textContent = 'التصميم';
    
    // Add the new tab (optional, if not already in HTML)
    if (!document.querySelector('[data-tab="design"]')) {
        servicesTabs.appendChild(designTab);
    }
    
    // Update filtering function
    function filterServices(category) {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // Show all or matching category
            if (category === 'all' || card.classList.contains(category)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    // document.querySelector('.nav-logo').addEventListener('click', resetTabs);
});