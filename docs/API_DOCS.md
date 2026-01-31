# 📡 API DOCUMENTATION

Complete API reference for MUMMY backend and Gemini integration.

---

## 🏗️ System Architecture

```
┌─────────────────┐
│   Frontend      │
│  (HTML/CSS/JS)  │
└────────┬────────┘
         │
         ├─────────────────────────────┐
         │                             │
         ▼                             ▼
    ┌─────────┐              ┌──────────────────┐
    │ Backend │              │  Gemini API      │
    │(PHP/MySQL)             │  (Google AI)     │
    └─────────┘              └──────────────────┘
         │
         ▼
    ┌─────────────┐
    │  Database   │
    │   (MySQL)   │
    └─────────────┘
```

---

## 🔐 Authentication APIs

### POST /backend/register.php

Register a new user.

**Request:**
```json
{
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "password": "securePassword123",
    "confirm": "securePassword123"
}
```

**Response (Success):**
```json
{
    "success": true,
    "message": "Registration successful",
    "data": {
        "userId": 1,
        "name": "Rajesh Kumar",
        "email": "rajesh@example.com"
    }
}
```

**Response (Error):**
```json
{
    "success": false,
    "message": "Email already registered",
    "data": null
}
```

**Status Codes:**
- `200` - Registration successful
- `400` - Validation error
- `500` - Server error

**Validation Rules:**
- Name: Required, min 3 characters
- Email: Required, valid format
- Password: Required, min 6 characters
- Passwords must match

---

### POST /backend/login.php

User login.

**Request:**
```json
{
    "email": "rajesh@example.com",
    "password": "securePassword123"
}
```

**Response (Success):**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "userId": 1,
        "name": "Rajesh Kumar",
        "email": "rajesh@example.com",
        "token": "a1b2c3d4e5f6g7h8i9j0"
    }
}
```

**Response (Error):**
```json
{
    "success": false,
    "message": "Invalid email or password",
    "data": null
}
```

---

## 🤖 Gemini API Integration

### Google Gemini - Generate Content

**Endpoint:**
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY
```

**Request:**
```json
{
    "contents": [
        {
            "parts": [
                {
                    "text": "You are a loving Indian mother... [complete prompt]"
                }
            ]
        }
    ]
}
```

**Response:**
```json
{
    "candidates": [
        {
            "content": {
                "parts": [
                    {
                        "text": "🍲 RECIPE 1\nTitle: Aloo Gobi\n... [recipe content]"
                    }
                ]
            }
        }
    ]
}
```

**Key Details:**
- **Model**: `gemini-pro`
- **Method**: POST
- **Auth**: API Key in query parameter
- **Content-Type**: application/json

---

## 📊 Ingredient Database Schema

### Vegetables
```javascript
{
    name: 'Aloo (Potato)',
    emoji: '🥔',
    category: 'vegetables',
    calories: 77,
    protein: 2.1
}
```

### Spices
```javascript
{
    name: 'Turmeric (Haldi)',
    emoji: '🟡',
    category: 'spices',
    healthBenefit: 'Anti-inflammatory'
}
```

### Complete Ingredient List

| Category | Items | Count |
|----------|-------|-------|
| Vegetables | Aloo, Pyaaz, Tamatar, etc. | 12 |
| Spices | Heeng, Jeera, Mirch, etc. | 10 |
| Grains | Chawal, Atta, Dal, etc. | 8 |
| Dairy | Doodh, Dahi, Paneer, etc. | 6 |
| Leftovers | Bacha Dhaniya, Roti, etc. | 6 |

---

## 💾 LocalStorage API

### Data Structure

```javascript
// Selected Ingredients
localStorage.getItem('mummy_selected_ingredients')
// Returns: JSON string of selected ingredient objects

// Health Status
localStorage.getItem('mummy_health_status')
// Returns: 'healthy', 'fever', 'cold', 'tired'

// User Login
localStorage.getItem('mummy_user_logged_in')
// Returns: 'true' or null

// User Name
localStorage.getItem('mummy_user_name')
// Returns: User's name string
```

### Example Usage

```javascript
// Save ingredients
const ingredients = [
    { name: 'Aloo', category: 'vegetables' },
    { name: 'Pyaaz', category: 'vegetables' }
];
localStorage.setItem('mummy_selected_ingredients', JSON.stringify(ingredients));

// Retrieve ingredients
const saved = JSON.parse(localStorage.getItem('mummy_selected_ingredients'));

// Save health status
localStorage.setItem('mummy_health_status', 'fever');

// Clear all data
localStorage.clear();
```

---

## 🔔 Notification API

### Browser Notification

```javascript
new Notification(title, {
    body: message,
    icon: '🍲',
    badge: '👩',
    tag: 'mummy-notification',
    requireInteraction: false
});
```

### Scheduled Notifications

