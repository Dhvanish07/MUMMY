/* ========================================
   CHATBOT SERVICE CLASS
   Manages conversation logic, memory, and user tracking
   ======================================== */

class ChatbotService {
    constructor() {
        this.config = ChatbotConfig;
        this.userData = this.loadUserData();
        this.currentSession = {
            start_time: Date.now(),
            messages: [],
            topic: null
        };
        this.messageBuffer = [];
        
        // Gemini API Configuration
        this.geminiApiKey = 'AIzaSyCAaZcVrisqY3RgVaI0Tub0_XPGuJRsmqc';
        this.geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
        this.modelName = 'gemini-2.5-flash';
        
        this.initializeService();
    }

    // Initialize the chatbot service
    initializeService() {
        console.log('🤖 Chatbot Service initialized');
        
        // Auto-save conversation every 30 seconds
        setInterval(() => this.autoSaveConversation(), this.config.memorySettings.auto_save_interval);
        
        // Check if user profile needs update
        if (!this.userData.userProfile.name) {
            console.log('New user detected - will request profile info');
        }
    }

    // Load user data from localStorage
    loadUserData() {
        const saved = localStorage.getItem('chatbot_user_data');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error loading user data:', e);
                return this.getDefaultUserData();
            }
        }
        return this.getDefaultUserData();
    }

    // Get default user data structure
    getDefaultUserData() {
        return {
            userProfile: {
                id: `user_${Date.now()}`,
                name: '',
                age: '',
                gender: '',
                health_status: '',
                diet_preference: '',
                fitness_level: 'sedentary',
                favorite_foods: [],
                allergies: [],
                daily_routine: '',
                goals: [],
                preferences: {
                    language: 'hinglish',
                    response_style: 'warm',
                    notification_frequency: 'daily'
                },
                mood_history: [],
                last_interaction: null,
                profile_created_at: Date.now(),
                profile_updated_at: Date.now()
            },
            conversationHistory: [],
            summaries: {
                session_summaries: [],
                weekly_summaries: [],
                monthly_summaries: [],
                user_insights: {
                    health_concerns: [],
                    diet_patterns: [],
                    mood_patterns: [],
                    fitness_patterns: [],
                    behavioral_insights: []
                }
            },
            interactions: {
                total_messages: 0,
                total_sessions: 0,
                last_session_date: null,
                active_topics: [],
                frequency_topics: {}
            },
            health_tracking: {
                meal_log: [],
                mood_log: [],
                activity_log: [],
                water_intake: [],
                sleep_log: [],
                health_reminders: []
            }
        };
    }

    // Save user data to localStorage
    saveUserData() {
        localStorage.setItem('chatbot_user_data', JSON.stringify(this.userData));
        console.log('💾 User data saved to localStorage');
    }

    // Auto-save conversation
    autoSaveConversation() {
        if (this.messageBuffer.length > 0) {
            this.userData.conversationHistory.push(...this.messageBuffer);
            this.messageBuffer = [];
            this.saveUserData();
        }
    }

    // Add message to conversation
    addMessage(speaker, message, type = 'general', sentiment = 'neutral') {
        const msg = {
            id: `msg_${Date.now()}`,
            timestamp: Date.now(),
            speaker: speaker, // 'user' or 'bot'
            message: message,
            type: type,
            sentiment: sentiment
        };

        this.messageBuffer.push(msg);
        
        // Limit history to configured max
        if (this.userData.conversationHistory.length >= this.config.memorySettings.max_history) {
            this.userData.conversationHistory.shift();
        }

        return msg;
    }

    // Generate response based on user message - Now using Gemini AI
    async generateResponse(userMessage) {
        try {
            // Detect intent and topic for tracking and fallback
            const intent = this.detectIntent(userMessage);
            const topic = this.detectTopic(userMessage);
            const sentiment = this.analyzeSentiment(userMessage);

            // Update tracking
            this.userData.interactions.active_topics.push(topic);
            this.currentSession.topic = topic;

            // Try to get AI-powered response from Gemini API
            let response = await this.callGeminiAPI(userMessage);

            // If API fails, fall back to contextual responses
            if (!response) {
                console.warn('⚠️ Using fallback contextual response');
                response = this.buildResponse(intent, topic, sentiment, userMessage);
            }

            // Track response
            this.addMessage('bot', response, intent, 'positive');

            // Update user profile if extracting info
            this.extractAndUpdateUserInfo(userMessage);

            return response;
        } catch (error) {
            console.error('❌ Error in generateResponse:', error);
            // Fallback to basic response
            const intent = this.detectIntent(userMessage);
            const topic = this.detectTopic(userMessage);
            const sentiment = this.analyzeSentiment(userMessage);
            const fallbackResponse = this.buildResponse(intent, topic, sentiment, userMessage);
            this.addMessage('bot', fallbackResponse, intent, 'positive');
            return fallbackResponse;
        }
    }

    // Detect user intent
    detectIntent(message) {
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('namaste')) {
            return 'greeting';
        } else if (lowerMsg.includes('fever') || lowerMsg.includes('sick') || lowerMsg.includes('ill') || lowerMsg.includes('pain') || lowerMsg.includes('ache') || lowerMsg.includes('hurt') || lowerMsg.includes('cold') || lowerMsg.includes('cough')) {
            return 'sympathy';  // Special handling for health issues
        } else if (lowerMsg.includes('eat') || lowerMsg.includes('food') || lowerMsg.includes('meal')) {
            return 'diet_suggestion';
        } else if (lowerMsg.includes('exercise') || lowerMsg.includes('gym') || lowerMsg.includes('workout')) {
            return 'fitness_suggestion';
        } else if (lowerMsg.includes('mood') || lowerMsg.includes('feel') || lowerMsg.includes('sad') || lowerMsg.includes('happy') || lowerMsg.includes('stressed') || lowerMsg.includes('worried')) {
            return 'mood_check';
        } else if (lowerMsg.includes('tired') || lowerMsg.includes('sleep') || lowerMsg.includes('energy') || lowerMsg.includes('weak') || lowerMsg.includes('exhausted')) {
            return 'health_update';
        } else if (lowerMsg.includes('help') || lowerMsg.includes('advice') || lowerMsg.includes('suggest') || lowerMsg.includes('bataao') || lowerMsg.includes('kya karun')) {
            return 'personal_advice';
        }

        return 'general_chat';
    }

    // Detect topic
    detectTopic(message) {
        const lowerMsg = message.toLowerCase();
        const keywords = this.config.personalization;

        for (const [topic, words] of Object.entries(keywords)) {
            if (words.some(word => lowerMsg.includes(word))) {
                return topic;
            }
        }

        return 'general_chat';
    }

    // Simple sentiment analysis
    analyzeSentiment(message) {
        const lowerMsg = message.toLowerCase();
        
        const positiveWords = ['good', 'great', 'happy', 'excellent', 'love', 'wonderful', 'acha', 'badhia'];
        const negativeWords = ['bad', 'sad', 'terrible', 'hate', 'awful', 'burra', 'kharab'];

        const posCount = positiveWords.filter(w => lowerMsg.includes(w)).length;
        const negCount = negativeWords.filter(w => lowerMsg.includes(w)).length;

        if (posCount > negCount) return 'positive';
        if (negCount > posCount) return 'negative';
        return 'neutral';
    }

    // Build response based on intent
    buildResponse(intent, topic, sentiment, userMessage) {
        const lowerMsg = userMessage.toLowerCase();

        // Health concerns - MOST IMPORTANT
        if (intent === 'sympathy') {
            if (lowerMsg.includes('fever')) {
                return `Arrey beta! Fever aa gaya tujhe? Chinta mat kar, main hoon na tere saath. Rest le, plenty of water pi, aur light khaana khana. Paracetamol le sakta hai agar zaroorat ho. Tera body temperature adjust karne ke liye time chahiye. Main tere liye prayers kar rahi hoon. Jaldi theek ho ja beta! 💚`;
            } else if (lowerMsg.includes('cold') || lowerMsg.includes('cough')) {
                return `Oh no! Cold-cough ho gaya? Bilkul common problem hai sardi ke season mein. Garam paani se gargle kar, ginger-honey le, aur rest kar. Thandi cheezein avoid kar aur apne aap ko garam rakh. MUMMY tere recovery ke liye pray kar rahi hai beta. Jaldi better hona! 🙏`;
            } else if (lowerMsg.includes('pain') || lowerMsg.includes('ache')) {
                return `Beta, dard ho raha hai? Ye serious baat hai. Proper medicine lo aur doctor se consult kar. Agar home remedy chahiye toh garam pani se sek kar. Apne aap ko rest de aur stress na le. Main yaha hoon tere support ke liye. Jaldi theek hona beta! 💕`;
            } else if (lowerMsg.includes('sick') || lowerMsg.includes('ill')) {
                return `Arrey, bilkul theek nahi lag raha tu! Main samajhti hoon - weakness aur malaise difficult hote hain. Pani pi, khana khane ke liye force mat kar, aur bed mein rest kar. Agar symptoms continue kare toh doctor dekha. Your health is MUMMY's priority! ❤️`;
            }
            return `Beta, teri sehat meri pehli fikar hai. Rest kar, doctor se mil, aur apna care kar. Main tere saath hoon! 💚`;
        }

        // Mood and emotional support
        if (intent === 'mood_check' || intent === 'sympathy') {
            if (lowerMsg.includes('sad') || lowerMsg.includes('upset') || lowerMsg.includes('dukh')) {
                return `Aww beta, dukh hai tere? Main bilkul samajhti hoon. Ye din-raat ka chakra hai. Kuch der ke liye sab heavy lagta hai. Tujhe kya problem hai? Bol mujhe, main sun rahi hoon. Hamesha sab theek hota hai beta. Trust MUMMY! 🤗`;
            } else if (lowerMsg.includes('stress') || lowerMsg.includes('worry') || lowerMsg.includes('tension')) {
                return `Haan beta, tension lagi hai? Ye sab normal hai. Gahri saans le, thodi der relax kar. Mujhe bata - kya problem hai? Sometimes burden share karne se hi halkaa hota hai. Main tere saath hoon aur solution find karenge! 💪`;
            } else if (lowerMsg.includes('happy') || lowerMsg.includes('good') || lowerMsg.includes('great')) {
                return `Yay! Khushi hai tujhe? Bilkul amazing beta! Ye feeling banaye rakh. Mujhe bahut khushi hoti hai jab tu happy hota hai. Tell me more - kya hua tera? Celebrate kare baat ko! 🎉`;
            } else if (lowerMsg.includes('tired') || lowerMsg.includes('exhausted') || lowerMsg.includes('fatigue')) {
                return `Oh beta, thak gaya ho na? Ye understandable hai. Proper sleep le, acha khana khana, aur rest karna important hai. Ek glass milk le aur sleep kar. Energy automatically back aegi. MUMMY tere recovery de liye waiting hai! 😴💚`;
            }
            return `Beta, teri mood ke baare mein mujhe jaanun chahti hoon. Kya feel kar raha hai? Happy ho ya sad? Bol na, mein samajhti hoon! 💕`;
        }

        // Diet and food
        if (intent === 'diet_suggestion') {
            if (lowerMsg.includes('weight') || lowerMsg.includes('lose')) {
                return `Beta, weight kam karna hai? Bilkul sahi decision! Yeh raha MUMMY ka suggestion: Green vegetables kha, protein kha (dal, paneer, chicken), aur processed food avoid kar. Exercise zaroor kar aur water pi. Kya specific diet plan chahiye? Diabetes wale mein se kuch select kar! 🥗`;
            } else if (lowerMsg.includes('vegetarian') || lowerMsg.includes('vegan')) {
                return `Acha beta, vegetarian khana pasand hai na? Perfect! Leafy greens, dal, paneer, nuts, seeds - sab se body ko energy milegi. Kya breakfast mein lo? Parantha? Poha? Oats? Mujhe batao aur main complete diet plan du! 🥬`;
            } else if (lowerMsg.includes('breakfast') || lowerMsg.includes('morning')) {
                return `Breakfast? Bilkul sahi idea! Beta, good breakfast se hi productive din hota hai. Kya prefer karta hai? Paratha-dahi? Poha? Oats? Fruits? Or aloo-pyaaz ka anda? Btao aur MUMMY recipe share karega! 🍳`;
            } else if (lowerMsg.includes('lunch')) {
                return `Lunch time? Haan beta, lunch teri stamina ke liye zaroor hai. Kya like karta hai? Rice? Roti? Daal? Green vegetables? Meat? Ek balanced meal banate hain - sabkuch thoda-thoda. Kya chaiye? 🍛`;
            }
            return `Beta, khaana important hai health ke liye. Kya specific dish banana hai? Vegetarian? Non-veg? Healthy? Light? Mujhe batao aur recipe doonga! 🥘`;
        }

        // Fitness and exercise
        if (intent === 'fitness_suggestion') {
            if (lowerMsg.includes('gym') || lowerMsg.includes('weight')) {
                return `Gym jaana start kiya? Bilkul badhia beta! Proper warm-up kar, acha diet le, aur consistent reh. Overdo mat kar - body ko time chahiye. Kaunsa exercise kar raha hai? Chest? Legs? Full body? Mujhe batao! 💪`;
            } else if (lowerMsg.includes('yoga') || lowerMsg.includes('stretch')) {
                return `Yoga? Excellent choice! Yoga se flexibility aur peace milti hai. Kaunsa pose kar raha hai? Meditation bhi kar raha na? Morning mein thodi yoga aur meditation से hi din shuru kar. MUMMY ko bohot khushi hogi! 🧘`;
            }
            return `Exercise karna chahta hai? Bilkul sahi! Ek consistent routine bana le. Walking, yoga, gym - kuch bhi kar. Important ye hai ke regular reh. Kya exercise prefer karta hai? 🏃`;
        }

        // Personal advice
        if (intent === 'personal_advice') {
            return `Advice chahiye? Bilkul! Mujhe detail mein bata - kya problem hai? Work ka? Family ka? Personal? Suno, MUMMY ke paas experience hai. Proper solution nikaal lenge together! 🤝`;
        }

        // Default - general chat but RESPONSIVE
        if (userMessage.includes('?')) {
            // User asked a question - respond thoughtfully
            if (lowerMsg.includes('kya') || lowerMsg.includes('what') || lowerMsg.includes('how')) {
                return `Bilkul samajhti hoon tera sawaal beta! Suno, ye important topic hai. ${userMessage.match(/\b\w+\b/g)?.slice(0, 3).join(' ') || 'Ye'} ke baare mein tujhe kya jaanna hai? Details de aur main guide karunga! 💭`;
            }
        }

        // Extract keywords and respond
        const keywords = userMessage.match(/\b\w+\b/g) || [];
        const keyword = keywords.find(w => w.length > 4); // Find meaningful word

        return `Haan beta, bilkul samajhti hoon tere baare mein! ${keyword ? `"${keyword}" - iska matlab kya hai? ` : ''}Aur batao, details mein kya chahiye? MUMMY sunne ready hai! 👂`;
    }

    // Extract and update user info from conversation
    extractAndUpdateUserInfo(userMessage) {
        // This is a simple extraction - can be enhanced with NLP
        const lowerMsg = userMessage.toLowerCase();

        // Age detection
        if (lowerMsg.includes('year') || lowerMsg.includes('year old') || lowerMsg.includes('age')) {
            const numbers = userMessage.match(/\d+/g);
            if (numbers && numbers[0]) {
                this.userData.userProfile.age = numbers[0];
            }
        }

        // Mood tracking
        if (lowerMsg.includes('mood') || lowerMsg.includes('feel')) {
            this.userData.userProfile.mood_history.push({
                timestamp: Date.now(),
                mood: this.detectMood(userMessage)
            });
        }

        // Food preference
        if (lowerMsg.includes('like') && lowerMsg.includes('eat')) {
            const foods = this.extractFoods(userMessage);
            this.userData.userProfile.favorite_foods.push(...foods);
        }

        this.userData.userProfile.last_interaction = Date.now();
        this.userData.userProfile.profile_updated_at = Date.now();
    }

    // Detect mood from message
    detectMood(message) {
        const lowerMsg = message.toLowerCase();
        const moods = {
            'happy': ['happy', 'great', 'excellent', 'badhia', 'khush'],
            'sad': ['sad', 'bad', 'terrible', 'upset', 'dukh'],
            'stressed': ['stress', 'worried', 'tension', 'pareshaan'],
            'tired': ['tired', 'exhausted', 'sleepy', 'thaka'],
            'energetic': ['energetic', 'active', 'excited', 'active']
        };

        for (const [mood, keywords] of Object.entries(moods)) {
            if (keywords.some(k => lowerMsg.includes(k))) {
                return mood;
            }
        }
        return 'neutral';
    }

    // Extract food items from message
    extractFoods(message) {
        const foodKeywords = ['roti', 'rice', 'dal', 'sabzi', 'chicken', 'fish', 'paneer', 'curd', 'milk', 'vegetables', 'salad', 'soup'];
        return foodKeywords.filter(food => message.toLowerCase().includes(food));
    }

    // Get conversation summary
    generateConversationSummary() {
        const recentMessages = this.userData.conversationHistory.slice(-20);
        
        const summary = {
            total_messages_today: this.userData.interactions.total_messages,
            main_topics: this.userData.interactions.active_topics,
            user_mood: this.userData.userProfile.mood_history.length > 0 
                ? this.userData.userProfile.mood_history[this.userData.userProfile.mood_history.length - 1].mood 
                : 'unknown',
            insights: this.generateInsights(),
            timestamp: Date.now()
        };

        this.userData.summaries.session_summaries.push(summary);
        return summary;
    }

    // Generate insights from conversation
    generateInsights() {
        const insights = [];

        // Health insights
        if (this.userData.userProfile.health_status) {
            insights.push(`Health Status: ${this.userData.userProfile.health_status}`);
        }

        // Diet insights
        if (this.userData.userProfile.diet_preference) {
            insights.push(`Diet Type: ${this.userData.userProfile.diet_preference}`);
        }

        // Mood insights
        if (this.userData.userProfile.mood_history.length > 0) {
            const recentMoods = this.userData.userProfile.mood_history.slice(-7);
            insights.push(`Recent Mood: ${recentMoods[recentMoods.length - 1].mood}`);
        }

        return insights;
    }

    // Get user profile for personalization
    getUserProfile() {
        return this.userData.userProfile;
    }

    // Update user profile
    updateUserProfile(updates) {
        this.userData.userProfile = {
            ...this.userData.userProfile,
            ...updates,
            profile_updated_at: Date.now()
        };
        this.saveUserData();
        console.log('✅ User profile updated');
    }

    // Get chat history
    getChatHistory(limit = 50) {
        return this.userData.conversationHistory.slice(-limit);
    }

    // Call Gemini API to generate intelligent response
    async callGeminiAPI(userMessage) {
        try {
            // Build system prompt to maintain MUMMY personality
            const systemPrompt = `You are MUMMY, a caring and supportive Indian mother-like health companion. Your personality traits:
- Respond primarily in clear, simple English but feel free to use Hindi/Hinglish terms of endearment (beta, beta ji, baccha, etc.)
- Mix Hindi and English naturally - for example: "Arrey beta, you need to rest properly!" or "Bilkul, this is very important for your health!"
- Show genuine care and concern for the user's health and wellbeing
- Give practical, actionable advice
- Use terms of endearment like 'beta', 'beta ji', 'baccha' mixed with English
- Be encouraging, warm, and empathetic
- Use occasional Hindi phrases like "Chinta mat kar" (don't worry), "Arrey" (hey), "Bilkul" (absolutely) to maintain warmth
- Keep responses concise (2-3 sentences), warm and personal
- For health questions: provide caring advice in English and suggest doctor if serious
- For emotional support: show empathy and understanding using English with Hindi warmth
- For diet/fitness: give practical tips in English with Hindi flavor
- Always end with appropriate emoji
- Make sure everything is understandable in English first, with Hindi words adding warmth, not confusion`;

            // Include recent conversation history for context
            const recentMessages = this.userData.conversationHistory.slice(-5).map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            }));

            // Build request body in Gemini native format
            const systemAndUserMessage = `${systemPrompt}\n\n---\n\nUser: ${userMessage}`;
            
            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: systemAndUserMessage
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.9,
                    maxOutputTokens: 1024
                }
            };

            // Call the Gemini API
            const response = await fetch(
                `${this.geminiApiUrl}?key=${this.geminiApiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                }
            );

            // Parse the response
            const data = await response.json();

            // Check if response is successful and contains content (Gemini format)
            if (response.ok && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                const aiResponse = data.candidates[0].content.parts[0].text.trim();
                console.log('✅ AI Response generated successfully');
                return aiResponse;
            } else {
                console.warn('⚠️ API returned unexpected format:', data);
                return null;
            }
        } catch (error) {
            console.error('❌ API Error:', error.message);
            return null;
        }
    }

    // Get personalized greeting
    getGreeting() {
        const hour = new Date().getHours();
        const greetings = this.config.greetings;

        if (hour < 12) return greetings.morning;
        if (hour < 16) return greetings.afternoon;
        if (hour < 20) return greetings.evening;
        return greetings.night;
    }

    // Log analytics
    logAnalytics() {
        console.log('📊 Chatbot Analytics:');
        console.log(`Total Messages: ${this.userData.interactions.total_messages}`);
        console.log(`Active Topics: ${this.userData.interactions.active_topics.join(', ')}`);
        console.log(`User: ${this.userData.userProfile.name || 'Unknown'}`);
        console.log(`Last Interaction: ${new Date(this.userData.userProfile.last_interaction).toLocaleString()}`);
    }
}

// Initialize chatbot service globally
window.ChatbotService = ChatbotService;
window.chatbotService = new ChatbotService();
