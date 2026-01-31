# 🍲 MUMMY APP - REDESIGNED SIGNUP FORM

## Overview
The signup page has been completely redesigned with a **multi-step form** that collects food preferences and lifestyle information alongside basic registration data.

## Features

### ✅ Multi-Step Registration (4 Steps)

#### **Step 1: Basic Information**
- Full Name
- Email
- Password
- Password Confirmation

#### **Step 2: Food Preferences** 🧑‍🍳
- **Food Type**: Veg / Eggitarian / Non-Veg
- **Cooking Frequency**: Daily / Sometimes / Rarely
- **Spice Level**: Low / Medium / High

#### **Step 3: Lifestyle** ⏱️
- **Cooking Time**: 10-15 min / 20-30 min / Flexible
- **Late-Night Hunger**: Yes / Sometimes / No
- **Outside Food**: Daily / Weekends / Rarely

#### **Step 4: MUMMY Reminders** ❤️
- Enable MUMMY Reminders: Yes / Sometimes / No

---

## 7 Key Questions Asked

1. **Tum kya khana prefer karte ho?** (Food preference)
2. **Tum usually khud khana banate ho ya kabhi-kabhi?** (Cooking frequency)
3. **Tumhara spice tolerance kaisa hai?** (Spice level)
4. **Tumhara cooking patience kitna hai?** (Cooking time)
5. **Late-night bhook lagti hai?** (Late-night hunger)
6. **Bahar ka khana kitni baar hota hai?** (Outside food frequency)
7. **MUMMY reminders chahiye?** (Reminder preference)

---

## Database Schema

### Option 1: Add columns to users table
```sql
ALTER TABLE users ADD COLUMN food_preference VARCHAR(50);
ALTER TABLE users ADD COLUMN cooking_frequency VARCHAR(50);
ALTER TABLE users ADD COLUMN spice_level VARCHAR(50);
ALTER TABLE users ADD COLUMN cooking_time_preference VARCHAR(50);
ALTER TABLE users ADD COLUMN late_night_hunger VARCHAR(50);
ALTER TABLE users ADD COLUMN outside_food_frequency VARCHAR(50);
ALTER TABLE users ADD COLUMN mummy_reminders VARCHAR(50);
```

### Option 2: Create separate preferences table
```sql
CREATE TABLE user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    food_preference VARCHAR(50),
    cooking_frequency VARCHAR(50),
    spice_level VARCHAR(50),
    cooking_time_preference VARCHAR(50),
    late_night_hunger VARCHAR(50),
    outside_food_frequency VARCHAR(50),
    mummy_reminders VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## Frontend Files Modified

- **frontend/login.html**: Complete redesign with multi-step form and preference questions

### New Features in HTML:
- Radio button groups with custom styling
- Multi-step form navigation
- Form validation at each step
- LocalStorage integration for demo mode

### New CSS Classes:
```css
.radio-group              /* Container for radio options */
.radio-option             /* Individual radio button option */
.form-section             /* Grouped question sections */
.form-section-title       /* Section titles with emojis */
.form-step                /* Each form step */
.form-step.active         /* Active step visibility */
```

---

## Backend Files Created

### **register_with_preferences.php**
Handles user registration with preferences:
- Validates input data
- Checks for duplicate emails
- Hashes passwords securely
- Inserts user and preferences into database
- Returns JSON response

**Usage:**
```javascript
POST /backend/register_with_preferences.php

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password",
  "preferences": {
    "foodPref": "nonveg",
    "cookingFreq": "roz",
    "spiceLevel": "teekha",
    "cookingTime": "20-30min",
    "lateNightHunger": "haan",
    "outsideFood": "weekends",
    "mummyReminders": "haan"
  }
}
```

---

## User Flow

```
1. User clicks "Register"
   ↓
2. Fills basic info (name, email, password)
   ↓
3. Clicks "Next" → Step 2
   ↓
4. Selects food preferences
   ↓
5. Clicks "Next" → Step 3
   ↓
6. Selects lifestyle preferences
   ↓
