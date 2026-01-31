/* ========================================
   CHATBOT CONFIGURATION
   ======================================== */

const ChatbotConfig = {
    // Chatbot personality
    personality: {
        name: 'MUMMY',
        role: 'Caring Friend & Health Companion',
        language: 'Hinglish (Hindi + English)',
        tone: 'warm, caring, supportive'
    },

    // Response categories
    responseTypes: [
        'greeting',
        'health_update',
        'diet_suggestion',
        'motivation',
        'mood_check',
        'meal_reminder',
        'wellness_tip',
        'personal_advice',
        'encouragement',
        'sympathy'
    ],

    // Topics the chatbot can discuss
    topics: [
        'health',
        'diet',
        'fitness',
        'mood',
        'family',
        'work',
        'lifestyle',
        'nutrition',
        'exercise',
        'stress',
        'sleep',
        'general_chat'
    ],

    // Mood tracking
    moods: [
        'happy',
        'sad',
        'stressed',
        'tired',
        'energetic',
        'anxious',
        'calm',
        'frustrated',
        'excited',
        'neutral'
    ],

    // User profile data to track
    userProfileFields: {
        name: 'User\'s name',
        age: 'Age',
        gender: 'Gender',
        health_status: 'Health condition (diabetic, hypertension, etc.)',
        diet_preference: 'Diet choice',
        fitness_level: 'Fitness level',
        favorite_foods: 'Preferred meals',
        allergies: 'Food allergies',
        daily_routine: 'Daily schedule',
        goals: 'Health/fitness goals',
        preferences: 'Chat preferences',
        mood_history: 'Recent mood tracking',
        last_updated: 'Profile last updated'
    },

    // Greeting messages
    greetings: {
        morning: 'Suno beta, subah ki chai tayyar hai! Uth gaya? Nashta kar le - shero ke din shuru hote hain proper khane se.',
        afternoon: 'Namaste! Lunch time ho gya - MUMMY ko yaad hai na? Garam khana kha le beta, energy milegi.',
        evening: 'Shaam ho gyi! Thak gaya hoga na din bhar? Chai aur kuch halkaa namkeen le. Aur haan - mujhe apne din ke baare mein bata.',
        night: 'Beta, raat ho gyi. Dinner kha liya na? Sone se pehle ek glass doodh jaroor le. Teri sehat MUMMY ki pehli fikar hai.',
        default: 'Namaste beta! Kaise ho aaj? Main hoon na tere liye - har khushi mein, har takleef mein.'
    },

    // Response templates
    templates: {
        encouragement: [
            'Bilkul sahi approach hai! Keep it up!',
            'Bahut badhia! Aise hi continue karo.',
            'Tu bilkul theek kar raha hai beta.',
            'Proud of you! Aage badh.'
        ],
        concern: [
            'Beta, ye suno. Apna khayal rakhna zaroori hai.',
            'Mujhe chinta ho rahi hai tere baare mein.',
            'Beta, teri fikar kar rahi hoon.',
            'Haan, ye galat hai. Suno meri advice.'
        ],
        suggestion: [
            'Mera kehna sunle beta:',
            'Haan, ek baat bolu?',
            'Ek suggestion hai meri:',
            'Suno beta, Maine dekha hai:'
        ]
    },

    // Conversation memory
    memorySettings: {
        max_history: 100,  // Keep last 100 messages
        session_duration: 3600000,  // 1 hour session
        auto_save_interval: 30000  // Save every 30 seconds
    },

    // User milestones to track
    milestones: [
        'First meal logged',
        'Completed 7 days',
        'Completed 30 days',
        'Diet plan selected',
        'First workout',
        'Mood improvement',
        'Weight goal reached',
        'Consistent hydration'
    ],

    // Analysis frequency
    analysis: {
        daily_summary: true,
        weekly_report: true,
        mood_tracking: 'every_chat',
        health_insights: 'weekly'
    },

    // Personalization keywords
    personalization: {
        health_keywords: ['medicine', 'doctor', 'hospital', 'disease', 'pain', 'sick'],
        fitness_keywords: ['gym', 'exercise', 'workout', 'run', 'walk', 'yoga'],
        diet_keywords: ['eat', 'food', 'lunch', 'dinner', 'breakfast', 'hungry'],
        mood_keywords: ['sad', 'happy', 'stressed', 'tired', 'excited', 'angry'],
        family_keywords: ['mother', 'father', 'family', 'home', 'brother', 'sister']
    }
};

// Export configuration
window.ChatbotConfig = ChatbotConfig;
