# 🤖 MUMMY Chatbot System

Your friend MUMMY - A caring, personalized health companion that remembers everything about you!

## 📋 Overview

The MUMMY Chatbot is an intelligent conversational AI system that:
- ✅ Maintains comprehensive user profiles
- ✅ Remembers conversation history
- ✅ Tracks health status, mood, and preferences
- ✅ Provides personalized health recommendations
- ✅ Acts as a caring friend who learns from every interaction
- ✅ Generates insights from conversations

## 📁 File Structure

```
/chatbot/
├── chatbot-config.js         # Configuration & constants
├── chatbot-service.js        # Core service logic
├── chat-manager.js           # Frontend UI manager
├── chatbot-styles.css        # Chat UI styling
├── chatbot-data.json         # User data & conversation history
└── README.md                 # This file
```

## 🛠️ Components

### 1. **chatbot-config.js**
Defines the chatbot's personality and configuration:
- Personality traits (name: MUMMY, tone: warm & caring)
- Response types (greeting, health_update, diet_suggestion, etc.)
- Topics (health, diet, fitness, mood, family, work, etc.)
- User profile fields to track
- Conversation memory settings

### 2. **chatbot-service.js**
Core service class with all business logic:
- User data management (load, save, update)
- Conversation tracking
- Intent detection
- Sentiment analysis
- Message generation
- User profile extraction
- Conversation summarization

**Key Methods:**
```javascript
generateResponse(userMessage)      // Generate bot response
addMessage(speaker, message, type) // Add message to history
generateConversationSummary()      // Create session summary
extractAndUpdateUserInfo()         // Learn from conversations
getUserProfile()                   // Get user data
updateUserProfile(updates)         // Update user info
getChatHistory(limit)              // Retrieve past messages
```

### 3. **chat-manager.js**
Frontend manager for UI and interactions:
- Creates chat button and modal
- Handles message display
- Manages quick action buttons
- Stores/retrieves chat UI state
- Shows profile setup form

**Key Methods:**
```javascript
toggleChat()               // Open/close chat window
sendMessage()              // Send user message
displayMessage()           // Show message in UI
handleQuickAction()        // Handle preset buttons
showProfileSetup()         // Show onboarding form
```

### 4. **chatbot-styles.css**
Beautiful UI styling:
- Chat button (floating action button)
- Chat modal (responsive design)
- Message styles (user vs bot)
- Input area and quick actions
- Profile setup modal
- Smooth animations & transitions

### 5. **chatbot-data.json**
User data structure:
```json
{
  "userProfile": {
    "name": "User's name",
    "age": "Age",
    "health_status": "diabetic, hypertension, etc.",
    "diet_preference": "Selected diet type",
    "mood_history": [...],
    "favorite_foods": [...]
  },
  "conversationHistory": [...],
  "summaries": {...},
  "health_tracking": {...}
}
```

## 🚀 Integration Steps

### 1. Add Script References to index.html
```html
<!-- Before closing </head> tag -->
<link rel="stylesheet" href="chatbot/chatbot-styles.css">

<!-- Before closing </body> tag -->
<script src="chatbot/chatbot-config.js"></script>
<script src="chatbot/chatbot-service.js"></script>
<script src="chatbot/chat-manager.js"></script>
```

### 2. Initialize on Page Load
The chatbot automatically initializes when the page loads:
- `chatbot-service.js` creates global `window.chatbotService`
- `chat-manager.js` initializes on `DOMContentLoaded`
- Shows profile setup form for new users

### 3. Verify Integration
Check the browser console for initialization messages:
```
🤖 Chatbot Service initialized
💬 Chat Manager initialized
```

## 💬 Usage

### For Users:
1. Click the 💬 chat button (bottom-right)
2. Chat naturally - ask about health, diet, mood, etc.
3. Use quick action buttons (Mood Check, Diet Tip, Health Tip)
4. MUMMY learns and remembers everything!

### For Developers:

#### Get User Profile:
```javascript
const profile = window.chatbotService.getUserProfile();
console.log(profile.name, profile.health_status);
```

#### Send Message Programmatically:
```javascript
window.chatbotService.addMessage('user', 'I feel tired today');
const response = window.chatbotService.generateResponse('I feel tired today');
```

#### Get Chat History:
```javascript
const history = window.chatbotService.getChatHistory(20);
```

#### Update User Profile:
```javascript
window.chatbotService.updateUserProfile({
    name: 'John Doe',
    health_status: 'diabetic'
});
```

#### Generate Summary:
```javascript
const summary = window.chatbotService.generateConversationSummary();
console.log(summary);
```

