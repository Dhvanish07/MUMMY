// Diet Plans Configuration with Meal Times & Calorie Breakdowns

const DIET_PLANS = {
    healthy_balanced: {
        name: '💚 Healthy & Balanced Diet',
        emoji: '💚',
        dailyCalories: { min: 2000, max: 2500 },
        mealBreakdown: {
            earlyMorning: { name: '🌅 Early Morning', time: '6:00 – 7:00 AM', min: 100, max: 125 },
            breakfast: { name: '🍳 Breakfast', time: '8:00 – 9:00 AM', min: 500, max: 625 },
            midMorning: { name: '☕ Mid-Morning', time: '10:30 – 11:30 AM', min: 200, max: 250 },
            lunch: { name: '🍛 Lunch', time: '1:00 – 2:00 PM', min: 600, max: 750 },
            eveningSnack: { name: '🍵 Evening Snack', time: '4:30 – 5:30 PM', min: 200, max: 250 },
            dinner: { name: '🌙 Dinner', time: '7:30 – 8:30 PM', min: 400, max: 500 }
        }
    },
    diabetic_friendly: {
        name: '🩺 Diabetic-Friendly Diet',
        emoji: '🩺',
        dailyCalories: { min: 1800, max: 2000 },
        mealBreakdown: {
            earlyMorning: { name: '🌅 Early Morning', time: '6:00 – 6:30 AM', min: 90, max: 100 },
            breakfast: { name: '🍳 Breakfast', time: '7:30 – 8:30 AM', min: 450, max: 500 },
            midMorning: { name: '☕ Mid-Morning', time: '10:00 – 11:00 AM', min: 180, max: 200 },
            lunch: { name: '🍛 Lunch', time: '12:30 – 1:30 PM', min: 540, max: 600 },
            eveningSnack: { name: '🍵 Evening Snack', time: '4:00 – 5:00 PM', min: 180, max: 200 },
            dinner: { name: '🌙 Dinner', time: '7:00 – 8:00 PM', min: 360, max: 400 }
        }
    },
    low_sodium: {
        name: '❤️ Low Sodium Diet (Hypertension)',
        emoji: '❤️',
        dailyCalories: { min: 1800, max: 2200 },
        mealBreakdown: {
            earlyMorning: { name: '🌅 Early Morning', time: '6:00 – 6:30 AM', min: 90, max: 110 },
            breakfast: { name: '🍳 Breakfast', time: '8:00 – 9:00 AM', min: 450, max: 550 },
            midMorning: { name: '☕ Mid-Morning', time: '10:30 – 11:30 AM', min: 180, max: 220 },
            lunch: { name: '🍛 Lunch', time: '1:00 – 2:00 PM', min: 540, max: 660 },
            eveningSnack: { name: '🍵 Evening Snack', time: '4:30 – 5:30 PM', min: 180, max: 220 },
            dinner: { name: '🌙 Dinner', time: '7:30 – 8:30 PM', min: 360, max: 440 }
        }
    },
    weight_loss: {
        name: '🏃 Weight Loss Diet',
        emoji: '🏃',
        dailyCalories: { min: 1500, max: 1800 },
        mealBreakdown: {
            earlyMorning: { name: '🌅 Early Morning', time: '6:00 – 6:30 AM', min: 75, max: 90 },
            breakfast: { name: '🍳 Breakfast', time: '7:30 – 8:30 AM', min: 450, max: 540 },
            midMorning: { name: '☕ Mid-Morning', time: '10:00 – 11:00 AM', min: 150, max: 180 },
            lunch: { name: '🍛 Lunch', time: '12:30 – 1:30 PM', min: 450, max: 540 },
            eveningSnack: { name: '🍵 Evening Snack', time: '4:00 – 5:00 PM', min: 150, max: 180 },
            dinner: { name: '🌙 Dinner', time: '7:00 – 8:00 PM', min: 225, max: 270 }
        }
    },
    low_cholesterol: {
        name: '⚡ Low Cholesterol Diet',
        emoji: '⚡',
        dailyCalories: { min: 1800, max: 2200 },
        mealBreakdown: {
            earlyMorning: { name: '🌅 Early Morning', time: '6:00 – 6:30 AM', min: 90, max: 110 },
            breakfast: { name: '🍳 Breakfast', time: '7:30 – 8:30 AM', min: 540, max: 660 },
            midMorning: { name: '☕ Mid-Morning', time: '10:00 – 11:00 AM', min: 180, max: 220 },
            lunch: { name: '🍛 Lunch', time: '1:00 – 2:00 PM', min: 540, max: 660 },
            eveningSnack: { name: '🍵 Evening Snack', time: '4:30 – 5:30 PM', min: 180, max: 220 },
            dinner: { name: '🌙 Dinner', time: '7:00 – 8:00 PM', min: 270, max: 330 }
        }
    },
    fitness_muscle: {
        name: '💪 Fitness & Muscle Building Diet',
        emoji: '💪',
        dailyCalories: { min: 2500, max: 3500 },
        mealBreakdown: {
            earlyMorning: { name: '🌅 Early Morning', time: '5:30 – 6:30 AM', min: 125, max: 175 },
            breakfast: { name: '🍳 Breakfast', time: '7:00 – 8:30 AM', min: 875, max: 1225 },
            midMorning: { name: '☕ Mid-Morning', time: '10:00 – 11:00 AM', min: 250, max: 350 },
            lunch: { name: '🍛 Lunch', time: '1:00 – 2:30 PM', min: 625, max: 875 },
            eveningSnack: { name: '🍵 Evening Snack', time: '4:30 – 5:30 PM', min: 250, max: 350 },
            dinner: { name: '🌙 Dinner', time: '7:30 – 8:30 PM', min: 375, max: 525 }
        }
    }
};

