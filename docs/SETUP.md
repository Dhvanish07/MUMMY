# 🚀 INSTALLATION & SETUP GUIDE

Complete step-by-step guide to get MUMMY running locally.

---

## 📋 System Requirements

- **OS**: Windows, Mac, or Linux
- **Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Backend** (optional): XAMPP 7.4+
- **Internet**: Required for Gemini API

---

## ⚡ Quick Start (5 Minutes)

### 1. Open Frontend

```bash
# Navigate to frontend folder
cd mummy/frontend

# Open login.html in your browser
# Double-click login.html or use:
# Windows: start login.html
# Mac: open login.html
# Linux: xdg-open login.html
```

### 2. Login (Demo Mode)
- Email: **any@email.com**
- Password: **anything123**

### 3. Enjoy!
- Select ingredients
- Click "Aaj kya banau?"
- Get recipes!

---

## 🔑 Enable AI Recipes (Gemini API)

### 1. Get API Key
1. Visit https://aistudio.google.com
2. Click "Get API Key"
3. Copy the key

### 2. Add to App
1. Open `frontend/app.js`
2. Find line 10: `GEMINI_API_KEY: 'AIzaSyDqwNS...'`
3. Replace with your key
4. Save file

### 3. Test
- Select ingredients
- Click "Aaj kya banau?"
- You should see AI-generated recipes!

See [GEMINI_SETUP.md](GEMINI_SETUP.md) for detailed setup.

---

## 🗄️ Full Setup with XAMPP (Optional)

### For Production / Team Collaboration

#### Step 1: Install XAMPP

**Windows:**
1. Download from https://www.apachefriends.org
2. Run installer
3. Choose install location
4. Install Apache + MySQL

**Mac:**
```bash
brew install xampp
```

**Linux:**
```bash
sudo apt-get install xampp-linux
```

#### Step 2: Start Services

**Windows:**
1. Open XAMPP Control Panel
2. Click "Start" next to Apache
3. Click "Start" next to MySQL

**Mac/Linux:**
```bash
sudo /Applications/XAMPP/xamppfiles/xampp restart
# or for Linux:
sudo /opt/lampp/lampp restart
```

#### Step 3: Copy Project

```bash
# Copy mummy folder to htdocs
# Windows:
xcopy mummy C:\xampp\htdocs\mummy /E /I

# Mac/Linux:
cp -r mummy /Applications/XAMPP/xamppfiles/htdocs/
```

#### Step 4: Database Setup

1. Open http://localhost/phpmyadmin
2. Database will auto-create on first request
3. Or manually run:

```sql
CREATE DATABASE mummy_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Step 5: Update Configuration (if needed)

**File:** `backend/config.php`

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');      // Usually empty for XAMPP
define('DB_NAME', 'mummy_db');
```

#### Step 6: Access App

```
http://localhost/mummy/frontend/login.html
```

---

## 🐳 Docker Setup (Advanced)

