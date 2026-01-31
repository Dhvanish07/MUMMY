 /**
 * Calorie Database for MUMMY
 * All values in kcal per 100g (standard, exam-friendly basis)
 * Used for intelligent food suggestion and nutritional comparison
 */

const CALORIES_DATABASE = {
    // 🥬 VEGETABLES
    "Onion": 40,
    "Tomato": 18,
    "Potato": 77,
    "Ginger": 80,
    "Garlic": 149,
    "Green Chilli": 40,
    "Capsicum": 20,
    "Carrot": 41,
    "Beetroot": 43,
    "Radish": 16,
    "Brinjal": 25,
    "Eggplant": 25,
    "Cucumber": 15,
    "Pumpkin": 26,
    "Bottle Gourd": 14,
    "Lauki": 14,
    "Ridge Gourd": 15,
    "Turai": 15,
    "Bitter Gourd": 17,
    "Karela": 17,
    "Snake Gourd": 18,

    // 🥬 LEAFY VEGETABLES
    "Spinach": 23,
    "Palak": 23,
    "Fenugreek Leaves": 49,
    "Methi": 49,
    "Coriander Leaves": 23,
    "Mint Leaves": 44,
    "Curry Leaves": 108,
    "Dill Leaves": 43,
    "Shepu": 43,

    // 🌽 EXOTIC VEGETABLES
    "Broccoli": 34,
    "Zucchini": 17,
    "Lettuce": 15,
    "Bell Pepper": 31,
    "Mushroom": 22,
    "Baby Corn": 26,
    "Cherry Tomato": 18,

    // 🍗 MEAT & PROTEIN
    "Chicken": 239,
    "Mutton": 294,
    "Fish": 206,
    "Prawns": 99,
    "Shrimp": 99,

    // 🥚 PROTEIN & ALTERNATIVES
    "Eggs": 155,
    "Paneer": 265,
    "Tofu": 76,
    "Soya Chunks": 345,

    // 🌾 GRAINS
    "Rice": 130,
    "Wheat Flour": 364,
    "Atta": 364,
    "Maida": 364,
    "Rava": 360,
    "Sooji": 360,
    "Oats": 389,

    // 🫘 PULSES & LENTILS
    "Toor Dal": 343,
    "Moong Dal": 347,
    "Masoor Dal": 352,
    "Chana Dal": 364,
    "Rajma": 333,
    "Chickpeas": 364,
    "Chole": 364,

    // 🌶️ WHOLE SPICES
    "Cumin Seeds": 375,
    "Jeera": 375,
    "Mustard Seeds": 508,
    "Rai": 508,
    "Coriander Seeds": 298,
    "Cloves": 274,
    "Cinnamon": 247,
    "Bay Leaf": 313,

    // 🌶️ POWDERED SPICES
    "Turmeric Powder": 312,
    "Red Chilli Powder": 282,
    "Coriander Powder": 298,
    "Garam Masala": 350,
    "Black Pepper": 251,

    // 🧂 SEASONINGS
    "Salt": 0,
    "Sugar": 387,
    "Jaggery": 383,

    // 🥛 DAIRY
    "Milk": 42,
    "Curd": 59,
    "Yogurt": 59,
    "Butter": 717,
    "Ghee": 900,
    "Cheese": 402,
    "Cream": 340,

    // 🍚 COOKED ITEMS (Approximate)
    "Cooked Rice": 130,
    "Boiled Potatoes": 87,
    "Leftover Dal": 120,
    "Leftover Sabzi": 80,
    "Chapati": 297,
};

/**
 * Get calorie value for an ingredient
 * @param {string} ingredientName - Name of the ingredient
 * @returns {number} Calorie value in kcal per 100g
 */
function getCalories(ingredientName) {
    if (!ingredientName) return 0;
    
    // Try exact match first
    if (CALORIES_DATABASE[ingredientName]) {
        return CALORIES_DATABASE[ingredientName];
    }
    
    // Try case-insensitive match
    const key = Object.keys(CALORIES_DATABASE).find(
        k => k.toLowerCase() === ingredientName.toLowerCase()
    );
    
    return key ? CALORIES_DATABASE[key] : 0;
}

/**
 * Calculate total calories for ingredients
 * @param {Array} ingredients - Array of ingredient objects with 'name' property
 * @returns {number} Total calories
 */
function calculateTotalCalories(ingredients) {
    if (!ingredients || !Array.isArray(ingredients)) return 0;
    
    return ingredients.reduce((total, ingredient) => {
        const calories = getCalories(ingredient.name || ingredient);
        return total + calories;
    }, 0);
}

/**
 * Get calorie summary for display
 * @param {Array} ingredients - Array of ingredients
 * @returns {Object} Summary with total and per-ingredient breakdown
 */
function getCalorieSummary(ingredients) {
    if (!ingredients || !Array.isArray(ingredients)) {
        return { total: 0, breakdown: [] };
    }
    
    const breakdown = ingredients.map(ingredient => ({
        name: ingredient.name || ingredient,
        calories: getCalories(ingredient.name || ingredient)
    }));
    
    const total = breakdown.reduce((sum, item) => sum + item.calories, 0);
    
    return {
        total: Math.round(total),
        breakdown: breakdown,
        average: breakdown.length > 0 ? Math.round(total / breakdown.length) : 0
    };
}
