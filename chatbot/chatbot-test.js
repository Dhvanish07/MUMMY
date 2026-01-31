/* ========================================
   CHATBOT TEST & DEMO
   Quick verification that chatbot is working
   ======================================== */

// Function to test chatbot in browser console
window.testChatbot = function() {
    console.log('🤖 ===== CHATBOT TEST SUITE =====');
    
    // Test 1: Check if services are loaded
    console.log('\n✅ Test 1: Service Initialization');
    console.log('ChatbotService loaded:', typeof window.ChatbotService === 'function');
    console.log('chatbotService instance exists:', window.chatbotService !== undefined);
    console.log('ChatbotConfig loaded:', typeof window.ChatbotConfig === 'object');
    console.log('ChatManager loaded:', typeof window.ChatManager === 'function');
    console.log('chatManager instance exists:', window.chatManager !== undefined);
    
    // Test 2: User data
    console.log('\n✅ Test 2: User Data');
    const userData = window.chatbotService.userData;
    console.log('User ID:', userData.userProfile.id);
    console.log('User Name:', userData.userProfile.name || 'Not set');
    console.log('Health Status:', userData.userProfile.health_status || 'Not set');
    console.log('Total Messages:', userData.conversationHistory.length);
    
    // Test 3: Generate greeting
    console.log('\n✅ Test 3: Greeting Generation');
    const greeting = window.chatbotService.getGreeting();
    console.log('Current Greeting:', greeting);
    
    // Test 4: Intent detection
    console.log('\n✅ Test 4: Intent Detection');
    const testMessages = [
        'Hello MUMMY',
        'What should I eat?',
        'I feel stressed',
        'Let me exercise'
    ];
    testMessages.forEach(msg => {
        const intent = window.chatbotService.detectIntent(msg);
        console.log(`Message: "${msg}" -> Intent: ${intent}`);
    });
    
    // Test 5: Response generation
    console.log('\n✅ Test 5: Response Generation');
    const response = window.chatbotService.generateResponse('Hi MUMMY, how are you?');
    console.log('Bot Response:', response);
    
    // Test 6: Chat history
    console.log('\n✅ Test 6: Chat History');
    const history = window.chatbotService.getChatHistory(5);
    console.log('Recent messages:', history.length);
    history.forEach((msg, idx) => {
        console.log(`  ${idx + 1}. [${msg.speaker}] ${msg.message.substring(0, 50)}...`);
    });
    
    // Test 7: UI Elements
    console.log('\n✅ Test 7: UI Elements');
    const chatButton = document.getElementById('chat-button');
    const chatModal = document.getElementById('chat-modal');
    console.log('Chat button exists:', chatButton !== null);
    console.log('Chat modal exists:', chatModal !== null);
    console.log('Chat button visible:', chatButton && window.getComputedStyle(chatButton).display !== 'none');
    
    // Test 8: localStorage
    console.log('\n✅ Test 8: LocalStorage');
    const savedData = localStorage.getItem('chatbot_user_data');
    console.log('Data saved in localStorage:', savedData !== null);
    console.log('Data size:', savedData ? (savedData.length / 1024).toFixed(2) + ' KB' : 'N/A');
    
    console.log('\n🎉 ===== TEST COMPLETE =====');
};

// Function to add a test message
window.addTestMessage = function(message) {
    console.log(`📝 Adding test message: "${message}"`);
    window.chatbotService.addMessage('user', message);
    const response = window.chatbotService.generateResponse(message);
    console.log(`🤖 Bot responds: "${response}"`);
    
    if (window.chatManager && window.chatManager.displayMessage) {
        window.chatManager.displayMessage(message, 'user');
        setTimeout(() => {
            window.chatManager.displayMessage(response, 'bot');
        }, 300);
    }
};

