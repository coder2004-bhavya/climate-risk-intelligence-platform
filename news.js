document.addEventListener('DOMContentLoaded', async () => {
    // Define the RSS feed for climate news
    const rssFeedUrl = "https://www.sciencedaily.com/rss/earth_climate/climate.xml";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
            // Create news ticker HTML at bottom of the body
            const tickerContainer = document.createElement('div');
            tickerContainer.className = 'news-ticker-container';
            
            const tickerBanner = document.createElement('div');
            tickerBanner.className = 'news-ticker-banner';
            tickerBanner.innerHTML = '<strong><span style="color:var(--accent-color)">Live</span> News:</strong>';
            
            const tickerWrap = document.createElement('div');
            tickerWrap.className = 'news-ticker-wrap';
            
            let headlinesHTML = '';
            data.items.slice(0, 8).forEach(item => {
                headlinesHTML += `<a class="ticker-item" href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>`;
                headlinesHTML += `<span class="ticker-dot">•</span>`;
            });
            
            const itemsDiv = document.createElement('div');
            itemsDiv.className = 'news-ticker-items';
            itemsDiv.innerHTML = headlinesHTML + headlinesHTML; // Duplicate for smooth infinite scroll
            
            tickerWrap.appendChild(itemsDiv);
            tickerContainer.appendChild(tickerBanner);
            tickerContainer.appendChild(tickerWrap);
            
            document.body.appendChild(tickerContainer);
        }
    } catch (error) {
        console.error("Failed to load climate news:", error);
    }
});
