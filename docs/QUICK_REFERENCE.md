# ⚡ QUICK REFERENCE GUIDE

Fast lookup for common tasks and configurations.

---

## 🚀 Quick Start (30 Seconds)

### Option 1: Demo (No Setup)
```bash
# Just open in browser
open frontend/login.html

# Login with any credentials
# Email: test@test.com
# Password: test123
```

### Option 2: With Gemini AI
```bash
# 1. Get API key from https://aistudio.google.com
# 2. Open frontend/app.js
# 3. Replace line 10:
CONFIG.GEMINI_API_KEY = 'YOUR_KEY_HERE';
# 4. Reload page
```

### Option 3: Full Setup (XAMPP)
```bash
# 1. Start XAMPP (Apache + MySQL)
# 2. Copy to htdocs: C:\xampp\htdocs\mummy
# 3. Open http://localhost/mummy/frontend/login.html
```

---

## 📁 File Structure Quick Reference

```
frontend/
  ├── index.html        ← Main app
  ├── login.html        ← Authentication
  ├── app.js            ← Logic & Gemini API
  └── styles.css        ← Styling

backend/
  ├── config.php        ← Database config
  ├── register.php      ← Sign up API
  └── login.php         ← Login API

docs/
  ├── README.md         ← Overview
  ├── SETUP.md          ← Installation
  ├── GEMINI_SETUP.md   ← AI config
  ├── API_DOCS.md       ← API reference
  ├── DEMO.md           ← Feature tour
  └── COMPLETION_CHECKLIST.md ← Done!
```

---

## 🔑 Configuration Quick Map

### Gemini API Key
**File**: `frontend/app.js` (Line ~10)
```javascript
CONFIG.GEMINI_API_KEY = 'AIzaSyDqwNS0C0z6q5HyP...';
```

### Database Config
**File**: `backend/config.php`
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'mummy_db');
```

### Backend URL
**File**: `frontend/app.js` (optional)
```javascript
const BACKEND_URL = 'http://localhost/mummy/backend';
```

---

## 🎨 Key CSS Variables

```css
:root {
    --primary-orange: #FF6B35;
    --primary-warm: #FFD166;
    --primary-green: #06A77D;
    --text-dark: #2D3436;
    --bg-light: #FEFDFB;
    --bg-warm: #FFF5E1;
}
```

---

## 🧠 Ingredient Categories Quick List

```javascript
// 5 Categories
1. Vegetables (12 items)
   - Aloo, Pyaaz, Tamatar, Gaajar, etc.

2. Spices (10 items)
   - Heeng, Jeera, Mirch, Turmeric, etc.

3. Grains (8 items)
   - Chawal, Atta, Dal, Moong, etc.

4. Dairy (6 items)
   - Doodh, Dahi, Paneer, etc.

5. Leftovers (6 items)
   - Bacha Dhaniya, Roti, Chawal, etc.
```

---

## 👩 Mother Personality Phrases

### Greetings
- "Aaj khane mein kya banau beta?"
- "Bhook lagi na?"
- "Ghar par kya kya hai?"

### Encouragement
- "Bahut achcha beta!"
- "Ye ingredient bhi hai."
- "Theek hai beta."

### Caring Tips
- "Paani piya kya?"
- "Khana skip mat kar"
- "Light khana kar de"

### Cooking Tips
- "Beta, zyada mat bhuno"
- "Taste badalne se pehle try kar"
- "Garam paani use kar"

---

## 🔔 Notification Schedule

| Time | Message | Purpose |
|------|---------|---------|
| 7:00 AM | ☀️ Subah ho gai! | Hydration |
| 1:00 PM | 🍽️ Lunch ka time! | Meal reminder |
| 4:00 PM | 🍵 Chai ka time! | Snack time |
| 8:00 PM | 🌙 Raat ko khana! | Dinner |
| 10:00 PM | 😴 Sone ka time! | Sleep reminder |

---

## 🏥 Health Status Quick Guide

```javascript
// Health buttons in app:

healthy  😊  → Normal spiced recipes
fever    🤒  → Light, warm foods
cold     🤧  → Hot, spicy foods
tired    😴  → Energy-rich foods
```

---

## 📱 Responsive Breakpoints

```css
Mobile    < 480px   /* Single/dual column */
Tablet    < 768px   /* Wider layout */
Desktop   > 1200px  /* Full grid layout */
```

---

## 🔗 Important API Endpoints

### Gemini API
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=API_KEY
```

### Backend (Optional)
```
POST /backend/register.php
POST /backend/login.php
GET  /backend/config.php (internal only)
```

### LocalStorage (Frontend)
```
mummy_selected_ingredients
mummy_health_status
mummy_user_logged_in
mummy_user_name
```

---

## 🔐 Security Checklist

- [ ] API key NOT in git
- [ ] Password hashed (bcrypt)
- [ ] SQL injection prevented
- [ ] XSS prevention active
- [ ] CORS configured
- [ ] Input validated
- [ ] Errors don't expose system info

---

## 🐛 Common Issues Quick Fix

| Issue | Solution |
|-------|----------|
| Nothing loads | Clear cache (Ctrl+Shift+Del) |
| Styles wrong | Hard refresh (Ctrl+F5) |
| API fails | Check API key in app.js |
| DB error | Check XAMPP MySQL running |
| Notifications off | Grant permission in browser |
| CORS error | Check backend endpoint URL |

