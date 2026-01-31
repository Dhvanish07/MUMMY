/* ========================================
   CHAT MANAGER - Frontend Chat Interface
   Handles UI, messaging, and interactions
   ======================================== */

class ChatManager {
    constructor() {
        this.service = window.chatbotService;
        this.isOpen = false;
        this.inputElement = null;
        this.messagesContainer = null;
        this.initializeUI();
    }

    // Initialize chat UI
    initializeUI() {
        this.createChatButton();
        this.createChatModal();
        this.attachEventListeners();
        console.log('💬 Chat Manager initialized');
    }

    // Create chat button in header
    createChatButton() {
        const button = document.createElement('button');
        button.id = 'chat-button';
        button.className = 'chat-button';
        button.innerHTML = '💬';
        button.title = 'Chat with MUMMY';
        
        // Add to body (fixed position)
        document.body.appendChild(button);
        
        console.log('✅ Chat button created and added to DOM');
        button.addEventListener('click', () => {
            console.log('🔘 Chat button clicked! isOpen:', this.isOpen);
            this.toggleChat();
        });
    }

    // Create chat modal
    createChatModal() {
        const modal = document.createElement('div');
        modal.id = 'chat-modal';
        modal.className = 'chat-modal';
        modal.innerHTML = `
            <div class="chat-container">
                <div class="chat-header">
                    <div class="chat-title">
                        <span class="chat-icon">👩</span>
                        <h3>MUMMY</h3>
                    </div>
                    <button class="chat-close-btn">&times;</button>
                </div>
                
                <div class="chat-user-info">
                    <div class="user-greeting"></div>
                </div>
                
                <div class="chat-messages" id="chat-messages">
                    <div class="message bot-message">
                        <div class="message-content">
                            <p id="initial-greeting"></p>
                        </div>
                        <span class="message-time"></span>
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <input 
                        type="text" 
                        id="chat-input" 
                        class="chat-input" 
                        placeholder="Tell me something..." 
                        autocomplete="off"
                    />
                    <button class="chat-send-btn">Send</button>
                </div>
                
                <div class="chat-quick-actions">
                    <button class="quick-action" data-action="mood">Mood Check</button>
                    <button class="quick-action" data-action="diet">Diet Tip</button>
                    <button class="quick-action" data-action="health">Health Tip</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Store references
        this.inputElement = document.getElementById('chat-input');
        this.messagesContainer = document.getElementById('chat-messages');
        
        // Set initial greeting
        const greeting = this.service.getGreeting();
        document.getElementById('initial-greeting').textContent = greeting;
        
        // Set user greeting if name exists
        if (this.service.userData.userProfile.name) {
            document.querySelector('.user-greeting').innerHTML = 
                `<p>Welcome back, <strong>${this.service.userData.userProfile.name}</strong>! 💕</p>`;
        }
    }

    // Attach event listeners
    attachEventListeners() {
        // Close button
        const closeBtn = document.querySelector('.chat-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.toggleChat());
        }
        
        // Send button
        const sendBtn = document.querySelector('.chat-send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        // Enter key
        if (this.inputElement) {
            this.inputElement.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
        
        // Quick action buttons
        document.querySelectorAll('.quick-action').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuickAction(e.target.dataset.action));
        });
        
        console.log('✅ All event listeners attached');
    }

    // Toggle chat window
    toggleChat() {
        const modal = document.getElementById('chat-modal');
        if (!modal) {
            console.error('❌ Chat modal not found in DOM!');
            return;
        }
        
        this.isOpen = !this.isOpen;
        console.log('🔄 Toggle chat - isOpen:', this.isOpen);
        
        if (this.isOpen) {
            modal.classList.add('open');
            console.log('✅ Modal opened - classes:', modal.className);
            if (this.inputElement) {
                this.inputElement.focus();
                this.scrollToBottom();
            }
        } else {
            modal.classList.remove('open');
            console.log('✅ Modal closed - classes:', modal.className);
        }
    }

    // Send message
    async sendMessage() {
        const message = this.inputElement.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.displayMessage(message, 'user');
        this.service.addMessage('user', message, 'user_input', 'neutral');
        
        // Clear input
        this.inputElement.value = '';
        
        // Show typing indicator
        this.displayMessage('...', 'bot-typing');
        
        // Generate bot response (now async with AI)
        try {
            const response = await this.service.generateResponse(message);
            // Remove typing indicator
            const typingMsg = this.messagesContainer.querySelector('.bot-typing');
            if (typingMsg) typingMsg.remove();
            // Display response
            this.displayMessage(response, 'bot');
            this.scrollToBottom();
        } catch (error) {
            console.error('Error getting response:', error);
            const typingMsg = this.messagesContainer.querySelector('.bot-typing');
            if (typingMsg) typingMsg.remove();
            this.displayMessage('Sorry beta, kuch problem hua. Try again! 💕', 'bot');
        }
    }

    // Display message in chat
    displayMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        if (sender === 'bot-typing') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></p>
                </div>
                <span class="message-time">${time}</span>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${this.escapeHtml(text)}</p>
                </div>
                <span class="message-time">${time}</span>
            `;
        }
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    // Handle quick action buttons
    handleQuickAction(action) {
        let message = '';
        
        switch(action) {
            case 'mood':
                message = "How's my mood today?";
                break;
            case 'diet':
                message = "Give me a diet tip";
                break;
            case 'health':
                message = "Give me a health tip";
                break;
        }
        
        if (message) {
            this.inputElement.value = message;
            this.sendMessage();
        }
    }

    // Scroll to bottom
    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 0);
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Show user profile setup modal
    showProfileSetup() {
        const modal = document.createElement('div');
        modal.className = 'profile-setup-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Let's get to know each other! 👋</h2>
                <form id="profile-form">
                    <div class="form-group">
                        <label for="name">What's your name?</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="age">Age?</label>
                        <input type="number" id="age" name="age" min="1" max="120">
                    </div>
                    <div class="form-group">
                        <label for="health">Any health concerns?</label>
                        <select id="health" name="health">
                            <option value="">None</option>
                            <option value="diabetic">Diabetic</option>
                            <option value="hypertension">Hypertension</option>
                            <option value="weight">Weight Issues</option>
                            <option value="cholesterol">Cholesterol</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-primary">Let's Chat! 💬</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('profile-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            this.service.updateUserProfile({
                name: formData.get('name'),
                age: formData.get('age'),
                health_status: formData.get('health') || 'unknown'
            });
            modal.remove();
            this.displayMessage(`Nice to meet you, ${formData.get('name')}! 💕`, 'bot');
        });
    }

    // Get summary of recent chat
    getSummary() {
        return this.service.generateConversationSummary();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.chatManager = new ChatManager();
    
    // Show profile setup if new user
    if (!window.chatbotService.userData.userProfile.name) {
        setTimeout(() => window.chatManager.showProfileSetup(), 1000);
    }
});
