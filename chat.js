document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');

    if (!chatToggle || !chatWindow) return; // Exit if chat HTML isn't on the page

    // Toggle Chat Window
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Send Message Logic
    const sendMessage = async () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // 1. Append User Message
        appendMessage(text, 'user');
        chatInput.value = '';
        
        // 2. Show Typing Indicator
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll

        try {
            // 3. Send to Flask Backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();
            
            // 4. Hide Typing Indicator & Append Bot Message
            typingIndicator.style.display = 'none';
            if (data.response) {
                appendMessage(data.response, 'bot');
            } else {
                appendMessage("Error: Could not parse response.", 'error');
            }
        } catch (error) {
            console.error("Chat Error:", error);
            typingIndicator.style.display = 'none';
            appendMessage("Connection error. Please try again later.", 'error');
        }
    };

    // Listeners for Sending
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Helper Function to append messages to the DOM
    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        
        // Insert before the typing indicator
        chatMessages.insertBefore(msgDiv, typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
    }
});
