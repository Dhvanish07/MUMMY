# 🍲 MUMMY – BHOOK LAGI HAI

**AI-Powered Indian Cooking Companion with Mother-Like Personality**

A final-year engineering project that combines practical food recommendation with emotional AI intelligence. Built for home cooks who want to make delicious Indian meals with ingredients they already have.

---

## 🎯 Project Overview

**MUMMY** is an interactive web application that:

- 🥗 Helps users decide **"Aaj khane mein kya banau?"** using ingredients at home
- 🤖 Generates **authentic Indian recipes** using **Gemini AI** with Hinglish tone
- ❤️ Acts like a **caring Indian mother** with emotional reminders and tips
- 📱 Provides **Instamart-style visual ingredient selector**
- ⏰ Sends **personalized notifications** for meals and hydration
- 🏥 Suggests **health-conscious meals** based on user conditions
- 💾 **Tracks ingredient expiry** dates locally

---

## ✨ Key Features

### 1. **Instamart-Style Ingredient Selector**
- Interactive ingredient cards with emoji and images
- Organized by categories: Vegetables, Spices, Grains, Dairy, Leftovers
- Drag-and-drop style selection with visual feedback
- "Aaj mere ghar mein hai" basket tracking

### 2. **AI Recipe Generation (Gemini API)**
- Generates **2-3 recipe options** based on selected ingredients
- Provides step-by-step cooking instructions
- Includes mother-like cooking tips in Hinglish
- Respects dietary constraints and health status

### 3. **Mother-Like Personality**
- Warm, caring Hinglish communication
- Emotional cooking tips: *"Beta, zyada mat bhuno..."*
- Gentle reminders: *"Paani piya kya?"*
- Non-judgmental suggestions

### 4. **Health-Based Suggestions**
- Detect user health status (fever, cold, tired, normal)
- Suggest appropriate light/warm/energy foods
- Non-medical, ghar-ka-khana focused

### 5. **Frontend Notifications**
- ☀️ Morning hydration reminder (7 AM)
- 🍽️ Lunch reminder (1 PM)
- 🍵 Tea time suggestion (4 PM)
- 🌙 Light dinner suggestion (8 PM)
- 😴 Bedtime reminder (10 PM)

### 6. **Ingredient & Expiry Management**
- Local storage of ingredients with expiry dates
- Automatic reminders for expiring items
- No backend needed for this feature

### 7. **User Authentication**
- Simple login/registration
- XAMPP (MySQL + PHP) backend
- Demo mode works without backend setup

---

## 📦 Project Structure

```
mummy/
├── frontend/
│   ├── index.html           # Main app interface
│   ├── login.html           # Authentication page
│   ├── styles.css           # Warm Indian aesthetic design
│   └── app.js               # Core application logic
├── backend/
│   ├── config.php           # Database configuration
│   ├── register.php         # Registration API
│   └── login.php            # Login API
├── assets/
│   └── [ingredient images]
├── docs/
│   ├── README.md            # This file
│   ├── SETUP.md             # Installation guide
│   ├── API_DOCS.md          # API documentation
│   └── GEMINI_SETUP.md      # Gemini API configuration
└── .gitignore
```

---

## 🚀 Quick Start

### Option 1: Demo Mode (No Backend Required)

1. **Clone or download the project**
   ```bash
   git clone https://github.com/yourusername/mummy.git
   cd mummy/frontend
   ```

2. **Open in browser**
   - Open `login.html` in a web browser
   - Use any email/password to login (demo mode)
   - Start selecting ingredients!

