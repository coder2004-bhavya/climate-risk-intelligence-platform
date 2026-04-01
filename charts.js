document.addEventListener('DOMContentLoaded', () => {

    // --- Chart.js Global Defaults for Glassmorphism Theme ---
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Outfit', sans-serif";
    Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.1)';

    // 1. Temperature Trend Chart
    const tempCtx = document.getElementById("tempChart");
    if (tempCtx) {
        new Chart(tempCtx.getContext("2d"), {
            type: "line",
            data: {
                labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
                datasets: [{
                    label: "Global Temp Anomaly (°C)",
                    data: [0.87, 0.91, 0.92, 0.98, 1.02, 1.1, 1.2, 1.25, 1.34],
                    borderColor: '#00d2ff',
                    backgroundColor: 'rgba(0, 210, 255, 0.2)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4 // Smooth curves
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                }
            }
        });
    }

    // 2. Carbon Emissions Chart
    const emCtx = document.getElementById("emissionsChart");
    if (emCtx) {
        new Chart(emCtx.getContext("2d"), {
            type: "bar",
            data: {
                labels: ["Energy", "Transport", "Industry", "Agriculture", "Waste"],
                datasets: [{
                    label: "Emissions by Sector (MtCO2)",
                    data: [13500, 8200, 7500, 4100, 1200],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                    ],
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    // --- 3. Leaflet.js Interactive Climate Map ---
    const mapEl = document.getElementById('climateMap');
    if (mapEl) {
        // Initialize map centered roughly on the Atlantic
        var map = L.map('climateMap').setView([20.0, -30.0], 2);

        // Add a dark-themed CartoDB base map that fits our UI
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Add sample climate risk markers
        var riskIcon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div style='background-color:#ef4444; width:15px; height:15px; border-radius:50%; box-shadow: 0 0 10px #ef4444;'></div>",
            iconSize: [15, 15],
            iconAnchor: [7, 7]
        });

        // Mock hotspots
        L.marker([36.7783, -119.4179], {icon: riskIcon}).addTo(map)
            .bindPopup('<b>California</b><br>High wildfire risk active.');
        L.marker([-8.7832, 34.5085], {icon: riskIcon}).addTo(map)
            .bindPopup('<b>Sub-Saharan Africa</b><br>Severe drought warning.');
        L.marker([23.6850, 90.3563], {icon: riskIcon}).addTo(map)
            .bindPopup('<b>Bangladesh</b><br>Critical sea-level rise zone.');
    }
});
