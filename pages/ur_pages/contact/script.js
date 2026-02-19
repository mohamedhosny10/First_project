// TechUp Contact Form Handler

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.btn-send');
      const originalContent = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="icon-loader" style="animation: spin 1s linear infinite;"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        // Success message
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        
        // Reset form
        form.reset();
        
        // Restore button
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
});

// Add spinner animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