// Function to update user profile
window.updateUserTestProfile = function(name, age, health) {
    console.log(`👤 Updating profile: ${name}, Age: ${age}, Health: ${health}`);
    window.chatbotService.updateUserProfile({
        name: name,
        age: age,
        health_status: health
    });
    console.log('✅ Profile updated!');
};

// Function to show chat summary
window.showChatSummary = function() {
    const summary = window.chatbotService.generateConversationSummary();
    console.log('📊 Chat Summary:', summary);
    return summary;
};

// Function to clear user data
window.clearChatHistory = function() {
    if (confirm('⚠️ Are you sure you want to clear all chat history?')) {
        localStorage.removeItem('chatbot_user_data');
        window.chatbotService = new ChatbotService();
        window.chatManager = new ChatManager();
        console.log('✅ Chat history cleared!');
        location.reload();
    }
};

// Function to export user data
window.exportChatData = function() {
    const data = window.chatbotService.userData;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mummy_chatbot_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    console.log('✅ Data exported!');
};

// Function to simulate conversation
window.simulateConversation = function(messages = []) {
    const defaultMessages = [
        'Hi MUMMY!',
        'How are you doing today?',
        'I am feeling a bit tired',
        'What should I eat for lunch?',
        'I like vegetarian food'
    ];
    
    const msgs = messages.length > 0 ? messages : defaultMessages;
    let delay = 0;
    
    msgs.forEach((msg, idx) => {
        setTimeout(() => {
            console.log(`\n📨 Message ${idx + 1}: "${msg}"`);
            window.addTestMessage(msg);
        }, delay);
        delay += 2000;
    });
};

// Function to show detailed analytics
window.showAnalytics = function() {
    window.chatbotService.logAnalytics();
    
    const data = window.chatbotService.userData;
    console.log('\n📊 DETAILED ANALYTICS:');
    console.log('======================');
    
    console.log('\n👤 User Profile:');
    console.log('- Name:', data.userProfile.name || 'Unknown');
    console.log('- Age:', data.userProfile.age || 'Unknown');
    console.log('- Health Status:', data.userProfile.health_status || 'Unknown');
    console.log('- Diet Preference:', data.userProfile.diet_preference || 'Not selected');
    console.log('- Fitness Level:', data.userProfile.fitness_level);
    
    console.log('\n💬 Chat Stats:');
    console.log('- Total Messages:', data.conversationHistory.length);
    console.log('- Total Sessions:', data.interactions.total_sessions);
    console.log('- Active Topics:', data.interactions.active_topics.join(', ') || 'None yet');
    
    console.log('\n😊 Mood History:');
    if (data.userProfile.mood_history.length > 0) {
        const recentMoods = data.userProfile.mood_history.slice(-5);
        recentMoods.forEach((m, idx) => {
            console.log(`  ${idx + 1}. ${m.mood} (${new Date(m.timestamp).toLocaleString()})`);
        });
    } else {
        console.log('  No mood data yet');
    }
    
    console.log('\n❤️ Favorite Foods:');
    if (data.userProfile.favorite_foods.length > 0) {
        console.log(' -', data.userProfile.favorite_foods.join(', '));
    } else {
        console.log('  Not recorded yet');
    }
};

// Print available functions
console.log('🤖 MUMMY Chatbot - Test Functions Available:');
console.log('');
console.log('1️⃣  testChatbot()                  - Run full test suite');
console.log('2️⃣  addTestMessage(message)       - Add a test message');
console.log('3️⃣  updateUserTestProfile(name, age, health) - Update profile');
console.log('4️⃣  showChatSummary()             - Generate conversation summary');
console.log('5️⃣  clearChatHistory()            - Clear all chat data (WARNING!)');
console.log('6️⃣  exportChatData()              - Download chat data as JSON');
console.log('7️⃣  simulateConversation([msgs]) - Run a simulated conversation');
console.log('8️⃣  showAnalytics()               - Show detailed analytics');
console.log('');
console.log('💡 Example: testChatbot() to verify everything is working!');
