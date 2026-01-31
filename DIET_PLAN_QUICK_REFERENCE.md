# Quick Reference: Diet Plan Feature

## 🎯 Feature Summary
A complete diet plan management system with 6 pre-configured plans, real-time calorie tracking, and automated validation.

## 📋 The 6 Diet Plans

| Plan | Emoji | Daily Range | Best For |
|------|-------|-------------|----------|
| Healthy & Balanced | 💚 | 2000-2500 | General health |
| Diabetic-Friendly | 🩺 | 1800-2000 | Blood sugar control |
| Low Sodium | ❤️ | 1800-2200 | Heart health |
| Weight Loss | 🏃 | 1500-1800 | Weight reduction |
| Low Cholesterol | ⚡ | 1800-2200 | Cholesterol management |
| Fitness & Muscle | 💪 | 2500-3500 | Muscle building |

## 🚀 How It Works

### Step 1: Open Diet Plan Selector
- Click **"Select a Diet Plan"** button in the navbar (🥗)

### Step 2: Choose Your Plan
- View all 6 diet plans with descriptions
- Click on your preferred plan
- See it highlight with a checkmark

### Step 3: Confirm or Skip
- Click **"Confirm Selection"** to save your plan
- Click **"Skip"** to proceed without a plan

### Step 4: Select Ingredients
- The app now validates each ingredient against your daily limit
- See calorie count next to each ingredient in the basket
- View remaining calories in the progress bar
- Get alerts if you're about to exceed your limit

### Step 5: Track Progress
- Basket shows total calories used
- Progress bar fills as you add ingredients
- Visual indicators show status (green = good, red = exceeded)

## 💾 Data Storage

### Browser LocalStorage
```
selectedDietPlanId: "healthy_balanced"
selectedDietPlan: { full plan object }
```

### Session Variables
```
selectedDietPlanId          // Current plan
selectedDietPlan            // Plan details
totalDailyCalories          // Running total
mealsCalorieTracker         // Per-meal breakdown
```

## 🔧 Technical Implementation

### Files Created
```
frontend/diet-plans.js           (8.7 KB)
frontend/diet-plan-selector.js   (10.8 KB)
```

### Files Modified
```
frontend/index.html     - Added modal HTML and script refs
frontend/styles.css     - Added modal styling (200+ lines)
frontend/app.js         - Integrated calorie validation
```

### Key Functions

#### Diet Plans Module
```javascript
getDietPlan(planId)              // Get plan details
getAllDietPlans()                // Get all 6 plans
checkDailyCalorieLimit(id, cal)  // Validate daily total
getRemainingCaloriesForMeal()    // Get meal limit status
formatCalories(calories)         // Format for display
```

#### Diet Plan Selector Module
```javascript
initializeDietPlanSelector()      // Setup on page load
openDietPlanModal()               // Show modal
selectDietPlan(id, plan)          // Select a plan
confirmDietPlanSelection()        // Save selection
canAddIngredient(cal)             // Validate before add
addIngredientCalories(cal)        // Update tracker
removeIngredientCalories(cal)     // Update tracker
getDietPlanStatus()               // Get current status
```

#### App Integration
```javascript
// In toggleIngredientCard():
- Check if diet plan active
- Call canAddIngredient() before adding
- Call addIngredientCalories() to track
- Call removeIngredientCalories() when removing

// In updateBasket():
- Show calorie count per ingredient
- Display total calories used
- Show progress bar
- Display remaining calories
```

## 🎨 UI Elements

### Diet Plan Modal
- 900px max-width, 85vh max-height
- Responsive grid (auto-fit, 280px min)
- Smooth animations and transitions
- Gradient backgrounds and shadows

### Diet Plan Cards
- 280px wide (responsive)
- Hover elevation effect (+4px transform)
- Selected state with border highlight
- Animated checkmark on selection
- Calorie range display
- Meal examples list

### Basket Status Bar
- Shows current diet plan name
- Displays calories used / max
- Shows percentage used
- Progress bar with color coding
- Remaining calories or exceeded amount

## 📱 Responsive Design

### Desktop (768px+)
- 3-column grid for diet plans
- Full modal width
- Detailed descriptions

### Tablet (481px-768px)
- 2-column grid for diet plans
- Slightly smaller padding
- Same functionality

### Mobile (480px and below)
- 1-column grid for diet plans
- Compact modal (95vw)
- Smaller font sizes
- Touch-friendly buttons

## ⚡ Performance

- **Initial Load**: All plans loaded in JS (no server calls)
- **Calorie Check**: Instant validation, no API delays
- **Storage**: LocalStorage keeps selection persistent
- **Memory**: ~20KB total JS added
- **Animations**: GPU-accelerated transforms

## 🔒 Data Safety

- No personal data stored
- Calorie data calculated locally
- No server transmission
- Clear functionality to reset
- localStorage.removeItem() to clear

## 🐛 Error Handling

### Validation
- Checks if ingredient calories exceed limit
- Alerts user before adding problematic ingredient
- Prevents invalid selections

### Edge Cases
- Handles missing calorie data gracefully
- Works without diet plan selected
- Supports adding/removing ingredients
- Persists through page reloads

## 🔄 Integration Points

### With Notification System
- Could add meal reminders (coming soon)
- Track daily compliance notifications

### With Health Status
- Diabetic mode + Diabetic plan
- Could auto-select related diet plan

### With Packing List
- Could estimate grocery quantities based on diet plan

### With Recipe Generator
- Could prioritize recipes matching diet plan
- Filter recipes by calorie range

## 📊 Metrics Tracked

Per ingredient:
- Calorie value (from calories.js)
- Contribution to daily total
- Meal category (future enhancement)

Per day:
- Total calories consumed
- Percentage of daily limit used
- Remaining calories available
- Status (below/perfect/exceeded)

Per meal (future):
- Calories per meal type
- Meal-specific limits
- Meal compliance status

## 🚀 Future Enhancements Ready

1. **Macro Tracking**: Proteins, carbs, fats
2. **Meal Planning**: Schedule meals throughout day
3. **Shopping List**: Generate groceries by diet plan
4. **Recipe Filtering**: Show recipes matching diet plan
5. **Progress Charts**: Weekly/monthly trends
6. **Custom Plans**: User-created diet plans
7. **Family Profiles**: Multiple diet plans per household
8. **Notifications**: Meal reminders and alerts
9. **Export**: Download meal plans and shopping lists
10. **Social**: Share diet plans with friends

---

**Status**: ✅ Complete and Deployed

Access at: `http://localhost/mummy/`

Last Updated: 31-01-2026
