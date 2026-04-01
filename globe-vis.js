document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('climate3DMap');
    if (!mapContainer) return; // Only run on dashboard

    // Load Globe.gl dynamically
    const script = document.createElement('script');
    script.src = "https://unpkg.com/globe.gl";
    script.onload = () => {
        // Sample random dummy climate anomaly data (simulating heatwaves/storms)
        const N = 80;
        const gData = [...Array(N).keys()].map(() => ({
            lat: (Math.random() - 0.5) * 180,
            lng: (Math.random() - 0.5) * 360,
            maxR: Math.random() * 15 + 3,
            propagationSpeed: (Math.random() - 0.5) * 10 + 1,
            repeatPeriod: Math.random() * 2000 + 400
        }));

        const colorInterpolator = t => `rgba(255, 60, 60,${Math.sqrt(1-t)})`;

        const world = Globe()(mapContainer)
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
            .ringsData(gData)
            .ringColor(() => colorInterpolator)
            .ringMaxRadius('maxR')
            .ringPropagationSpeed('propagationSpeed')
            .ringRepeatPeriod('repeatPeriod')
            .backgroundColor('rgba(0,0,0,0)');

        // Settings
        world.controls().autoRotate = true;
        world.controls().autoRotateSpeed = 0.8;
        
        // Responsive resize
        const resizeGlobe = () => {
            if(world && mapContainer) {
                world.width(mapContainer.clientWidth);
                world.height(400); // Fixed height for dashboard card
            }
        };

        window.addEventListener('resize', resizeGlobe);
        
        // Initial setup
        setTimeout(resizeGlobe, 500);
    };
    document.head.appendChild(script);
});
