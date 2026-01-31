# 🔑 GEMINI API SETUP GUIDE

Complete guide to integrate Google Gemini API with MUMMY application.

---

## 📋 Prerequisites

- Google Account
- Basic understanding of API keys
- Text editor to update code

---

## 🚀 Step-by-Step Setup

### Step 1: Access Google AI Studio

1. Open browser and go to: https://aistudio.google.com
2. Sign in with your Google Account
3. Accept the terms if prompted

### Step 2: Create API Key

1. Click on **"Get API Key"** button (usually top-right)
2. Select **"Create API key in new project"** or existing project
3. A new API key will be generated
4. **Copy the key** (you'll need this)

### Step 3: Update MUMMY App

1. Open `frontend/app.js` file
2. Find this line (around line 10):
   ```javascript
   GEMINI_API_KEY: 'AIzaSyDqwNS0C0z6q5HyP...', // TODO: Replace with your Gemini API key
   ```

3. Replace with your actual key:
   ```javascript
   GEMINI_API_KEY: 'AIzaSyDqwNS0C0z6q5HyP_YOUR_ACTUAL_KEY_HERE',
   ```

4. Save the file

### Step 4: Test the Integration

1. Open the app in browser
2. Select some ingredients
3. Click "Aaj kya banau?" button
4. Wait for recipes to load
5. If successful, you'll see AI-generated recipes!

---

## ✅ Verification Checklist

- [ ] API key copied correctly
- [ ] No spaces before/after the key
- [ ] Key is in quotes
- [ ] File is saved
- [ ] Browser cache cleared
- [ ] Recipes loading successfully

---

## 🔍 Troubleshooting

### Issue: "API request failed"

**Possible Causes:**
- Invalid API key
- Network connectivity issue
- API quota exceeded
- Wrong API endpoint

**Solution:**
```javascript
// Check if key is valid
console.log(CONFIG.GEMINI_API_KEY);

// Should NOT show:
// AIzaSyDqwNS0C0z6q5HyP...
// undefined
// null
```

### Issue: "Gemini API request failed" error

**Check:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Verify API is enabled
3. Check usage/quota limits
4. Ensure billing is configured (for production)

### Issue: CORS Error

**Cause:** Browser blocking cross-origin request

**Solution:**
- Use a CORS proxy (for development)
- Deploy backend API endpoint (for production)
- Configure CORS properly in backend

```javascript
// Example with CORS proxy (development only)
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const GEMINI_API_URL = CORS_PROXY + 'https://generativelanguage.googleapis.com/...';
```

---

## 📊 API Limits

### Free Tier
- **Requests**: 60 per minute
- **Cost**: Free
- **Model**: gemini-pro

### Production Tier
- **Pricing**: Pay-as-you-go
- **Cost**: $0.00075 per 1000 input tokens
- **Tokens**: Approximately 4 characters = 1 token

---

## 💰 Cost Estimation

### Typical Usage
- Average recipe generation: ~500 input + 500 output tokens
- Cost per request: ~$0.001 (0.1 cents)
- 1000 requests: ~$1

---

## 🔐 Security Best Practices

### ⚠️ IMPORTANT: Don't expose API key in production!

**Bad Practice:**
```javascript
// ❌ NEVER do this!
CONFIG.GEMINI_API_KEY = 'AIzaSyDqwNS...'; // Exposed in frontend code!
```

**Good Practice - Backend Proxy:**
```
Frontend → Your Backend → Gemini API
```

**Implementation:**
```php
// backend/generate-recipe.php
<?php
$apiKey = getenv('GEMINI_API_KEY'); // From .env file
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.gemini.com/...');
// Make request
$response = curl_exec($ch);
// Return response to frontend
echo $response;
?>
```

---

## 🧠 Prompt Engineering Tips

### Optimize Recipe Generation

**Current Prompt:**
```
Available ingredients: aloo, pyaaz, tamatar
Generate Indian recipes...
```

**Better Prompt:**
```
Available ingredients: aloo, pyaaz, tamatar

Generate 2-3 authentic Indian home recipes that:
1. Use ONLY the listed ingredients
2. Include detailed step-by-step instructions
3. Provide mother-like cooking tips in Hinglish
4. Are ghar-ka-khana (home-style) not restaurant
5. Take less than 30 minutes to prepare
```

### Prompt Structure
1. **Role**: "You are a caring Indian mother..."
2. **Context**: User's health status
3. **Input**: Available ingredients
4. **Output Format**: Recipe structure
5. **Constraints**: Only home recipes, Hinglish tone

---

## 🔄 Updating API Key

### If you need to change the key:

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Create new API key
3. Disable old key (optional but recommended)
4. Update in `frontend/app.js`
5. Save and test

---

## 🚀 Advanced Usage

### Batch Recipe Generation

```javascript
async function generateMultipleRecipes(ingredientSets) {
    const recipes = [];
    for (let ingredients of ingredientSets) {
        const recipe = await generateRecipe(ingredients);
        recipes.push(recipe);
    }
    return recipes;
}
```

### Caching Responses

```javascript
// Cache recipes to reduce API calls
const recipeCache = new Map();

function getCachedRecipe(ingredientKey) {
    return recipeCache.get(ingredientKey);
}

function cacheRecipe(ingredientKey, recipe) {
    recipeCache.set(ingredientKey, recipe);
}
```

### Error Handling

```javascript
async function generateRecipesWithRetry(maxAttempts = 3) {
    for (let i = 0; i < maxAttempts; i++) {
        try {
            return await generateRecipes();
        } catch (error) {
            console.log(`Attempt ${i + 1} failed, retrying...`);
            if (i === maxAttempts - 1) throw error;
            await delay(1000 * (i + 1)); // Exponential backoff
        }
    }
}
```

---

## 📚 Gemini Models

### Available Models

| Model | Use Case | Cost |
|-------|----------|------|
| gemini-pro | Text generation | Lowest |
| gemini-pro-vision | Image + text | Medium |
| gemini-ultra | Most capable | Highest |

**Recommended for MUMMY:** `gemini-pro`

---

## 🔗 Useful Resources

- [Gemini API Documentation](https://ai.google.dev/tutorials/python_quickstart)
- [Google Cloud Console](https://console.cloud.google.com)
- [Prompt Engineering Guide](https://ai.google.dev/tutorials/python_quickstart)
- [API Reference](https://ai.google.dev/api/rest)

---

## 📞 Support

### Getting Help

1. Check Google AI Studio documentation
2. Review error messages in browser console
3. Check API quota in Google Cloud Console
4. Post issue on GitHub

### Debug Command

```javascript
// In browser console:
console.log('API Key:', CONFIG.GEMINI_API_KEY);
console.log('API URL:', CONFIG.GEMINI_API_URL);

// Test API call:
fetch(CONFIG.GEMINI_API_URL + `?key=${CONFIG.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: 'Test' }] }] })
})
.then(r => r.json())
.then(d => console.log('Response:', d));
```

---

## 🎉 You're All Set!

Once configured, MUMMY will:
- ✅ Generate authentic Indian recipes
- ✅ Provide mother-like tips
- ✅ Respect dietary constraints
- ✅ Handle health-based suggestions

**Happy cooking, beta!** 👩‍🍳
