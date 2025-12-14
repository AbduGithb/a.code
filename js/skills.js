// تفاعل تفاصيل المهارات
document.addEventListener('DOMContentLoaded', function() {
    // عرض/إخفاء تفاصيل المهارة عند النقر
    document.querySelectorAll('.skill-item').forEach(skill => {
        skill.addEventListener('click', function(e) {
            // منع التنشيط عند النقر على الروابط
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            this.classList.toggle('active');
            const details = this.querySelector('.skill-details');
            if (this.classList.contains('active')) {
                details.style.maxHeight = details.scrollHeight + 'px';
                details.style.opacity = '1';
            } else {
                details.style.maxHeight = '0';
                details.style.opacity = '0';
            }
        });
    });

    // تأثير تحميل أشرطة التقدم
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.level-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item').forEach(skill => {
        observer.observe(skill);
    });

    // إضافة أزرار toggle للتفاصيل على الأجهزة المحمولة
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.skill-item').forEach(skill => {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'skill-toggle';
            toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i> عرض التفاصيل';
            
            const details = skill.querySelector('.skill-details');
            skill.appendChild(toggleBtn);
            
            toggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                skill.classList.toggle('active');
                
                if (skill.classList.contains('active')) {
                    details.style.maxHeight = details.scrollHeight + 'px';
                    details.style.opacity = '1';
                    this.innerHTML = '<i class="fas fa-chevron-up"></i> إخفاء التفاصيل';
                } else {
                    details.style.maxHeight = '0';
                    details.style.opacity = '0';
                    this.innerHTML = '<i class="fas fa-chevron-down"></i> عرض التفاصيل';
                }
            });
        });
    }
});