document.addEventListener('DOMContentLoaded', () => {
    // Inject HTML for a11y widget dynamically
    const a11yHTML = `
        <div id="a11y-widget" class="a11y-widget">
            <button id="a11y-toggle" class="glass-button" aria-label="Accessibility Options" title="Accessibility Focus">♿</button>
            <div id="a11y-menu" class="a11y-menu hidden glass-panel">
                <h4 style="margin-bottom: 0.5rem; text-align: center;">Accessibility</h4>
                <button id="toggle-high-contrast" class="glass-button a11y-btn">High Contrast</button>
                <button id="toggle-large-text" class="glass-button a11y-btn">Large Text</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', a11yHTML);

    const toggleBtn = document.getElementById('a11y-toggle');
    const menu = document.getElementById('a11y-menu');
    const contrastBtn = document.getElementById('toggle-high-contrast');
    const textBtn = document.getElementById('toggle-large-text');

    toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    const body = document.body;

    // Load from local storage
    if(localStorage.getItem('a11y-high-contrast') === 'true') {
        body.classList.add('high-contrast');
        contrastBtn.style.background = 'rgba(255, 255, 255, 0.3)';
    }
    if(localStorage.getItem('a11y-large-text') === 'true') {
        body.classList.add('large-text');
        textBtn.style.background = 'rgba(255, 255, 255, 0.3)';
    }

    contrastBtn.addEventListener('click', () => {
        body.classList.toggle('high-contrast');
        const isActive = body.classList.contains('high-contrast');
        localStorage.setItem('a11y-high-contrast', isActive);
        contrastBtn.style.background = isActive ? 'rgba(255, 255, 255, 0.3)' : '';
    });

    textBtn.addEventListener('click', () => {
        body.classList.toggle('large-text');
        const isActive = body.classList.contains('large-text');
        localStorage.setItem('a11y-large-text', isActive);
        textBtn.style.background = isActive ? 'rgba(255, 255, 255, 0.3)' : '';
    });
});
