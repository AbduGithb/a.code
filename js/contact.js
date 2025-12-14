// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('attachment');
    const fileList = document.getElementById('fileList');
    const responseMessage = document.getElementById('responseMessage');
    
    // File Upload Functionality
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--secondary-color)';
        uploadArea.style.background = 'rgba(52, 152, 219, 0.05)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#cbd5e1';
        uploadArea.style.background = '';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#cbd5e1';
        uploadArea.style.background = '';
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            updateFileList();
        }
    });
    
    fileInput.addEventListener('change', updateFileList);
    
    function updateFileList() {
        fileList.innerHTML = '';
        const files = Array.from(fileInput.files);
        
        files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>${file.name} (${formatBytes(file.size)})</span>
                <button type="button" onclick="removeFile(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            fileList.appendChild(fileItem);
        });
    }
    
    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    window.removeFile = function(index) {
        const dt = new DataTransfer();
        const files = Array.from(fileInput.files);
        
        files.forEach((file, i) => {
            if (i !== index) dt.items.add(file);
        });
        
        fileInput.files = dt.files;
        updateFileList();
    };
    
    // Form Submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success message
            responseMessage.className = 'response-message success';
            responseMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h4>تم إرسال رسالتك بنجاح!</h4>
                <p>سأرد عليك في أقرب وقت ممكن خلال 24 ساعة.</p>
            `;
            responseMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            fileList.innerHTML = '';
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Scroll to response message
            responseMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide message after 10 seconds
            setTimeout(() => {
                responseMessage.style.display = 'none';
            }, 10000);
            
        }, 2000);
    });
    
    // Service selection effect
    const serviceSelect = document.getElementById('service');
    const budgetSelect = document.getElementById('budget');
    
    serviceSelect.addEventListener('change', function() {
        if (this.value) {
            this.style.borderColor = '#10b981';
            this.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
        }
    });
    
    // Budget selection effect
    budgetSelect.addEventListener('change', function() {
        if (this.value) {
            this.style.borderColor = '#f59e0b';
            this.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
        }
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('966')) {
            value = '+966 ' + value.substring(3);
        }
        e.target.value = value;
    });
});