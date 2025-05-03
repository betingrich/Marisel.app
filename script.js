// Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('active');
    this.querySelectorAll('span').forEach(span => {
        span.classList.toggle('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.remove('active');
        menuToggle.querySelectorAll('span').forEach(span => {
            span.classList.remove('active');
        });
    }
});

// API Call Function
async function callAPI(endpoint, params, method = 'GET') {
    try {
        let url = endpoint;
        if (method === 'GET' && params) {
            url += '?' + new URLSearchParams(params).toString();
        }
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: method !== 'GET' ? JSON.stringify(params) : null
        });
        
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error('API Call Failed:', error);
        throw error;
    }
}

// Status Message Display
function showStatus(message, type = 'info', duration = 3000) {
    const statusDiv = document.createElement('div');
    statusDiv.className = `status-message status-${type}`;
    statusDiv.textContent = message;
    
    const container = document.querySelector('.container') || document.body;
    container.appendChild(statusDiv);
    
    if (duration > 0) {
        setTimeout(() => {
            statusDiv.remove();
        }, duration);
    }
    
    return statusDiv;
}
