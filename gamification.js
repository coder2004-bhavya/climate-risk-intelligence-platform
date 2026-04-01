document.addEventListener('DOMContentLoaded', () => {
    // Add Eco-Badge container to navbar if not exists
    const nav = document.querySelector('body > button#theme-toggle');
    if (nav) {
        const badgeContainer = document.createElement('div');
        badgeContainer.id = 'eco-badge-container';
        badgeContainer.style.position = 'absolute';
        badgeContainer.style.top = '22px';
        badgeContainer.style.right = '70px';
        badgeContainer.style.display = 'flex';
        badgeContainer.style.gap = '8px';
        badgeContainer.style.zIndex = '100';
        nav.parentElement.insertBefore(badgeContainer, nav);
    }

    const updateBadges = () => {
        const predictionsCount = parseInt(localStorage.getItem('predictionsCount') || '0', 10);
        let badgesHTML = '';
        
        if (predictionsCount >= 1) {
            badgesHTML += '<span title="First Prediction! 🌍" class="eco-badge animate-pop" style="font-size: 1.5rem; cursor: help; transition: transform 0.3s;">🌍</span>';
        }
        if (predictionsCount >= 5) {
            badgesHTML += '<span title="Climate Explorer! 🌿" class="eco-badge animate-pop" style="font-size: 1.5rem; cursor: help; transition: transform 0.3s;">🌿</span>';
        }
        if (predictionsCount >= 10) {
            badgesHTML += '<span title="Eco Warrior! 🏆" class="eco-badge animate-pop" style="font-size: 1.5rem; cursor: help; transition: transform 0.3s;">🏆</span>';
        }

        const container = document.getElementById('eco-badge-container');
        if (container) {
            container.innerHTML = badgesHTML;
        }
    };

    // Listen for form submissions on predict-form
    const predictForm = document.getElementById('predict-form');
    if (predictForm) {
        predictForm.addEventListener('submit', () => {
            let count = parseInt(localStorage.getItem('predictionsCount') || '0', 10);
            localStorage.setItem('predictionsCount', count + 1);
            // Wait for prediction to finish visually before badging
            setTimeout(updateBadges, 1500); 
        });
    }

    updateBadges();
});