/**
 * ✅ Export all diet plans - REQUIRED for diet-plan-selector.js
 */
function getAllDietPlans() {
    return DIET_PLANS;
}

// Get current meal based on system time
function getCurrentMeal() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeInMinutes = hour * 60 + minute;
    
    const mealTimeRanges = {
        earlyMorning: { start: 6 * 60, end: 7 * 60, name: 'Early Morning' },
        breakfast: { start: 8 * 60, end: 9 * 60, name: 'Breakfast' },
        midMorning: { start: 10.5 * 60, end: 11.5 * 60, name: 'Mid-Morning' },
        lunch: { start: 13 * 60, end: 14 * 60, name: 'Lunch' },
        eveningSnack: { start: 16.5 * 60, end: 17.5 * 60, name: 'Evening Snack' },
        dinner: { start: 19.5 * 60, end: 20.5 * 60, name: 'Dinner' }
    };
    
    for (const [key, range] of Object.entries(mealTimeRanges)) {
        if (timeInMinutes >= range.start && timeInMinutes < range.end) {
            return key;
        }
    }
    
    // If not in any meal time, return the next upcoming meal
    if (timeInMinutes < 6 * 60) return 'earlyMorning';
    if (timeInMinutes < 8 * 60) return 'breakfast';
    if (timeInMinutes < 10.5 * 60) return 'midMorning';
    if (timeInMinutes < 13 * 60) return 'lunch';
    if (timeInMinutes < 16.5 * 60) return 'eveningSnack';
    if (timeInMinutes < 19.5 * 60) return 'dinner';
    return 'earlyMorning'; // Next day
}

// Get current meal limit
function getCurrentMealLimit(planKey) {
    if (!planKey || !DIET_PLANS[planKey]) return null;
    const plan = DIET_PLANS[planKey];
    const currentMeal = getCurrentMeal();
    return {
        meal: currentMeal,
        mealData: plan.mealBreakdown[currentMeal],
        planName: plan.name
    };
}