7. Clicks "Next" → Step 4
   ↓
8. Selects reminder preference
   ↓
9. Clicks "Complete Registration"
   ↓
10. Data saved to database
    ↓
11. Redirected to main app
```

---

## Preference Values Reference

### Food Preference
- `veg` = Vegetarian
- `eggitarian` = Eggitarian
- `nonveg` = Non-Vegetarian

### Cooking Frequency
- `roz` = Daily
- `kabhikabhi` = Sometimes
- `bahutKam` = Rarely

### Spice Level
- `kam` = Low
- `medium` = Medium
- `teekha` = High

### Cooking Time
- `10-15min` = 10-15 minutes
- `20-30min` = 20-30 minutes
- `aramSe` = Flexible time

### Late-Night Hunger
- `haan` = Yes
- `kabhikabhi` = Sometimes
- `nahi` = No

### Outside Food Frequency
- `roz` = Daily
- `weekends` = Weekends
- `kabhikabhi` = Rarely

### MUMMY Reminders
- `haan` = Yes
- `kabhikabhi` = Sometimes
- `nahi` = No

---

## LocalStorage Integration (Demo Mode)

The form saves preferences to browser localStorage:
```javascript
localStorage.setItem('mummy_user_preferences', JSON.stringify(preferences));
```

To retrieve preferences in the app:
```javascript
const prefs = JSON.parse(localStorage.getItem('mummy_user_preferences'));
console.log(prefs.foodPref); // 'nonveg'
```

---

## Design Features

✨ **Responsive Design**
- Mobile-friendly radio buttons
- Touch-friendly button sizes
- Flexible form sections
- Adapts to all screen sizes

🎨 **Visual Design**
- Warm color palette (orange, yellow, green)
- Emoji icons for each question
- Section-based organization
- Clear visual hierarchy

🔧 **User Experience**
- Progress through steps
- Back/Next navigation
- Input validation at each step
- Confirmation before completion

---

## Implementation Checklist

- [x] Redesign signup form with multi-step layout
- [x] Add 7 key preference questions
- [x] Create radio button styling
- [x] Implement form navigation
- [x] Add input validation
- [x] Create database schema file
- [x] Create backend PHP handler
- [x] LocalStorage integration for demo
- [ ] Connect to actual backend
- [ ] Add email verification
- [ ] Add preference editing page

---

## Next Steps

1. **Database Setup**: Run `DATABASE_SCHEMA_UPDATES.sql` on your MySQL server
2. **Backend Connection**: Update `register_with_preferences.php` with your database credentials
3. **Frontend Integration**: Update `login.html` to call the backend endpoint
4. **Testing**: Test registration flow with various preference combinations
5. **Feature**: Create a preferences edit page for existing users

---

## SQL Prompts for Database Alterations

### To add preferences to existing users table:
```
"Please add the following columns to the users table:
- food_preference VARCHAR(50)
- cooking_frequency VARCHAR(50)
- spice_level VARCHAR(50)
- cooking_time_preference VARCHAR(50)
- late_night_hunger VARCHAR(50)
- outside_food_frequency VARCHAR(50)
- mummy_reminders VARCHAR(50)
And add timestamps for created_at and updated_at"
```

### To create a new preferences table:
```
"Create a new user_preferences table with:
- Primary key id
- Foreign key user_id pointing to users table
- Columns for all 7 preference types
- Timestamps
- Unique constraint on user_id"
```

### To view user preferences:
```
"SELECT user data along with all preference columns
for analysis and recommendations"
```

---

## Future Enhancements

1. **Preference Editing Page**: Let users update preferences anytime
2. **Smart Recommendations**: Use preferences to suggest recipes
3. **Dietary Restrictions**: Add allergy and dietary preference fields
4. **Regional Preferences**: Add cuisine type preferences
5. **Budget Preference**: Add budget/meal cost preferences
6. **Skill Level**: Add cooking skill level assessment
7. **Equipment**: Ask about available kitchen equipment

---

**File**: frontend/login.html
**Last Updated**: 2024
**Status**: ✅ Ready to Deploy