```javascript
// Morning reminder
scheduleNotificationAt(7, 0, 
    '☀️ Subah ho gai beta!', 
    'Paani piya kya? Ek glass paani pee le.'
);

// Lunch reminder
scheduleNotificationAt(13, 0, 
    '🍽️ Lunch ka time!', 
    'Beta, khana to le le na...'
);
```

### Notification Permissions

```javascript
// Request permission
Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
        // Show notifications
    }
});

// Check permission
if (Notification.permission === 'granted') {
    new Notification('Hello!');
}
```

---

## 🧠 Recipe Generation Prompt

### System Prompt

```
You are a loving Indian mother (MUMMY) who suggests 
delicious home-style recipes. You communicate in warm, 
caring Hinglish (mix of Hindi and English).
```

### User Input

```
Available ingredients: aloo, pyaaz, tamatar, jeera, haldi
User health status: fever

Please suggest 2-3 authentic Indian home recipes...
```

### Expected Output Format

```
🍲 RECIPE 1
Title: Aloo Gobi
Subtitle: [Description in mother-like tone]

🥘 INGREDIENTS:
- Item 1: quantity
- Item 2: quantity

👩‍🍳 INSTRUCTIONS:
1. Step 1
2. Step 2

💚 MOTHER'S TIPS:
"Beta, agar... [caring tips in Hinglish]"
```

---

## 🌡️ Health Status Mapping

| Status | Emoji | Suggestion |
|--------|-------|-----------|
| healthy | 😊 | Normal spiced food |
| fever | 🤒 | Light, warm, easy to digest |
| cold | 🤧 | Warm, spicy foods with ginger |
| tired | 😴 | Energy-rich, protein-heavy foods |

### Health-Based Recipe Adjustments

**Fever:**
```
- Suggest: Khichdi, dal, light sabzi
- Avoid: Heavy, spicy, fried foods
- Include: Anti-inflammatory spices
```

**Cold:**
```
- Suggest: Hot soups, warm foods
- Include: Ginger, turmeric, black pepper
- Avoid: Cold foods
```

**Tired:**
```
- Suggest: Protein-rich, energy foods
- Include: Nuts, eggs, cheese
- Avoid: Very light foods
```

---

## 📈 API Rate Limits

### Gemini API
- **Free Tier**: 60 requests/minute
- **Burst**: 100 requests/minute (short duration)
- **Daily**: No daily limit
- **Cost**: Free for first 1 million tokens

### Backend APIs
- **Registration**: 5 requests/minute/IP
- **Login**: 10 requests/minute/IP
- **Recipe**: 60 requests/minute/user

---

## 🔄 API Response Format

### Standard Success Response

```json
{
    "success": true,
    "message": "Operation successful",
    "data": {
        "key": "value"
    }
}
```

### Standard Error Response

```json
{
    "success": false,
    "message": "Error description",
    "data": null
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limit Exceeded
- `500` - Server Error

---

## 🔐 Security Considerations

### CORS Headers
```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
```

### Input Validation
```php
// Sanitize inputs
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$name = htmlspecialchars($name);

// Validate
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // Invalid email
}
```

### Password Security
```php
// Hash password
$hashed = password_hash($password, PASSWORD_BCRYPT);

// Verify
if (password_verify($input, $hashed)) {
    // Password matches
}
```

---

## 📝 Example API Calls

### JavaScript (Fetch)

```javascript
// Register
fetch('backend/register.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'pass123',
        confirm: 'pass123'
    })
})
.then(r => r.json())
.then(d => console.log(d));
```

### cURL (Command Line)

```bash
curl -X POST http://localhost/mummy/backend/register.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "pass123",
    "confirm": "pass123"
  }'
```

### Python (Requests)

```python
import requests

response = requests.post('http://localhost/mummy/backend/register.php', json={
    'name': 'John Doe',
    'email': 'john@example.com',
    'password': 'pass123',
    'confirm': 'pass123'
})

print(response.json())
```

---

## 🧪 Testing

### Unit Test Example

```javascript
// Test ingredient selection
function testIngredientSelection() {
    const ingredient = { name: 'Aloo', category: 'vegetables' };
    toggleIngredient(ingredient, mockCard);
    
    assert(appState.selectedIngredients.length === 1);
    assert(appState.selectedIngredients[0].name === 'Aloo');
    console.log('✓ Ingredient selection test passed');
}

// Test recipe generation
async function testRecipeGeneration() {
    const recipes = await generateRecipes();
    
    assert(recipes.length > 0);
    assert(recipes[0].title);
    assert(recipes[0].ingredients.length > 0);
    console.log('✓ Recipe generation test passed');
}
```

---

## 📚 References

- [Gemini API Reference](https://ai.google.dev/api)
- [PHP MySQLi Documentation](https://www.php.net/manual/en/book.mysqli.php)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notification)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## 💬 Support

For API issues:
1. Check error messages in console
2. Verify API key/credentials
3. Check rate limits
4. Review CORS settings
5. Test with cURL or Postman

---

*Last Updated: January 31, 2026*