### Prerequisites
- Docker installed ([Download](https://www.docker.com/products/docker-desktop))

### Dockerfile

```dockerfile
FROM php:7.4-apache

# Enable PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy project files
COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Enable mod_rewrite
RUN a2enmod rewrite

EXPOSE 80
```

### Run Container

```bash
# Build image
docker build -t mummy:latest .

# Run container
docker run -p 80:80 \
  -e DB_HOST=mysql \
  -e DB_USER=root \
  -e DB_PASSWORD=root \
  mummy:latest
```

### Docker Compose

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "80:80"
    depends_on:
      - mysql
    environment:
      DB_HOST: mysql
      DB_USER: root
      DB_PASSWORD: root

  mysql:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: mummy_db
    ports:
      - "3306:3306"
```

Run with:
```bash
docker-compose up
```

---

## 🌐 Deploy to Cloud

### Option 1: Vercel (Frontend Only)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

### Option 2: Heroku (Full Stack)

```bash
# Create Heroku app
heroku create mummy-app

# Add MySQL
heroku addons:create cleardb:ignite

# Deploy
git push heroku main
```

### Option 3: Netlify (Frontend Only)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=frontend
```

---

## 🔧 Environment Variables

### .env File

```env
# Backend Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mummy_db

# Gemini API
GEMINI_API_KEY=AIzaSyDqwNS...

# App Configuration
APP_NAME=MUMMY
APP_ENV=development
APP_DEBUG=true
```

### Load in PHP

```php
<?php
$dotenv = parse_ini_file('.env');
define('GEMINI_API_KEY', $dotenv['GEMINI_API_KEY']);
?>
```

---

## ✅ Verification Checklist

- [ ] Frontend loads without errors
- [ ] Login/registration works
- [ ] Ingredients display correctly
- [ ] Ingredient selection updates basket
- [ ] "Aaj kya banau?" button enables with selection
- [ ] Notifications work (check browser console)
- [ ] Health status buttons function
- [ ] Modal opens with recipes
- [ ] Gemini API returns recipes (if configured)

---

## 🐛 Common Issues & Solutions

### Issue: "CORS Error" / "API request blocked"

**Cause:** Browser blocking cross-origin request

**Solution 1 - Development:**
```javascript
// Use CORS proxy (development only)
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
```

**Solution 2 - Production:**
Create backend API endpoint to proxy Gemini requests.

### Issue: Page blank / Nothing loads

**Check:**
1. Browser console (F12) for errors
2. Network tab for failed requests
3. Clear cache (Ctrl+Shift+Delete)
4. Try different browser
5. Check file paths are correct

### Issue: Notifications not showing

**Check:**
1. Browser permission granted
2. Not in Private/Incognito mode
3. OS notifications enabled
4. Check system volume

### Issue: Database connection error

**Check:**
1. XAMPP MySQL running
2. Credentials correct in `config.php`
3. Database created
4. Port 3306 available

### Issue: Styling looks wrong

**Solution:**
```
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh page (Ctrl+F5)
3. Check styles.css file exists
4. Check CSS file path in HTML
```

---

## 📦 Dependencies

### Frontend
- No external dependencies required!
- Pure HTML, CSS, JavaScript
- Uses browser APIs only

### Backend (Optional)
- PHP 7.4+
- MySQL 5.7+
- Apache web server

### External APIs
- Google Gemini API (free tier available)

---

## 🚀 Development Setup

### For Contributors

```bash
# Clone repository
git clone https://github.com/yourusername/mummy.git
cd mummy

# Install dependencies (if any)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

---

## 📊 Project Structure Explained

```
mummy/
├── frontend/                  # Frontend code
│   ├── index.html            # Main interface
│   ├── login.html            # Authentication
│   ├── app.js                # Core logic
│   └── styles.css            # Styling
├── backend/                  # Backend code (PHP)
│   ├── config.php            # Database config
│   ├── register.php          # Registration API
│   └── login.php             # Login API
├── assets/                   # Images, icons
├── docs/                     # Documentation
│   ├── README.md
│   ├── SETUP.md (this file)
│   ├── GEMINI_SETUP.md
│   └── API_DOCS.md
└── .gitignore
```

---

## 🔐 Security Checklist

- [ ] Gemini API key not in frontend code (production)
- [ ] MySQL password changed from default
- [ ] HTTPS enabled (for production)
- [ ] Input validation on all forms
- [ ] SQL injection prevention (prepared statements)
- [ ] XSS prevention (sanitized output)
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Error messages don't expose system info

---

## 📱 Testing on Devices

### Desktop
```bash
# Local testing
http://localhost/mummy/frontend/login.html
```

### Mobile (Local Network)

1. Find your local IP:
```bash
# Windows:
ipconfig | findstr "IPv4"

# Mac/Linux:
ifconfig | grep inet
```

2. Open in mobile browser:
```
http://YOUR_IP:80/mummy/frontend/login.html
```

3. Make sure firewall allows access

### Remote Testing
- Deploy to cloud service
- Share public URL
- Test on various devices

---

## 🎓 Learning Path

**Beginner:**
1. Run demo mode
2. Try selecting ingredients
3. Generate recipes

**Intermediate:**
1. Set up Gemini API
2. Customize prompts
3. Add new ingredients

**Advanced:**
1. Set up XAMPP backend
2. Modify database schema
3. Deploy to cloud
4. Add authentication

---

## 📞 Support Resources

### Official Docs
- [Google Gemini Docs](https://ai.google.dev)
- [XAMPP Docs](https://www.apachefriends.org)
- [PHP Manual](https://www.php.net/manual)
- [MDN Web Docs](https://developer.mozilla.org)

### Community
- Stack Overflow
- GitHub Issues
- Reddit (r/webdev, r/PHP)
- Discord communities

---

## 🎉 You're All Set!

Now you have a fully functional MUMMY application. Next steps:

1. **Customize**: Add more ingredients, modify UI
2. **Deploy**: Share with friends and family
3. **Enhance**: Add features from [README.md](README.md#-future-enhancements)
4. **Contribute**: Share improvements back to community

---

## 💪 Made with ❤️

**Happy Cooking, Beta!** 👩‍🍳

---

*Last Updated: January 31, 2026*
