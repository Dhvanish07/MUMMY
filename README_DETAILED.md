# 🏥 MUMMY - COMPLETE DETAILED DOCUMENTATION

> Your Personal AI-Powered Health & Wellness Companion
> **Version:** 1.0.0 | **Status:** ✅ Production Ready | **Last Updated:** February 1, 2026

---

## 📚 Comprehensive Table of Contents

1. **[Executive Summary](#-executive-summary)**
2. **[System Architecture](#-system-architecture)**
3. **[Complete Project Structure](#-complete-project-structure)**
4. **[Feature Documentation](#-feature-documentation)**
5. **[🔑 API KEYS CONFIGURATION (MOST IMPORTANT!)](#-api-keys-configuration-guide)**
6. **[Complete Setup Guide](#-complete-setup-guide)**
7. **[API Documentation](#-api-documentation)**
8. **[Troubleshooting](#-troubleshooting--faqs)**

---

## 📋 Executive Summary

**MUMMY** is a comprehensive health and wellness platform that combines:
- ✅ **Google Gemini 2.5 Flash AI** - For intelligent responses
- ✅ **Vanilla JavaScript Frontend** - Fast, no complex dependencies
- ✅ **PHP Backend** - Simple, easy to deploy
- ✅ **Real-Time Notifications** - 6 meal windows throughout the day
- ✅ **Warm AI Personality** - Hinglish communication with caring tone
- ✅ **Multiple Features** - Recipes, packing lists, chatbot, health tracking

### Key Numbers:
- **5000+ lines** of JavaScript
- **800+ lines** of PHP backend
- **2000+ lines** of CSS
- **3 different AI features** (recipes, packing, chatbot)
- **6 meal time notifications**
- **Zero external dependencies** (no jQuery, no React)

---

## 🏗 System Architecture

### Complete Data Flow

```
┌─────────────────────────────────────┐
│  USER BROWSER                        │
│  ┌───────────────────────────────┐  │
│  │ Frontend Layer                │  │
│  │ - HTML/CSS/JavaScript         │  │
│  │ - Recipe UI                   │  │
│  │ - Packing UI                  │  │
│  │ - Chat Widget                 │  │
│  │ - Notifications               │  │
│  │ - Health Tracking             │  │
│  └───────────────────────────────┘  │
└──────────────┬──────────────────────┘
               │ FETCH/ASYNC CALLS
┌──────────────▼──────────────────────┐
│  XAMPP/Apache Backend                │
│  ┌───────────────────────────────┐  │
│  │ PHP Files                     │  │
│  │ - generate_recipes.php        │  │
│  │ - generate_packing.php        │  │
│  │ - db_config.php               │  │
│  └───────────────────────────────┘  │
│               │                      │
│         Uses Gemini API             │
└──────────────┬──────────────────────┘
               │ HTTP/HTTPS
┌──────────────▼──────────────────────┐
│  Google Gemini API                   │
│  gemini-2.5-flash:generateContent   │
│  - Recipes generation                │
│  - Packing lists                    │
│  - Chatbot responses                │
└──────────────────────────────────────┘
```

---

## 📁 Complete Project Structure

### DETAILED DIRECTORY TREE

```
mummy/
│
├── 📄 README.md                      [Main Project Documentation]
├── 📄 README_DETAILED.md             [This File - Complete Guide]
│
├── 📁 frontend/                      [User Interface Layer]
│   ├── index.html (500+ lines)
│   │   ├── Recipe generation UI
│   │   ├── Pack my bag UI  
│   │   ├── Chat widget container
│   │   ├── Notification system
│   │   └── Navigation/header
│   │
│   ├── bimaar.html                  [Health Tracking Page]
│   │   ├── Symptom checker
│   │   ├── Diet tracker
│   │   ├── Daily checklist
│   │   └── Health history
│   │
│   ├── app.js (1000+ lines)         [MAIN APPLICATION LOGIC]
│   │   ├── User initialization & auto-login
│   │   ├── Recipe generation functions
│   │   ├── Packing list functions
│   │   ├── Gemini API calls
│   │   ├── localStorage management
│   │   ├── UI event handlers
│   │   └── Data persistence
│   │
│   ├── notification-service.js (200 lines)
│   │   ├── 6 meal window definitions
│   │   ├── Time checking logic
│   │   ├── Notification triggers
│   │   └── Daily reset system
│   │
│   ├── notification-manager.js (300 lines)
│   │   ├── Notification DOM creation
│   │   ├── Show/hide animations
│   │   ├── Badge counter updates
│   │   └── Auto-dismiss logic
│   │
│   ├── bimaar.js, calories.js
│   ├── diet-plans.js, diet-plan-selector.js
│   ├── notification-integration.js
│   ├── styles.css (2000+ lines)     [MAIN STYLESHEET]
│   │
│   ├── notifications/                [Notification System Files]
│   │   ├── notification-bell.js
│   │   ├── notification-handler.js
│   │   └── notification.css
│   │
│   └── pictures/                    [Logo & Assets]
│       └── logo.png
│
├── 📁 backend/                       [Server Logic Layer]
│   │
│   ├── generate_recipes.php (400 lines)
│   │   ├── Line 31: API_KEY = "YOUR_KEY"    [👈 API KEY LOCATION #1]
│   │   ├── Get user preferences from DB
│   │   ├── Mock data fallback ('Beta' user)
│   │   ├── Build AI prompt
│   │   ├── Call Gemini API
│   │   └── Return JSON response
│   │
│   ├── generate_packing.php (400 lines)
│   │   ├── Line 31: API_KEY = "YOUR_KEY"    [👈 API KEY LOCATION #2]
│   │   ├── Get destination & days
│   │   ├── Query user data
│   │   ├── Build packing prompt
│   │   ├── Call Gemini API
│   │   └── Return organized list
│   │
│   └── db_config.php
│       ├── Database connection
│       ├── Error handling
│       └── Connection pooling
│
├── 📁 chatbot/                       [AI Chatbot System]
│   │
│   ├── chatbot-service.js (500+ lines)
│   │   ├── Line 19: API_KEY = "YOUR_KEY"    [👈 API KEY LOCATION #3]
│   │   ├── ChatbotService class
│   │   ├── User data management
│   │   ├── Conversation history
│   │   ├── Intent detection
│   │   ├── Gemini API calls
│   │   ├── Mood tracking
│   │   └── Health insights
│   │
│   ├── chat-manager.js (300 lines)
│   │   ├── Chat UI creation
│   │   ├── Message handling
│   │   ├── Send/receive logic
│   │   ├── Animation system
│   │   └── Modal management
│   │
│   ├── chatbot-config.js (100 lines)
│   │   ├── Personality settings
│   │   ├── Greeting messages
│   │   ├── Intent patterns
│   │   └── Response templates
│   │
│   ├── chatbot-styles.css           [Chat styling]
│   ├── chatbot-data.json            [Chat history storage]
│   └── README.md                    [Chatbot docs]
│
├── 📄 ARCHITECTURE_DIAGRAM.md        [System diagrams]
├── 📄 DEPLOYMENT_VERIFICATION.md     [Deployment checklist]
├── 📄 DIET_PLAN_FEATURE.md           [Diet plans docs]
└── 📄 IMPLEMENTATION_SUMMARY.md      [Implementation notes]
```

---

## 🎯 Feature Documentation

### Feature 1: Recipe Generation 🍳

**How to Use:**
1. Open `http://localhost/mummy/index.html`
2. Scroll to Recipe section
3. Select ingredients and preferences
4. Click "Generate Recipe"
5. AI generates personalized recipe in 5-10 seconds

**Behind The Scenes:**
```
User Input → app.js → Backend (generate_recipes.php) → Gemini API → Response → Display
```

**API Flow:**
```
GET /backend/generate_recipes.php?user_id=1
↓
Backend gets user preferences from DB (or mock data)
↓
Builds prompt: "Create a vegetarian recipe using chicken, rice... spice level: medium"
↓
Calls Gemini: POST to generativelanguage.googleapis.com with API key
↓
Receives: AI-generated recipe with ingredients and steps
↓
Returns JSON: {"success": true, "recipe": "...full recipe..."}
↓
Frontend displays in UI
```

**User Preferences Considered:**
- Dietary type (Vegetarian/Non-Veg/Vegan)
- Spice level (Mild/Medium/Hot)
- Cooking time preference
- Available ingredients
- Health restrictions
- Taste preferences

---

### Feature 2: Pack My Bag 🎒

**How to Use:**
1. Scroll to Pack My Bag section
2. Enter destination (e.g., "Paris, France")
3. Enter number of days (e.g., "5")
4. Click "Generate Packing List"
5. AI generates organized packing list

**API Endpoint:**
```
GET /backend/generate_packing.php?user_id=1&destination=Paris&days=5
```

**Smart Features:**
- Weather-aware recommendations
- Duration-based suggestions
- Category organized (Clothing, Shoes, etc.)
- User profile consideration
- Emergency items included

---

### Feature 3: MUMMY Chatbot 🤖

**How to Use:**
1. Click chat icon (bottom-right corner)
2. Type your message
3. Get AI response with caring personality
4. Chat history saved automatically

**Chat Examples:**

```
YOU: "I have headache"
MUMMY: "Aww beta, migraine hai? Pani pi, eyes rest kar. 
        Doctor se milna chahiye if persistent. Take care! 💚"

YOU: "want to lose weight"
MUMMY: "Beta, weight kam karna hai? Bilkul sahi decision! 
        Green vegetables kha, dal kha, processed food avoid kar. 
        Kya specific diet plan chahiye? 🥗"

YOU: "feeling stressed"
MUMMY: "Haan beta, tension lagi hai? Ye sab normal hai. 
        Gahri saans le, thodi der relax kar. 
        Mujhe bata - kya problem hai? Main sun rahi hoon. 💪"
```

**Chatbot Features:**
- Hinglish communication (Hindi + English)
- Warm, mother-like personality
- Mood tracking
- Health advice
- Diet suggestions
- Fitness tips
- Emotional support
- Conversation history

---

### Feature 4: Notifications 🔔

**6 Meal Windows:**

| Time | Meal | Icon | Message |
|------|------|------|---------|
| 5-7 AM | Early Morning | 🌅 | Wake up & hydrate! |
| 7-9 AM | Breakfast | 🍳 | Start day with energy! |
| 10-11 AM | Mid-Morning | ☕ | Snack time! |
| 12-2 PM | Lunch | 🍛 | Balanced meal time! |
| 4-5 PM | Evening Snack | 🥤 | Stay hydrated! |
| 7-9 PM | Dinner | 🍽️ | Light dinner! |

**How It Works:**
- Checks time every minute
- Shows notification when in meal window
- Only notifies once per meal per day
- Auto-dismisses after 5 seconds
- Badge counter shows pending notifications

---

## 🔑 API KEYS CONFIGURATION GUIDE

### ⚠️ THIS IS THE MOST IMPORTANT SECTION! ⚠️

You need **3 separate API keys** from Google Gemini. Each service uses different key.

### Why 3 Keys?
- **Security:** If one key leaks, others remain safe
- **Isolation:** Each service has independent quota
- **Monitoring:** Track usage per service
- **Revocation:** Disable one key without affecting others

---

### STEP 1: Get Your API Keys

1. Go to: https://aistudio.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the key
4. **Repeat 3 times** (for chatbot, recipes, packing)

Save keys temporarily in notepad:
```
CHATBOT_KEY:  AIzaSy_ABC123...
RECIPE_KEY:   AIzaSy_DEF456...
PACKING_KEY:  AIzaSy_GHI789...
```

---

### STEP 2: Add Chatbot API Key

**FILE:** `chatbot/chatbot-service.js`
**LINE:** 19

**FIND:**
```javascript
this.geminiApiKey = 'AIzaSyDsaDVrrJ33S85Wgt7LfoPGwyirmIxR5xQ';
```

**REPLACE WITH:**
```javascript
this.geminiApiKey = 'YOUR_CHATBOT_KEY_HERE';
```

**EXAMPLE:**
```javascript
this.geminiApiKey = 'AIzaSy_Your_Actual_Chatbot_Key_Here';
```

---

### STEP 3: Add Recipe API Key

**FILE:** `backend/generate_recipes.php`
**LINE:** 31

**FIND:**
```php
$GEMINI_API_KEY = "AIzaSyBK27YUkrWIuR7-pY1rjVVzF91_9-YHFR4";
```

**REPLACE WITH:**
```php
$GEMINI_API_KEY = "YOUR_RECIPE_KEY_HERE";
```

---

### STEP 4: Add Packing API Key

**FILE 1:** `backend/generate_packing.php`
**LINE:** 31

**FILE 2:** `generate_packing.php` (DUPLICATE - keep both in sync!)
**LINE:** 31

**FIND in both files:**
```php
$GEMINI_API_KEY = "AIzaSyBJtuBKTyFjrEE0OSBsxMsUlTaKD2NEVig";
```

**REPLACE with SAME key in both files:**
```php
$GEMINI_API_KEY = "YOUR_PACKING_KEY_HERE";
```

---

### STEP 5: Test Your Keys

#### Test Chatbot Key:
Open browser console (F12) and paste:
```javascript
fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_CHATBOT_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        contents: [{ parts: [{ text: 'Hello' }] }]
    })
}).then(r => r.json()).then(console.log);
```

If successful: `{candidates: [{content: {...}}]}`
If error: `{error: {code: 403, message: "...leaked..."}}`

#### Test Recipe Key:
Open: `http://localhost/mummy/backend/generate_recipes.php?user_id=1`
Should show JSON response with recipe

#### Test Packing Key:
Open: `http://localhost/mummy/backend/generate_packing.php?user_id=1&destination=Paris&days=3`
Should show JSON response with packing list

---

### SUMMARY: All 3 API Keys

| Feature | File | Line | Variable |
|---------|------|------|----------|
| 🤖 **CHATBOT** | `chatbot/chatbot-service.js` | 19 | `this.geminiApiKey` |
| 🍳 **RECIPES** | `backend/generate_recipes.php` | 31 | `$GEMINI_API_KEY` |
| 🎒 **PACKING** | `backend/generate_packing.php` | 31 | `$GEMINI_API_KEY` |
| 🎒 **PACKING (DUP)** | `generate_packing.php` | 31 | `$GEMINI_API_KEY` |

---

## 📦 Complete Setup Guide

### Prerequisites:
```
✓ Windows/Mac/Linux computer
✓ XAMPP installed (Apache + PHP 8.2 + MySQL)
✓ Modern browser (Chrome, Firefox, Safari, Edge)
✓ 3 Google Gemini API keys
✓ Internet connection
✓ Text editor (VS Code, Notepad++, etc.)
```

---

### Installation Steps:

#### 1. Install XAMPP
- Download from: https://www.apachefriends.org/
- Install with default settings
- Remember installation path

#### 2. Copy MUMMY to XAMPP

**Find active XAMPP:**
Usually at: `C:\Users\[YourName]\Desktop\XAMPP\htdocs\`

**Copy entire mummy folder there:**
```
C:\Users\YourName\Desktop\XAMPP\htdocs\mummy\
  ├── frontend/
  ├── backend/
  ├── chatbot/
  └── README.md
```

#### 3. Start XAMPP
- Open XAMPP Control Panel
- Click "Start" next to Apache
- Click "Start" next to MySQL
- Wait for green indicators

#### 4. Add 3 API Keys
Follow **Step 2-4** above for all three keys

#### 5. Launch Application
Open browser and go to:
```
http://localhost/mummy/index.html
```

Should see:
✅ MUMMY logo
✅ Recipe section
✅ Packing section
✅ Chat icon (bottom-right)
✅ Notification system

---

## 📡 API Documentation

### Recipe API

**Endpoint:**
```
GET http://localhost/mummy/backend/generate_recipes.php?user_id=1
```

**Response:**
```json
{
    "success": true,
    "recipe": "Full recipe with ingredients and steps",
    "prepTime": "10 mins",
    "cookTime": "20 mins"
}
```

### Packing API

**Endpoint:**
```
GET http://localhost/mummy/backend/generate_packing.php?user_id=1&destination=Paris&days=5
```

**Response:**
```json
{
    "success": true,
    "destination": "Paris",
    "days": 5,
    "packing_list": "Organized packing list by category"
}
```

### Chatbot API

**Endpoint:**
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_KEY
```

**Request:**
```json
{
    "contents": [{
        "parts": [{"text": "User message"}]
    }]
}
```

**Response:**
```json
{
    "candidates": [{
        "content": {
            "parts": [{"text": "AI response"}]
        }
    }]
}
```

---

## 🆘 Troubleshooting & FAQs

### Issue 1: "Backend error: 500"

**Check:**
1. Is XAMPP running? (Apache & MySQL green)
2. Are API keys added to all files?
3. Are files in correct XAMPP location?

**Verify:**
- Open file: `backend/generate_recipes.php`
- Look at line 31
- Should have: `$GEMINI_API_KEY = "AIzaSy..."`
- NOT: `$GEMINI_API_KEY = "YOUR_KEY_HERE"`

**Fix:**
1. Add actual API key to line 31
2. Save file
3. Copy to XAMPP
4. Refresh browser

---

### Issue 2: "Chatbot returns 400 Bad Request"

**Cause:** Wrong API endpoint

**Check:** `chatbot/chatbot-service.js` Line 20

**Should be:**
```javascript
this.geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
```

**NOT:**
```javascript
this.geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
```

---

### Issue 3: "Notifications not appearing"

**Check:**
1. Is current time in meal window? (7-9 AM for breakfast)
2. Did you already get notification today for that meal?
3. Check browser console (F12) for errors

**Fix:**
```javascript
// Clear notification tracking
localStorage.clear();
// Reload page
location.reload();
```

---

### Issue 4: "Files deployed but old code running"

**You likely have 2 XAMPP installations!**

**Check which one is active:**
```powershell
# In PowerShell:
Get-Content "C:\xampp\apache\logs\httpd.pid"                     # Might be empty
Get-Content "C:\Users\[User]\Desktop\XAMPP\apache\logs\httpd.pid" # Has process ID
```

The one with process ID is running!

**Deploy files there:**
Copy all files to the ACTIVE XAMPP location

---

### FAQ

**Q: Can I use without database?**
A: Yes! App uses mock data by default. Database is optional.

**Q: Is my data secure?**
A: Data stored in browser localStorage (not encrypted). Add database for production.

**Q: Can I add more API keys?**
A: Yes! You can use same key for multiple services, but 3 separate keys is recommended.

**Q: Can I modify chatbot personality?**
A: Yes! Edit `chatbot/chatbot-config.js` to customize greetings, tone, and behavior.

**Q: How many users can use MUMMY?**
A: Unlimited! Each browser has separate localStorage.

**Q: Is it mobile-friendly?**
A: Yes! Fully responsive design works on all devices.

**Q: Do I need to pay for Gemini API?**
A: Free tier available! Check Google's pricing at: https://ai.google.dev/pricing

---

## 🎉 You're Ready!

You now know:
✅ Where all 3 API keys go
✅ How each feature works
✅ How to deploy locally
✅ How to troubleshoot issues
✅ Complete system architecture

**Next Steps:**
1. Get 3 API keys
2. Add them to the 3 locations
3. Copy files to XAMPP
4. Start XAMPP
5. Open `http://localhost/mummy/index.html`
6. Enjoy MUMMY! 🚀

---

**Need Help?**
- Check troubleshooting section above
- Review API key setup section
- Check browser console (F12) for errors
- Check XAMPP error logs

**Happy Coding! ❤️**
