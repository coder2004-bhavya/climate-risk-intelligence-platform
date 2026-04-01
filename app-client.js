// Client-side App Logic for Node.js Integration
document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup WebSockets for Real-time Alerts
    const socket = io(); // Connects to the same origin (Node.js port 3000)
    
    socket.on('climate_alert', (data) => {
        showToastAlert(data.type, data.message);
    });

    function showToastAlert(type, message) {
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.style.position = 'fixed';
            toastContainer.style.top = '20px';
            toastContainer.style.left = '50%';
            toastContainer.style.transform = 'translateX(-50%)';
            toastContainer.style.zIndex = '9999';
            toastContainer.style.display = 'flex';
            toastContainer.style.flexDirection = 'column';
            toastContainer.style.gap = '10px';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `glass-panel toast ${type}`;
        toast.style.padding = '15px 25px';
        toast.style.minWidth = '300px';
        toast.style.animation = 'slideDown 0.5s ease forwards';
        
        let icon = '🔔';
        if (type === 'error') icon = '🚨';
        if (type === 'warning') icon = '⚠️';

        toast.innerHTML = `<strong>${icon} ALERT:</strong> ${message}`;
        toastContainer.appendChild(toast);

        // Remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideUp 0.5s ease forwards';
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }

    // 2. Authentication Logic
    const loginBtn = document.getElementById('nav-login-btn');
    const authModal = document.getElementById('auth-modal');
    const closeAuth = document.getElementById('close-auth');
    const authForm = document.getElementById('auth-form');
    const authError = document.getElementById('auth-error');

    // Check if logged in
    const token = localStorage.getItem('token');
    if (token && loginBtn) {
        loginBtn.textContent = 'Logout';
        loginBtn.onclick = () => {
            localStorage.removeItem('token');
            window.location.reload();
        };
    } else if (loginBtn) {
        loginBtn.onclick = () => authModal.style.display = 'flex';
    }

    if (closeAuth) closeAuth.onclick = () => authModal.style.display = 'none';

    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('auth-username').value;
            const password = document.getElementById('auth-password').value;
            const isRegister = e.submitter.id === 'btn-register';
            
            const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
            
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    authModal.style.display = 'none';
                    window.location.reload();
                } else {
                    authError.textContent = data.error;
                }
            } catch (err) {
                authError.textContent = 'Network error. Try again later.';
            }
        });
    }

    // 3. SPA Prediction Intercept
    const predictForm = document.getElementById('predict-form');
    if (predictForm) {
        predictForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Please log in to run AI predictions.");
                if (authModal) authModal.style.display = 'flex';
                return;
            }

            const submitBtn = predictForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="spinner"></div> Processing AI Model...';
            submitBtn.disabled = true;

            const formData = new FormData(predictForm);
            const dataObj = {};
            formData.forEach((value, key) => (dataObj[key] = value));

            try {
                const response = await fetch('/api/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(dataObj)
                });

                if (response.ok) {
                    const result = await response.json();
                    // Save to local storage and redirect to prediction view
                    localStorage.setItem('latest_prediction', JSON.stringify(result));
                    window.location.href = '/prediction.html';
                } else {
                    alert('Prediction failed. Please try again.');
                }
            } catch (error) {
                console.error("Prediction Error:", error);
                alert("Cannot connect to AI Model Core.");
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // 4. Render Prediction on prediction.html
    const predResultBox = document.getElementById('prediction-result-dynamic');
    const insightsBox = document.getElementById('insights-dynamic');
    if (predResultBox && insightsBox) {
        const data = JSON.parse(localStorage.getItem('latest_prediction'));
        if (data) {
            predResultBox.textContent = data.prediction;
            
            insightsBox.innerHTML = '';
            data.insights.forEach(insight => {
                const div = document.createElement('div');
                div.className = `insight-card ${insight.type}`;
                div.innerHTML = `<h3>${insight.category}</h3><p>${insight.message}</p>`;
                insightsBox.appendChild(div);
            });
        }
    }

    // 5. Fetch and Render Prediction History on Dashboard
    const historyContainer = document.getElementById('history-container');
    if (historyContainer && token) {
        historyContainer.innerHTML = '<div class="spinner" style="margin: 0 auto;"></div>';
        
        fetch('/api/history', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (!data || data.length === 0) {
                historyContainer.innerHTML = 'You have not run any AI predictions yet.';
                return;
            }
            
            let html = '<table style="width: 100%; border-collapse: collapse; text-align: left;">';
            html += '<tr><th style="padding: 10px; border-bottom: 1px solid var(--glass-border);">Date</th>';
            html += '<th style="padding: 10px; border-bottom: 1px solid var(--glass-border);">Input Metrics</th>';
            html += '<th style="padding: 10px; border-bottom: 1px solid var(--glass-border);">AI Prediction Result</th></tr>';
            
            // Sort by latest first
            data.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            data.forEach(item => {
                const date = new Date(item.timestamp).toLocaleString();
                const inputs = `H: ${item.input.humidity}% | P: ${item.input.pressure_mb} mb | W: ${item.input.wind_kph} kph | C: ${item.input.cloud}% | UV: ${item.input.uv_index}`;
                
                html += `<tr>
                    <td style="padding: 10px; border-bottom: 1px solid var(--glass-border);">${date}</td>
                    <td style="padding: 10px; border-bottom: 1px solid var(--glass-border);">${inputs}</td>
                    <td style="padding: 10px; border-bottom: 1px solid var(--glass-border); font-weight: bold; color: var(--primary-color);">${item.output.prediction}</td>
                </tr>`;
            });
            html += '</table>';
            historyContainer.innerHTML = html;
        })
        .catch(err => {
            console.error('History Error:', err);
            historyContainer.innerHTML = 'Failed to load history.';
        });
    }

});