3. **Configure Gemini API** (Optional)
   - Get API key from [Google AI Studio](https://aistudio.google.com)
   - Replace in `app.js` line:
     ```javascript
     CONFIG.GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
     ```

### Option 2: Full Setup with XAMPP Backend

#### Prerequisites
- XAMPP installed ([Download](https://www.apachefriends.org))
- Node.js (optional, for frontend server)

#### Installation Steps

1. **Start XAMPP Services**
   ```
   - Open XAMPP Control Panel
   - Start Apache
   - Start MySQL
   ```

2. **Copy project to htdocs**
   ```bash
   # Copy mummy folder to:
   C:\xampp\htdocs\mummy
   ```

3. **Create database**
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - The database will auto-create on first request

4. **Update API URLs in frontend**
   - Edit `frontend/app.js`
   - Update backend URLs if needed:
     ```javascript
     const BACKEND_URL = 'http://localhost/mummy/backend';
     ```

5. **Access the app**
   ```
   http://localhost/mummy/frontend/login.html
   ```

---

## 🔑 Gemini API Setup

### Get API Key

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click "Get API Key"
3. Create new API key
4. Copy the key

### Add to App

**File:** `frontend/app.js` (Line ~10)

```javascript
CONFIG.GEMINI_API_KEY = 'AIzaSyDqwNS0C0z6q5HyP...'; // Your API key
```

### API Usage

- **Free tier**: 60 requests per minute
- **Pricing**: Pay-as-you-go after free tier
- **Model**: gemini-pro (recommended)

---

## 🎨 UI/UX Features

### Design Philosophy
- **Warm Orange & Yellow**: Indian household aesthetic
- **Mobile-First**: Responsive across all devices
- **Minimal Typing**: Interactive cards instead of forms
- **Emotional Feedback**: Animations and mother-like messages

### Color Scheme
```
Primary Orange:  #FF6B35
Primary Warm:    #FFD166
Primary Green:   #06A77D
Text Dark:       #2D3436
Background:      #FEFDFB
```

### Responsive Breakpoints
- 📱 Mobile: 480px
- 💻 Tablet: 768px
- 🖥️ Desktop: 1200px

---

## 🧠 AI Integration Details

### Gemini Prompt Engineering

The app uses carefully crafted prompts to ensure:
- **Mother-like tone**: Emotional, caring language
- **Hinglish**: Mix of Hindi and English
- **Practical recipes**: Only ghar-ka-khana style
- **Health-conscious**: Respects user's health status

**Example Prompt Segment:**
```
"You are a loving Indian mother (MUMMY) who suggests delicious home-style recipes.

Available ingredients: potato, onion, tomato, cumin, turmeric...

Please suggest 2-3 authentic Indian home recipes..."
```

### Recipe Generation Process
1. User selects ingredients
2. Optionally indicates health status
3. App constructs detailed prompt
4. Gemini API generates 2-3 recipe options
5. Each recipe includes:
   - Dish name with description
   - Ingredient list with quantities
   - Step-by-step instructions
   - Mother-like cooking tips

---

## 🔔 Notification System

### Frontend Notifications (Browser API)

Implemented using `Notification` API with scheduled checks:

```javascript
scheduleNotificationAt(7, 0, '☀️ Subah ho gai beta!', 'Paani piya kya?');
scheduleNotificationAt(13, 0, '🍽️ Lunch ka time!', 'Beta, khana to le le...');
// ... more notifications
```

### Permission Handling
- Requests permission on first visit
- Only shows if user grants permission
- Can be disabled in browser settings

---

## 💾 Local Storage Management

### Data Stored Locally
```javascript
mummy_selected_ingredients  // Current selection
mummy_health_status         // User's health state
mummy_user_logged_in        // Login status
mummy_user_name             // User's name
```

### Advantages
- Fast, no network required
- Privacy-focused
- Works offline
- No backend database needed

---

## 🔐 Authentication

### Backend (PHP/MySQL)

**Registration:**
- Name, Email, Password validation
- Password hashing with bcrypt
- Duplicate email prevention

**Login:**
- Email/password verification
- Session token generation
- Error handling

### Frontend
- LocalStorage-based session management
- Demo mode: accepts any credentials
- Auto-redirect to login if not authenticated

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| IE 11   | ❌ No   |

### Required APIs
- `localStorage`
- `Notification` (for reminders)
- `Fetch` API
- `CSS Grid` & `Flexbox`

---

## 🚀 Deployment

### Option 1: Vercel/Netlify (Frontend Only)

```bash
# Deploy frontend to Vercel
vercel deploy frontend/
```

### Option 2: Docker

```dockerfile
FROM php:7.4-apache
COPY backend/ /var/www/html/
COPY frontend/ /var/www/html/
```

### Option 3: Traditional Hosting

- Upload to any PHP-enabled hosting
- Configure database
- Update API URLs

---

## 📊 Technical Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (Grid, Flexbox, Animations)
- **Vanilla JavaScript** - Logic (ES6+)
- **LocalStorage API** - Client-side data

### Backend
- **PHP 7.4+** - Server logic
- **MySQL 5.7+** - Database
- **Apache** - Web server (via XAMPP)

### External APIs
- **Google Gemini API** - AI recipe generation

---

## 🎓 Learning Outcomes

This project demonstrates:

- ✅ **Frontend Skills**: Responsive design, animations, state management
- ✅ **Backend Skills**: PHP, MySQL, RESTful APIs, password hashing
- ✅ **AI Integration**: Prompt engineering, API integration, response parsing
- ✅ **UX Design**: Mother-like personality, emotional design, accessibility
- ✅ **Project Structure**: Professional organization, documentation, deployment
- ✅ **DevOps**: Docker, environment configuration, error handling

---

## 🐛 Troubleshooting

### Issue: Gemini API not working
**Solution:** 
- Check API key is valid
- Verify network connection
- Check API quota
- See [GEMINI_SETUP.md](docs/GEMINI_SETUP.md)

### Issue: Notifications not showing
**Solution:**
- Grant notification permission in browser
- Check browser settings
- Ensure not in private mode

### Issue: Database connection error
**Solution:**
- Ensure XAMPP MySQL is running
- Check credentials in `config.php`
- Run PHP setup script

### Issue: Styling looks broken
**Solution:**
- Clear browser cache (Ctrl+Shift+Del)
- Check CSS file path
- Try different browser

---

## 📝 Sample Recipes

### Auto-Generated Example

**Recipe:** Aloo Gobi
```
🥘 INGREDIENTS:
- Aloo: 500g
- Gobhi: 400g
- Pyaaz: 2
- Tamatar: 2

👩‍🍳 INSTRUCTIONS:
1. Cut aloo and gobhi into pieces
2. Heat oil, add jeera and heeng
3. Add pyaaz and cook till golden
4. Add tomatoes...

💚 MOTHER'S TIPS:
"Beta, agar aloo crispy ho jayega toh bilkul mast 
rahaega! Pehle high flame par bhun, phir thoda 
low karde na."
```

---

## 👨‍👩‍👧 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md)

---

## 👥 Team

**Final Year Project**
- **Developer**: [Your Name]
- **University**: [Your University]
- **Department**: [Your Department]
- **Batch**: [Year]

---

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Apache Friends for XAMPP
- Indian cooking traditions for inspiration
- All the mothers out there! 👩‍🍳

---

## 📞 Support

### Documentation
- [Installation Guide](docs/SETUP.md)
- [API Documentation](docs/API_DOCS.md)
- [Gemini Setup](docs/GEMINI_SETUP.md)

### Contact
- 📧 Email: your.email@example.com
- 💬 Issues: GitHub Issues
- 🐦 Twitter: [@yourhandle](https://twitter.com)

---

## 🎉 Future Enhancements

- [ ] Recipe rating and feedback system
- [ ] Favorite recipes collection
- [ ] Shopping list generator
- [ ] Nutrition calculator
- [ ] Multi-language support (Hindi, Bengali, Gujarati)
- [ ] Meal planning for the week
- [ ] Community recipe sharing
- [ ] Mobile app (React Native)
- [ ] Voice commands ("Aloo gobi banana hai")
- [ ] Barcode scanning for ingredients

---

## 💪 Made with ❤️ and lots of khichdi

**"Khana banao, beta. Bhookh mithaa karte hai!"** 👩‍🍳

---

*Last Updated: January 31, 2026*