## 🧠 Features

### Intent Detection
Automatically detects user intent:
- **greeting** - "Hello", "Hi", "Namaste"
- **diet_suggestion** - "What should I eat?", "Food"
- **fitness_suggestion** - "Exercise", "Gym", "Workout"
- **mood_check** - "How am I?", "Mood", "Feeling"
- **health_update** - "Tired", "Energy", "Sleep"
- **personal_advice** - "Help", "Advice", "Suggest"

### Topic Detection
Identifies conversation topics:
- Health keywords: medicine, doctor, disease, pain
- Fitness keywords: gym, exercise, yoga, run
- Diet keywords: eat, food, meal, hungry
- Mood keywords: happy, sad, stressed, tired
- Family keywords: mother, father, family, home

### Sentiment Analysis
Simple sentiment detection:
- Positive words: good, great, happy, excellent, love
- Negative words: bad, sad, terrible, hate, awful
- Neutral: everything else

### User Profile Tracking
Automatically extracts and stores:
- User name, age, gender
- Health status and concerns
- Diet preferences
- Fitness level
- Favorite foods and allergies
- Mood history
- Daily routine
- Goals and preferences

### Conversation Memory
- Stores complete conversation history (up to 100 messages)
- Generates session summaries
- Tracks frequently discussed topics
- Creates user insights

## 📊 Data Persistence

All data is stored in **localStorage**:
- Key: `chatbot_user_data`
- Auto-saves every 30 seconds
- Persists across browser sessions
- Survives page refreshes

Can be extended to use **MySQL** for:
- Multi-device synchronization
- Long-term analytics
- User statistics tracking

## 🎯 Personalization

MUMMY becomes more personalized over time by:
1. Learning user's name and greeting them warmly
2. Remembering health conditions and providing relevant tips
3. Tracking mood patterns and offering support
4. Recalling favorite foods and meals
5. Adapting response style to user preferences
6. Referencing past conversations

## 🔄 Response Generation

Responses are generated based on:
1. **User Intent** - What the user wants to talk about
2. **Topic** - Health, diet, fitness, mood, family, etc.
3. **Sentiment** - User's emotional tone
4. **History** - Past conversations and preferences
5. **User Profile** - Current health status, goals, etc.

## 🌐 Hinglish Support

MUMMY speaks Hinglish (Hindi + English):
- "Namaste beta! Kaise ho?"
- "Bilkul! Nutrition zaroor important hai."
- "Tu bilkul theek kar raha hai!"
- "Meri fikar hai tere baare mein."

## 📱 Responsive Design

Chat works perfectly on:
- ✅ Desktop (380px wide modal)
- ✅ Tablet (adaptive sizing)
- ✅ Mobile (full-screen mode on small devices)

## 🔐 Privacy & Security

- All data stored locally in browser
- No data sent to external servers (except optional Gemini API for summaries)
- User can clear data anytime
- Open source and transparent

## 🚀 Future Enhancements

Planned features:
- [ ] Gemini API integration for advanced summaries
- [ ] Database storage for multi-device sync
- [ ] Voice chat support
- [ ] Emotion recognition from tone
- [ ] Integration with diet and travel features
- [ ] Daily personalized reports
- [ ] Community features (friend comparison)
- [ ] Goal tracking and achievements

## 📝 Example Conversations

### Example 1: Health Check-in
```
User: Hi MUMMY, how should I start my day?
Bot: Namaste beta! Good morning! Kaise ho? 
     Nashta kha liya? Balanced breakfast zaroor importante hai!
User: I feel a bit tired
Bot: Beta, tera khayal rakhna zaroori hai. Sehat se na khilwad.
     Rest le aur pani pi. Properly hydrate hona bahut important hai!
```

### Example 2: Diet Guidance
```
User: What can I eat for lunch?
Bot: Bilkul! Teri diet plan check kar rahe ho.
     For balanced meal: Roti + dal + sabzi + curd
     Calories within your limit. Khana nikalna zaroori hai!
User: I like vegetarian food
Bot: Excellent! Teri profile mein add kar diya.
     Next time, vegetarian options dunga preference ke hisaab se!
```

## 🤝 Support

For issues or questions:
1. Check browser console for errors
2. Verify all files are loaded (check Network tab)
3. Check localStorage data: `JSON.parse(localStorage.getItem('chatbot_user_data'))`
4. Review chatbot-service.js error handling

## 📄 License

Part of MUMMY App - Your caring health companion

---

**MUMMY: "Haan beta, aaj bhi sab kuch theek hai na? Apna khayal rakho! 💕"**
