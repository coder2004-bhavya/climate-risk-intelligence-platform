document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const root = document.querySelector(':root');
    const body = document.body;

    // Check Local Storage for Theme Preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '🌙'; 
    } else {
        if (themeToggleBtn) themeToggleBtn.innerHTML = '☀️';
    }

    // Toggle Functionality
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            
            // Update Icon
            themeToggleBtn.innerHTML = isLight ? '🌙' : '☀️';
            
            // Save Preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Form Submission Loader (For Predict Buttons)
    const predictForm = document.querySelector('form[action="/predict"]');
    if (predictForm) {
        predictForm.addEventListener('submit', function(e) {
            const btn = this.querySelector('button[type="submit"]');
            if (btn) {
                // Prevent double submissions visually
                btn.innerHTML = '<span class="spinner"></span> Predicting...';
                btn.style.opacity = '0.8';
                btn.style.cursor = 'wait';
                // Note: We do not e.preventDefault() because we want the form to submit to Flask.
            }
        });
    }
});