---

## ⚙️ Browser DevTools Commands

```javascript
// Check app state
console.log(appState);

// Check configuration
console.log(CONFIG);

// Manually trigger recipe generation
generateRecipes();

// Check selected ingredients
console.log(appState.selectedIngredients);

// Force refresh data
location.reload();

// Clear all local data
localStorage.clear();
```

---

## 🚀 One-Line Commands

### Start Local Server (if using npm)
```bash
npx http-server frontend
```

### Start XAMPP
```bash
# Windows
xampp/xamppfiles/xampp start

# Mac
/Applications/XAMPP/xamppfiles/xampp start

# Linux
sudo /opt/lampp/lampp start
```

### Deploy Frontend
```bash
vercel deploy frontend/
```

---

## 📊 Ingredient Count Summary

| Category | Count | Examples |
|----------|-------|----------|
| Vegetables | 12 | Aloo, Pyaaz, Tamatar |
| Spices | 10 | Heeng, Jeera, Mirch |
| Grains | 8 | Chawal, Atta, Dal |
| Dairy | 6 | Doodh, Dahi, Paneer |
| Leftovers | 6 | Bacha Dhaniya, Roti |
| **TOTAL** | **42** | **All recipes need 3-5 items** |

---

## 📞 Documentation Index

| Document | Purpose | Read Time |
|----------|---------|-----------|
| README.md | Project overview | 5 min |
| SETUP.md | Installation guide | 10 min |
| GEMINI_SETUP.md | AI configuration | 5 min |
| API_DOCS.md | API reference | 10 min |
| DEMO.md | Feature walkthrough | 8 min |
| THIS FILE | Quick reference | 2 min |

---

## 🎬 Demo Sequence (3 minutes)

1. **Login** (20 sec)
   - Show login.html
   - Enter any credentials
   - Explain demo mode

2. **Explore Ingredients** (30 sec)
   - Show categories
   - Scroll through items
   - Highlight variety

3. **Select & Generate** (1 min)
   - Pick 3-4 ingredients
   - Select health status
   - Click "Aaj kya banau?"
   - Show loading animation

4. **View Recipes** (1 min)
   - Highlight recipe structure
   - Read mother's tip
   - Explain Hinglish tone
   - Show modal features

---

## 💡 Pro Tips

### For Development
- Keep browser DevTools open (F12)
- Check Console for errors
- Use Network tab for API debugging
- Test on mobile via localhost:port

### For Demo
- Have backup phone hotspot
- Cache page before presentation
- Have recipe screen ready
- Prepare talking points
- Have backup demo locally

### For Deployment
- Use HTTPS in production
- Store API key in .env file
- Enable CORS properly
- Set up error logging
- Monitor API usage

---

## 📈 Performance Tips

### For Faster Load
```javascript
// Cache recipes locally
const recipeCache = {};

// Only call API if needed
if (!recipeCache[key]) {
    recipes = await generateRecipes();
    recipeCache[key] = recipes;
}
```

### For Better UX
```javascript
// Debounce rapid selections
const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};
```

---

## 🎓 Learning Path

**If you're new to:**

### Frontend Development
- Start with `frontend/index.html`
- Understand structure
- Read `frontend/styles.css`
- Understand styling
- Study `frontend/app.js`
- Understand logic

### Backend Development
- Review `backend/config.php`
- Read `backend/register.php`
- Study `backend/login.php`
- Understand REST APIs

### AI Integration
- Read `docs/GEMINI_SETUP.md`
- Study prompt in `app.js`
- Understand API flow
- Experiment with prompts

---

## 🔗 Useful Links

### Official Documentation
- [Gemini API](https://ai.google.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [PHP Manual](https://www.php.net/manual)
- [MySQL Docs](https://dev.mysql.com/doc)

### Tools
- [Google AI Studio](https://aistudio.google.com)
- [XAMPP Download](https://www.apachefriends.org)
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)

### Testing
- [Postman](https://www.postman.com) - API testing
- [Chrome DevTools](https://developer.chrome.com/docs/devtools) - Debugging
- [Can I Use](https://caniuse.com) - Browser support

---

## 🎯 Quick Decision Tree

```
Want to run immediately?
└─ Open frontend/login.html ✅

Want working recipes?
└─ Add Gemini API key ✅

Want full backend?
└─ Setup XAMPP + database ✅

Want to deploy?
├─ Frontend only? → Vercel/Netlify
└─ Full stack? → Heroku/Digital Ocean
```

---

## 🌟 Feature Quick Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Ingredient selector | ✅ | 42 items, 5 categories |
| Recipe generation | ✅ | Uses Gemini API |
| Mother personality | ✅ | Hinglish tone |
| Health suggestions | ✅ | 4 health states |
| Notifications | ✅ | Browser API |
| Authentication | ✅ | Demo + PHP backend |
| Responsive design | ✅ | Mobile first |
| Dark mode | ⏳ | Optional future |
| PWA support | ⏳ | Optional future |

---

## ✨ You're All Set!

Everything is ready:
- ✅ Code complete
- ✅ Documented
- ✅ Tested
- ✅ Deployable
- ✅ Demo-ready

**Just open `frontend/login.html` and start cooking!** 👩‍🍳

---

*Last Updated: January 31, 2026*
*Status: Complete & Ready*
