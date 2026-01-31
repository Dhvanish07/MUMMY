# 🏥 MUMMY - Your Personal Health & Wellness Companion

A comprehensive, AI-powered health management application built with vanilla JavaScript, PHP, and Google Gemini API. MUMMY acts as a caring, mother-like AI companion that helps you with meal planning, packing lists, dietary advice, and personalized health support.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. **[🔑 API Keys Setup (IMPORTANT)](#-api-keys-setup-important)**
6. [Installation & Setup](#installation--setup)
7. [Deployment Instructions](#deployment-instructions)
8. [Configuration](#configuration)
9. [Features in Detail](#features-in-detail)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**MUMMY** is a health and wellness companion application that combines AI intelligence with personal care. It helps users:
- Generate personalized meal recipes based on preferences
- Create custom packing lists for trips
- Track daily health metrics
- Get wellness advice through an AI chatbot
- Receive time-based meal notifications
- Monitor diet and fitness goals

The application uses **Google Gemini 2.5 Flash API** for all AI-powered responses and maintains a warm, caring "mother-like" personality throughout.

---

## ✨ Features

### ✅ Core Features Implemented

1. **Recipe Generation**
   - AI-generated recipes based on user preferences
   - Personalized ingredients and cooking instructions
   - Support for dietary preferences (vegetarian, non-veg, vegan)
   - Multiple cuisine options

2. **Pack My Bag - Packing List Generator**
   - Destination and duration-based packing suggestions
   - Weather-aware recommendations
   - Category-organized lists (clothes, shoes, accessories, etc.)
   - Personalized based on user profile

3. **Chatbot - MUMMY Health Companion**
   - AI-powered conversational health companion
   - Support for health queries, diet advice, fitness tips
   - Emotional support and mood tracking
   - Hinglish (Hindi + English) communication style
   - Session memory and conversation history

4. **Notification System**
   - 6 meal-time notifications:
     - Early Morning (5-7 AM)
     - Breakfast (7-9 AM)
     - Mid-Morning (10-11 AM)
     - Lunch (12-2 PM)
     - Evening Snack (4-5 PM)
     - Dinner (7-9 PM)
   - Time-based automatic triggers
   - Auto-dismiss with 5-second timer
   - Badge counter for pending notifications

5. **User Management**
   - Auto-login with demo user
   - User profile persistence
   - Conversation history tracking
   - Mood history tracking

6. **Diet Plans**
   - Pre-configured diet plans
   - Weight loss, muscle gain, maintenance options
   - Calorie tracking
   - Meal time scheduling

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | PHP 8.2.12 (XAMPP) |
| **Database** | MySQL (with mock data fallback) |
| **API** | Google Gemini 2.5 Flash |
| **Server** | Apache 2.4.58 |
| **Hosting** | XAMPP (Local Development) |

---

## 📁 Project Structure

```
mummy/
├── frontend/
│   ├── index.html                      # Main application page
│   ├── bimaar.html                     # Health tracking page
│   ├── app.js                          # Main application logic
│   ├── bimaar.js                       # Health tracking logic
│   ├── calories.js                     # Calorie calculation
│   ├── diet-plan-selector.js           # Diet plan selection
│   ├── diet-plans.js                   # Diet plan data
│   ├── notification-manager.js         # Notification UI management
│   ├── notification-service.js         # Notification logic
│   ├── notification-integration.js     # Notification integration
│   ├── styles.css                      # Main styles
│   ├── pictures/
│   │   └── logo.png
│   └── /notifications                  # Notification system files
│
├── backend/
│   ├── generate_recipes.php            # Recipe generation endpoint
│   ├── generate_packing.php            # Packing list endpoint
│   └── db_config.php                   # Database configuration
│
├── chatbot/
│   ├── chatbot-service.js              # Main chatbot AI logic
│   ├── chat-manager.js                 # UI management
│   ├── chatbot-config.js               # Configuration
│   ├── chatbot-styles.css              # Chatbot styling
│   ├── chatbot-data.json               # Chat history storage
│   └── README.md                       # Chatbot documentation
│
├── README.md                           # This file
├── ARCHITECTURE_DIAGRAM.md             # System architecture
└── DEPLOYMENT_VERIFICATION.md          # Deployment checklist
```

---

## 🔑 API KEYS SETUP (IMPORTANT)

### ⚠️ Critical: Where to Add Gemini API Keys

You need **3 separate Google Gemini API keys** for different services. Follow these steps:

### Step 1: Get Your API Keys

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key" (create 3 keys for different services)
3. Copy each key and save them securely

### Step 2: Add Keys to Frontend Files

#### **2A. Chatbot API Key** (`frontend/app.js`)

Find line ~1020 in `app.js`:

```javascript
// Line ~1020 - Look for: const chatbotUrl
// NO CHANGE NEEDED HERE - Chatbot is in separate file
```

**Actually, find this in `chatbot/chatbot-service.js` (Line 19):**

```javascript
// LOCATION: chatbot/chatbot-service.js - Line 19
this.geminiApiKey = 'YOUR_CHATBOT_API_KEY_HERE';
```

Replace with your chatbot key:
```javascript
this.geminiApiKey = 'AIzaSyDsaDVrrJ33S85Wgt7LfoPGwyirmIxR5xQ';  // Example
```

---

### Step 3: Add Keys to Backend Files

#### **3A. Recipe Generation** (`backend/generate_recipes.php`)

**LOCATION: Line 31**

```php
$GEMINI_API_KEY = "YOUR_RECIPE_API_KEY_HERE";
```

Replace with your recipes key:
```php
$GEMINI_API_KEY = "AIzaSyBK27YUkrWIuR7-pY1rjVVzF91_9-YHFR4";  // Example
```

---

#### **3B. Packing List Generation** (`backend/generate_packing.php`)

**LOCATION: Line 31**

```php
$GEMINI_API_KEY = "YOUR_PACKING_API_KEY_HERE";
```

Replace with your packing key:
```php
$GEMINI_API_KEY = "AIzaSyBJtuBKTyFjrEE0OSBsxMsUlTaKD2NEVig";  // Example
```

---

#### **3C. Packing Root Copy** (Duplicate file - IMPORTANT)

**LOCATION: `backend/generate_packing.php` - Line 31** (this file exists in TWO places)

Both files need the same key:
- `mummy/backend/generate_packing.php` - Line 31
- `mummy/generate_packing.php` - Line 31

Ensure both have the correct packing API key.

---

### Step 4: Verify API Keys are Correct

Check these files exist and have valid keys:

```bash
# Frontend - Chatbot
frontend/app.js (doesn't directly use it, but chatbot does)
chatbot/chatbot-service.js - Line 19

# Backend - Recipes
backend/generate_recipes.php - Line 31

# Backend - Packing
backend/generate_packing.php - Line 31
generate_packing.php - Line 31 (DUPLICATE - keep in sync)
```

---

## 📦 Installation & Setup

### Prerequisites

- **XAMPP** (Apache + PHP 8.2.12 + MySQL)
- **Google Gemini API Keys** (3 separate keys)
- **Modern Web Browser** (Chrome, Firefox, Edge, Safari)
- **Git** (for version control)

### Step 1: Install XAMPP

1. Download XAMPP from [apachefriends.org](https://www.apachefriends.org/)
2. Install with default settings (important: note installation path)
3. Start Apache and MySQL services

### Step 2: Clone/Download Project

```bash
git clone https://github.com/Dhvanish07/MUMMY.git
cd MUMMY
```

Or download and extract the ZIP file.

### Step 3: Copy Files to XAMPP

Copy the entire `mummy` folder to:

**Windows:**
```
C:\Users\[YourUsername]\Desktop\XAMPP\htdocs\mummy\
```

Or if installed in default location:
```
C:\xampp\htdocs\mummy\
```

**Mac/Linux:**
```
/Applications/XAMPP/xamppfiles/htdocs/mummy/
```

### Step 4: Add API Keys

Follow the **[API Keys Setup](#-api-keys-setup-important)** section above to add your 3 Gemini API keys.

### Step 5: Update Backend Database Config (Optional)

Edit `backend/db_config.php` if using a real database:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'mummy_db');
```

(Default settings work without a database - uses mock data)

### Step 6: Start the Application

1. Start XAMPP (Apache + MySQL)
2. Open browser and go to: `http://localhost/mummy/index.html`
3. Application should load with demo user auto-logged in

---

## 🚀 Deployment Instructions

### Local Development Deployment

```bash
# 1. Verify XAMPP is running
#    - Apache should show as "Running"
#    - MySQL should show as "Running"

# 2. Verify files are in correct location
#    - Check: C:\Users\[User]\Desktop\XAMPP\htdocs\mummy\

# 3. Verify API keys are added
#    - chatbot/chatbot-service.js - Line 19
#    - backend/generate_recipes.php - Line 31
#    - backend/generate_packing.php - Line 31

# 4. Access application
#    http://localhost/mummy/index.html
```

### Production Deployment (Future)

When deploying to a live server:

1. **Store API keys in environment variables** (never hardcode in production)
2. **Use `.env` file** and load via `php-dotenv`
3. **Enable HTTPS** for all communications
4. **Add rate limiting** to prevent API abuse
5. **Set up proper error logging**
6. **Configure CORS** properly
7. **Add database connection pooling**
8. **Implement request validation**

---

## ⚙️ Configuration

### Chatbot Configuration

Edit `chatbot/chatbot-config.js`:

```javascript
const ChatbotConfig = {
    greetings: {
        morning: "Good morning beta! Ready for a healthy day?",
        afternoon: "Namaste beta! How's your day going?",
        evening: "Hello beta! Time to wind down?",
        night: "Good night beta! Sleep well! 😴"
    },
    memorySettings: {
        auto_save_interval: 30000,  // 30 seconds
        max_history_length: 100
    }
};
```

### Notification Configuration

Edit `frontend/notification-service.js`:

```javascript
const MEAL_WINDOWS = [
    { name: 'Early Morning', start: 5, end: 7 },
    { name: 'Breakfast', start: 7, end: 9 },
    { name: 'Mid-Morning', start: 10, end: 11 },
    { name: 'Lunch', start: 12, end: 14 },
    { name: 'Evening Snack', start: 16, end: 17 },
    { name: 'Dinner', start: 19, end: 21 }
];
```

### API Configuration

All API configurations are in backend files:

**`backend/generate_recipes.php` (Line 30-32):**
```php
$GEMINI_API_KEY = "YOUR_KEY_HERE";
$GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
$MODEL_NAME = "gemini-2.5-flash";
```

**`backend/generate_packing.php` (Line 30-32):**
```php
$GEMINI_API_KEY = "YOUR_KEY_HERE";
$GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
$MODEL_NAME = "gemini-2.5-flash";
```

---

## 📖 Features in Detail

### 1. Recipe Generation

**How it works:**
1. User clicks "Generate Recipe" on index.html
2. Frontend collects user preferences (ingredients, spice level, diet type)
3. Sends request to: `http://localhost/mummy/backend/generate_recipes.php?user_id=1`
4. Backend calls Gemini API with recipe prompt
5. Returns personalized recipe with ingredients and instructions

**API Endpoint:**
```
GET /backend/generate_recipes.php?user_id={user_id}
```

**Response:**
```json
{
    "success": true,
    "recipe": "Full recipe text with ingredients and instructions"
}
```

---

### 2. Pack My Bag - Packing Lists

**How it works:**
1. User enters destination and trip duration
2. Clicks "Generate Packing List"
3. Sends request to: `http://localhost/mummy/backend/generate_packing.php?user_id=1&destination=Paris&days=5`
4. Backend calls Gemini API with packing prompt
5. Returns organized packing list by category

**API Endpoint:**
```
GET /backend/generate_packing.php?user_id={user_id}&destination={destination}&days={days}
```

**Response:**
```json
{
    "success": true,
    "destination": "Paris",
    "days": 5,
    "packing_list": "Organized packing list content"
}
```

---

### 3. Chatbot - MUMMY Companion

**How it works:**
1. User clicks chat icon on any page
2. Modal opens with chat interface
3. User types a message
4. Frontend sends to Gemini API via `chatbot/chatbot-service.js`
5. AI responds in caring, mother-like personality
6. Conversation history is saved to localStorage

**Features:**
- Hinglish support (Hindi + English)
- Mood tracking
- Health advice
- Diet suggestions
- Fitness tips
- Emotional support

**API Endpoint (Frontend):**
```javascript
// chatbot/chatbot-service.js - callGeminiAPI() function
// Uses: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
```

---

### 4. Notifications

**How it works:**
1. Service checks current time every minute
2. Matches against 6 meal windows (5AM-7AM, 7AM-9AM, etc.)
3. Shows notification if user hasn't been notified in that window today
4. Notification auto-dismisses after 5 seconds
5. Badge shows count of pending notifications

**Meal Windows:**
- 🌅 Early Morning: 5 AM - 7 AM
- 🍳 Breakfast: 7 AM - 9 AM
- ☕ Mid-Morning: 10 AM - 11 AM
- 🍛 Lunch: 12 PM - 2 PM
- 🥤 Evening Snack: 4 PM - 5 PM
- 🍽️ Dinner: 7 PM - 9 PM

---

### 5. User Profiles & Auto-Login

**Auto-Login Flow:**
1. On page load, check if `mummy_user_id` exists in localStorage
2. If not, create demo user with ID: `1`
3. Demo user name: `Beta`
4. Demo user profile includes preferences (vegetarian, medium spice, etc.)

**User Data Structure:**
```javascript
{
    userId: "1",
    name: "Beta",
    gender: "male",
    food_preference: "vegetarian",
    cooking_frequency: "sometimes",
    spice_level: "medium",
    cooking_time_preference: "30",
    late_night_hunger: "no",
    outside_food_frequency: "weekly",
    mummy_reminders: "yes",
    language_preference: "hinglish"
}
```

---

## 🔧 Troubleshooting

### Issue: "Backend error: 500"

**Causes & Solutions:**

1. **API Key is Invalid or Leaked**
   - Check if key is returning 403 "Permission Denied"
   - Generate a new API key from Google AI Studio
   - Replace in the appropriate backend file
   - Verify both recipe and packing files have different keys

2. **XAMPP is Not Running**
   - Start XAMPP Control Panel
   - Ensure Apache shows "Running"
   - Ensure MySQL shows "Running"

3. **Wrong XAMPP Installation Path**
   - You may have multiple XAMPP installations
   - Check: `C:\Users\[User]\Desktop\XAMPP\htdocs\`
   - Also check: `C:\xampp\htdocs\`
   - Deploy to the one with recent file timestamps

4. **Database Connection Issue**
   - Application uses mock data by default (no database needed)
   - If you see "User not found" error, this is expected with mock data
   - Don't worry - it uses fallback mock user "Beta"

---

### Issue: "Chatbot returns 400 Bad Request"

**Solution:**
- Verify chatbot is using Gemini native API format, NOT OpenAI format
- Check `chatbot/chatbot-service.js` Line 19:
```javascript
this.geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
```
- NOT: `/v1beta/openai/chat/completions` (this is wrong)

---

### Issue: "Notifications not appearing"

**Solutions:**

1. **Check if notifications are enabled in browser**
   - Go to browser settings
   - Find MUMMY site in notifications
   - Ensure notifications are allowed

2. **Check time windows**
   - Notifications only trigger during 6 meal windows
   - Current time must be within window (e.g., 7-9 AM for breakfast)
   - Each meal only triggers once per day

3. **Check console for errors**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check if notification service is running

---

### Issue: "Recipes or Packing lists showing "No content generated""

**Solutions:**

1. **Verify API key is correct**
   - Check if key shows 200 response (not 403/401)
   - Generate new key if old one is expired

2. **Check backend logs**
   - Look at XAMPP Apache logs
   - Check for PHP errors

3. **Test API directly**
   - Open in browser: `http://localhost/mummy/backend/generate_recipes.php?user_id=1`
   - Should show JSON response with recipe content

---

### Issue: "localStorage not saving data"

**Solutions:**

1. **Check if private/incognito mode**
   - localStorage doesn't work in private browsing
   - Use normal browsing mode

2. **Check browser storage settings**
   - Some browsers block localStorage
   - Go to Settings → Privacy → allow site storage

3. **Check for console errors**
   - May have quota exceeded
   - Clear old data: `localStorage.clear()`

---

### Issue: Files deployed but old code still running

**Solution:**

This usually means two XAMPP installations:

1. Check XAMPP location:
   - Is it `C:\xampp\` or `C:\Users\[User]\Desktop\XAMPP\`?
   
2. Deploy to CORRECT location:
```powershell
# Check which one is running
Get-Content "C:\xampp\apache\logs\httpd.pid"              # May be empty if not running
Get-Content "C:\Users\Dhvanish.07\Desktop\XAMPP\apache\logs\httpd.pid"  # This will have running process
```

3. Deploy to the one that has the running process

---

## 📞 Support & Help

For issues or questions:

1. **Check the troubleshooting section** above
2. **Review API keys configuration** - most issues are API key related
3. **Check browser console** (F12 → Console tab)
4. **Check Apache error logs** at `XAMPP/apache/logs/error.log`
5. **Review commit messages** on GitHub for recent changes

---

## 🔐 Security Best Practices

⚠️ **Important Security Notes:**

1. **Never commit API keys to GitHub**
   - Always use `.gitignore` for `.env` files
   - For development, store keys in local config files only

2. **Rotate keys regularly**
   - If a key is ever exposed, regenerate it
   - Disable old keys immediately

3. **Use environment variables in production**
   - Don't hardcode keys in PHP files
   - Use `$_ENV['GEMINI_KEY']` instead

4. **Add rate limiting**
   - Prevent API abuse
   - Implement request throttling

5. **Validate all inputs**
   - Sanitize user inputs
   - Validate before sending to API

---

## 📝 License

This project is for personal use and educational purposes.

---

## 👨‍💻 Developer Notes

- **Framework**: Vanilla JavaScript (no jQuery/React)
- **Backend**: PHP with file_get_contents (no cURL required)
- **AI Model**: Google Gemini 2.5 Flash
- **Browser Compatibility**: Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
- **Mobile Friendly**: Yes, responsive design included

---

## 🎉 Credits

Built with ❤️ using:
- Google Gemini 2.5 Flash API
- XAMPP Apache Server
- Vanilla JavaScript
- PHP 8.2

---

**Last Updated:** February 1, 2026
**Version:** 1.0.0 - Full Production Release
**Status:** ✅ All Features Working
