/* ========================================
   MUMMY – BHOOK LAGI HAI
   Core Application Logic
   ======================================== */

// Configuration
const CONFIG = {
    GEMINI_API_KEY: 'AIzaSyBbTuAMZwf1Ob8BepS5BAgCdZXEei6RxLQ',
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    STORAGE_KEY_INGREDIENTS: 'mummy_selected_ingredients',
    STORAGE_KEY_HEALTH: 'mummy_health_status',
    STORAGE_KEY_USER: 'mummy_user_logged_in',
    STORAGE_KEY_LANGUAGE: 'mummy_language',
    STORAGE_KEY_REGION: 'mummy_region',
};

// ========================================
// LANGUAGE & TRANSLATIONS
// ========================================

const LANGUAGES = {
    english: 'English',
    hinglish: 'Hinglish (Hindi-English)',
    hindi: 'हिंदी (Hindi)'
};

const TRANSLATIONS = {
    english: {
        appTitle: '🍲 MUMMY',
        appSubtitle: 'Bhook Lagi Hai?',
        motherGreeting: "What shall I cook today, beta?",
        selectIngredients: "What do we have at home?",
        selectedCount: "Selected",
        selectSomething: "Select some ingredients...",
        mood: "How's your health?",
        moodNormal: "Normal",
        moodFever: "Fever",
        moodCold: "Cold & Cough",
        moodTired: "Tired & Low Energy",
        moodDigestion: "Digestion Issues",
        moodAllergy: "Food Allergy",
        moodDiabetic: "Diabetic",
        moodVegan: "Vegan",
        region: "Your Region",
        regionNorth: "North India",
        regionSouth: "South India",
        regionEast: "East India",
        regionWest: "West India",
        regionNorthEast: "North-East India",
        generate: "What shall I cook, Mummy?",
        logout: "Logout",
        recipes: "Today's recipes, beta!",
        ingredients: "Ingredients",
        instructions: "Instructions",
        mothersTips: "Mummy's Tips",
        language: "Language",
        done: "Done"
    },
    hinglish: {
        appTitle: '🍲 MUMMY',
        appSubtitle: 'Bhook Lagi Hai?',
        motherGreeting: "Aaj khane mein kya banau beta?",
        selectIngredients: "Ghar mein kya-kya hai?",
        selectedCount: "Select kiye",
        selectSomething: "Kuch ingredients select kar...",
        mood: "Tabiyat kaisa hai?",
        moodNormal: "Normal",
        moodFever: "Bukhar",
        moodCold: "Sardi Khansi",
        moodTired: "Thakan",
        moodDigestion: "Paach ki problem",
        moodAllergy: "Allergy",
        moodDiabetic: "Diabetic",
        moodVegan: "Vegan",
        region: "Apka region",
        regionNorth: "Uttar Bharat",
        regionSouth: "Dakshan Bharat",
        regionEast: "Purv Bharat",
        regionWest: "Paschim Bharat",
        regionNorthEast: "Uttar-Purv Bharat",
        generate: "Aaj kya banau, Mummy?",
        logout: "Logout",
        recipes: "Dekho beta, ye recipes hain!",
        ingredients: "Ingredients",
        instructions: "Tarika",
        mothersTips: "Mummy ke Tips",
        language: "Bhasha",
        done: "Theek hai"
    },
    hindi: {
        appTitle: '🍲 MUMMY',
        appSubtitle: 'भूख लगी है?',
        motherGreeting: "आज खाने में क्या बनाऊ बेटा?",
        selectIngredients: "घर में क्या-क्या है?",
        selectedCount: "चुने गए",
        selectSomething: "कुछ सामग्री चुनें...",
        mood: "तबियत कैसी है?",
        moodNormal: "सामान्य",
        moodFever: "बुखार",
        moodCold: "सर्दी खांसी",
        moodTired: "थकान",
        moodDigestion: "पाचन समस्या",
        moodAllergy: "एलर्जी",
        moodDiabetic: "डायबिटीज",
        moodVegan: "वेगन",
        region: "आपका क्षेत्र",
        regionNorth: "उत्तर भारत",
        regionSouth: "दक्षिण भारत",
        regionEast: "पूर्व भारत",
        regionWest: "पश्चिम भारत",
        regionNorthEast: "उत्तर-पूर्व भारत",
        generate: "आज क्या बनाऊ मम्मी?",
        logout: "Logout",
        recipes: "देखो बेटा, ये रेसिपीज हैं!",
        ingredients: "सामग्री",
        instructions: "तरीका",
        mothersTips: "माँ की सलाह",
        language: "भाषा",
        done: "ठीक है"
    }
};

// Region-specific recipe modifications
const REGION_PREFERENCES = {
    'north': {
        name: 'North India',
        spices: ['Cumin', 'Fenugreek', 'Asafoetida'],
        cookingStyle: 'Tandoori, slow-cooked, butter-based',
        dishModifications: {
            curry: 'Use tandoori spices and cream',
            bread: 'Roti, Naan, Parantha preferred',
            rice: 'Biryani, Pulao style'
        }
    },
    'south': {
        name: 'South India',
        spices: ['Coconut', 'Tamarind', 'Mustard Seeds'],
        cookingStyle: 'Coconut-based, tempering, rice-centric',
        dishModifications: {
            curry: 'Use coconut milk and tamarind',
            bread: 'Dosa, Idli preferred',
            rice: 'Sambhar, Rasam with rice'
        }
    },
    'east': {
        name: 'East India',
        spices: ['Mustard Oil', 'Nigella Seeds', 'Fennel'],
        cookingStyle: 'Mustard oil-based, light spices',
        dishModifications: {
            curry: 'Use mustard oil and light spices',
            bread: 'Luchi, Puri preferred',
            rice: 'Lapped rice with vegetables'
        }
    },
    'west': {
        name: 'West India',
        spices: ['Peanut', 'Sesame', 'Chilli'],
        cookingStyle: 'Peanut-based, spicy, groundnut oil',
        dishModifications: {
            curry: 'Use peanut paste and groundnut oil',
            bread: 'Bhakri, Roti preferred',
            rice: 'Dhal-bhaat style'
        }
    },
    'northeast': {
        name: 'North-East India',
        spices: ['Ginger', 'Garlic', 'Green Chilli'],
        cookingStyle: 'Fresh herbs, bamboo shoots, fermented',
        dishModifications: {
            curry: 'Use fresh herbs and bamboo shoots',
            bread: 'Rice cakes, sticky rice',
            rice: 'Rice with fermented items'
        }
    }
};

// Health & Dietary Context
const HEALTH_CONTEXT = {
    'healthy': {
        label: 'Normal/Healthy',
        description: 'Normal healthy appetite, no specific health restrictions',
        suggestions: 'Suggest balanced, wholesome recipes with all nutrients'
    },
    'fever': {
        label: 'Fever/Weak',
        description: 'Light, easily digestible recipes',
        suggestions: 'Suggest light, warm foods that are easy to digest. Include khichdi, light broths, and easily absorbable foods'
    },
    'cold': {
        label: 'Cold/Congestion',
        description: 'Warm foods with immune-boosting properties',
        suggestions: 'Suggest warm dishes with ginger, garlic, turmeric, and warming spices. Include soups and broths'
    },
    'tired': {
        label: 'Tired/Energizing',
        description: 'Energy-boosting recipes with protein and carbs',
        suggestions: 'Suggest nutrient-rich recipes with good protein, complex carbs, and healthy fats for sustained energy'
    },
    'digestion': {
        label: 'Digestion Issues',
        description: 'Easy to digest, light recipes with digestive spices',
        suggestions: 'Suggest easily digestible foods. Use ginger, fennel, cumin, and avoid heavy oils. Include light curries and soups'
    },
    'allergy': {
        label: 'Food Allergy/Sensitivity',
        description: 'Hypoallergenic recipes with common allergen awareness',
        suggestions: 'Suggest recipes avoiding common allergens like shellfish, nuts, and heavy dairy. Use mild spices and fresh ingredients'
    },
    'diabetic': {
        label: 'Diabetic/Blood Sugar',
        description: 'Low glycemic, balanced sugar recipes',
        suggestions: 'Suggest low glycemic index foods, high fiber recipes. Use minimal sugar and whole grains. Include protein-rich options'
    },
    'vegan': {
        label: 'Vegan/Plant-based',
        description: 'Completely plant-based, no animal products',
        suggestions: 'Suggest plant-based recipes. No meat, fish, eggs, or dairy. Focus on legumes, vegetables, and plant proteins like tofu'
    }
};

// ========================================
// NEW INGREDIENT DATABASE - CATEGORIZED
// ========================================

const INGREDIENTS_DB = {
    // VEGETABLES
    vegetables: {
        icon: '🥬',
        main: 'Vegetables',
        subcategories: {
            'Fresh Vegetables': [
                'Onion', 'Tomato', 'Potato', 'Ginger', 'Garlic', 'Green Chilli',
                'Capsicum', 'Carrot', 'Beetroot', 'Radish', 'Brinjal', 'Cucumber',
                'Pumpkin', 'Bottle Gourd', 'Ridge Gourd', 'Bitter Gourd', 'Snake Gourd'
            ],
            'Leafy Vegetables': [
                'Spinach', 'Fenugreek Leaves', 'Coriander Leaves', 'Mint Leaves',
                'Curry Leaves', 'Dill Leaves'
            ],
            'Exotic Vegetables': [
                'Broccoli', 'Zucchini', 'Lettuce', 'Red/Yellow Bell Pepper',
                'Mushroom', 'Baby Corn', 'Cherry Tomato'
            ]
        }
    },

    // MEAT & PROTEIN
    meat: {
        icon: '🍖',
        main: 'Meat & Protein',
        subcategories: {
            'Meat': ['Chicken', 'Mutton', 'Fish', 'Prawns'],
            'Protein & Alternatives': ['Eggs', 'Paneer', 'Tofu', 'Soya Chunks']
        }
    },

    // GRAINS & CEREALS
    grains: {
        icon: '🌾',
        main: 'Grains & Cereals',
        subcategories: {
            'Grains': ['Rice', 'Wheat Flour', 'Maida', 'Rava', 'Oats'],
            'Pulses & Lentils': ['Toor Dal', 'Moong Dal', 'Masoor Dal', 'Chana Dal', 'Rajma', 'Chickpeas']
        }
    },

    // SPICES & SEASONINGS
    spices: {
        icon: '🌶️',
        main: 'Spices & Seasonings',
        subcategories: {
            'Whole Spices': ['Cumin Seeds', 'Mustard Seeds', 'Coriander Seeds', 'Cloves', 'Cinnamon', 'Bay Leaf'],
            'Powdered Spices': ['Turmeric Powder', 'Red Chilli Powder', 'Coriander Powder', 'Garam Masala', 'Black Pepper'],
            'Seasonings': ['Salt', 'Sugar', 'Jaggery']
        }
    },

    // DAIRY & RELATED
    dairy: {
        icon: '🥛',
        main: 'Dairy & Related',
        subcategories: {
            'Dairy': ['Milk', 'Curd', 'Butter', 'Ghee', 'Cheese', 'Cream']
        }
    },

    // LEFTOVERS / COOKED ITEMS
    leftovers: {
        icon: '🍛',
        main: 'Leftovers & Cooked',
        subcategories: {
            'Leftovers': ['Cooked Rice', 'Boiled Potatoes', 'Leftover Dal', 'Leftover Sabzi', 'Chapati']
        }
    }
};

// Flattened ingredient list for easier access
const ALL_INGREDIENTS = (() => {
    const list = [];
    Object.values(INGREDIENTS_DB).forEach(category => {
        Object.values(category.subcategories).forEach(subcategory => {
            subcategory.forEach(ingredient => {
                list.push({
                    name: ingredient,
                    category: ingredient.toLowerCase().replace(/\s+/g, '_'),
                    emoji: '🥬' // Default emoji, can be customized
                });
            });
        });
    });
    return list;
})();

// Category Data with Item Names - Direct mapping to image files
const imageMapping = {
    // Vegetables - Fresh
    "Onion": "onion.png",
    "Tomato": "tomato.png",
    "Potato": "potato.png",
    "Ginger": "ginger.png",
    "Garlic": "garlic.png",
    "Green Chilli": "green chilli.png",
    "Capsicum": "capsicum.png",
    "Carrot": "carrot.png",
    "Beetroot": "beetroot.png",
    "Radish": "raddish.png",
    "Brinjal": "Brinjal (Eggplant).png",
    "Cucumber": "cucumber.png",
    "Pumpkin": "pumpkin.png",
    "Bottle Gourd": "Bottle Gourd (Lauki).png",
    "Ridge Gourd": "Ridge Gourd (Turai).png",
    "Bitter Gourd": "Bitter Gourd (Karela).png",
    "Snake Gourd": "Bottle Gourd (Lauki).png",
    
    // Vegetables - Leafy
    "Spinach": "Spinach (Palak).png",
    "Fenugreek Leaves": "Fenugreek Leaves (Methi).png",
    "Coriander Leaves": "Coriander Leaves.png",
    "Mint Leaves": "Mint Leaves.png",
    "Curry Leaves": "Curry Leaves.png",
    "Dill Leaves": "Dill Leaves (Shepu).png",
    
    // Vegetables - Exotic
    "Broccoli": "Broccoli.png",
    "Zucchini": "Zucchini.png",
    "Lettuce": "Lettuce.png",
    "Red/Yellow Bell Pepper": "Bell Peppers.png",
    "Mushroom": "Mushroom.png",
    "Baby Corn": "Baby Corn.png",
    "Cherry Tomato": "Cherry Tomato.png",
    
    // Meat
    "Chicken": "chicken.png",
    "Mutton": "Mutton.png",
    "Fish": "fish.png",
    "Prawns": "prawns.png",
    
    // Protein & Alternatives
    "Eggs": "eggs.png",
    "Paneer": "panner.png",
    "Tofu": "tofu.png",
    "Soya Chunks": "soya chunks.png",
    
    // Grains
    "Rice": "rice.png",
    "Wheat Flour": "Wheat Flour (Atta).png",
    "Maida": "maida.png",
    "Rava": "Rava (Sooji).png",
    "Oats": "oats.png",
    
    // Pulses & Lentils
    "Toor Dal": "Toor Dal.png",
    "Moong Dal": "Moong Dal.png",
    "Masoor Dal": "Masoor Dal.png",
    "Chana Dal": "Chana Dal.png",
    "Rajma": "Rajma.png",
    "Chickpeas": "Chickpeas (Chole).png",
    
    // Spices - Whole
    "Cumin Seeds": "Jeera.png",
    "Mustard Seeds": "mustard.png",
    "Coriander Seeds": "corriender.png",
    "Cloves": "Cloves.png",
    "Cinnamon": "cinnamon.png",
    "Bay Leaf": "bay leaf.png",
    
    // Spices - Powdered
    "Turmeric Powder": "turmaric powder.png",
    "Red Chilli Powder": "Chilli powder.png",
    "Coriander Powder": "coriander powder.png",
    "Garam Masala": "Garam masala powder.jpg",
    "Black Pepper": "black pepper.jpg",
    
    // Seasonings
    "Salt": "salt.jpg",
    "Sugar": "sugar.jpg",
    "Jaggery": "jaggery.jpg",
    
    // Dairy
    "Milk": "milk.jpg",
    "Curd": "curd.jpg",
    "Butter": "butter.jpg",
    "Ghee": "ghee.jpg",
    "Cheese": "cheese.jpg",
    "Cream": "cream.jpg",
    
    // Leftovers
    "Cooked Rice": "cooked rice.jpg",
    "Boiled Potatoes": "boiled potato.jpg",
    "Leftover Dal": "left over dal.jpg",
    "Leftover Sabzi": "left over sabzi.jpg",
    "Chapati": "chappati.jpg"
};

// State Management
let appState = {
    selectedIngredients: [],
    selectedHealth: null,
    userName: 'Beta',
    isLoggedIn: false,
    currentCategory: null,
    language: 'english',
    region: 'north',
};

// Helper function to get translated text
function t(key) {
    return TRANSLATIONS[appState.language]?.[key] || TRANSLATIONS.english[key] || key;
}

// DOM Elements
const elements = {
    basketContainer: document.getElementById('basketContainer'),
    basketCount: document.getElementById('basketCount'),
    generateBtn: document.getElementById('generateBtn'),
    recipeModal: document.getElementById('recipeModal'),
    recipeContainer: document.getElementById('recipeContainer'),
    closeModal: document.getElementById('closeModal'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    motherMessage: document.getElementById('motherMessage'),
    userName: document.getElementById('userName'),
    logoutBtn: document.getElementById('logoutBtn'),
};

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initializeIngredientSelector();
    renderIngredients();
    setupEventListeners();
    restoreState();
    initializeNotifications();
    checkUserLogin();
});

function initializeApp() {
    console.log('🍲 MUMMY app initializing...');
}

function checkUserLogin() {
    const loggedIn = localStorage.getItem(CONFIG.STORAGE_KEY_USER);
    if (!loggedIn) {
        redirectToLogin();
    } else {
        appState.userName = localStorage.getItem('mummy_user_name') || 'Beta';
        elements.userName.textContent = appState.userName;
    }
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

// ========================================
// NEW INGREDIENT SELECTOR (TWO-PANEL)
// ========================================

function initializeIngredientSelector() {
    buildCategoryMenu();
    // Select first category by default
    const firstKey = Object.keys(INGREDIENTS_DB)[0];
    selectCategory(firstKey);
}

function buildCategoryMenu() {
    console.log('🔧 Building category menu...');
    const menu = document.getElementById('categoryMenu');
    if (!menu) {
        console.error('❌ Category menu not found!');
        return;
    }

    menu.innerHTML = '';
    let isFirst = true;

    Object.entries(INGREDIENTS_DB).forEach(([key, category]) => {
        const btn = document.createElement('button');
        btn.className = 'category-btn' + (isFirst ? ' active' : '');
        btn.dataset.categoryKey = key;
        btn.onclick = () => selectCategory(key);

        const subcatCount = Object.keys(category.subcategories).length;
        
        btn.innerHTML = `
            <span class="category-icon">${category.icon}</span>
            <span class="category-name">
                <span class="category-name-main">${category.main}</span>
            </span>
            <span class="subcategory-count">${subcatCount} subcats</span>
        `;

        menu.appendChild(btn);
        isFirst = false;
    });
    
    console.log('✅ Category menu built');
}

function selectCategory(categoryKey) {
    console.log('📂 Selecting category:', categoryKey);
    
    const category = INGREDIENTS_DB[categoryKey];
    if (!category) {
        console.error('❌ Category not found:', categoryKey);
        return;
    }

    appState.currentCategory = categoryKey;

    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.categoryKey === categoryKey);
    });

    // Update header
    document.getElementById('currentCategoryTitle').textContent = category.icon + ' ' + category.main;

    // Build subcategory menu
    buildSubcategoryMenu(categoryKey);
}

function buildSubcategoryMenu(categoryKey) {
    const category = INGREDIENTS_DB[categoryKey];
    const subcatContainer = document.getElementById('subcategoryMenu');
    
    if (!subcatContainer) {
        // If no subcategory container, just render all items
        const allItems = [];
        Object.values(category.subcategories).forEach(items => {
            allItems.push(...items);
        });
        renderIngredientGrid(allItems);
        return;
    }

    subcatContainer.innerHTML = '';
    let isFirst = true;

    Object.entries(category.subcategories).forEach(([subcatKey, items]) => {
        const btn = document.createElement('button');
        btn.className = 'subcategory-btn' + (isFirst ? ' active' : '');
        btn.dataset.subcatKey = subcatKey;
        btn.onclick = () => selectSubcategory(categoryKey, subcatKey);
        btn.textContent = `${subcatKey} (${items.length})`;
        
        subcatContainer.appendChild(btn);
        isFirst = false;
    });

    // Auto-select first subcategory
    const firstSubcat = Object.keys(category.subcategories)[0];
    selectSubcategory(categoryKey, firstSubcat);
}

function selectSubcategory(categoryKey, subcatKey) {
    const items = INGREDIENTS_DB[categoryKey].subcategories[subcatKey];
    
    // Update active button
    document.querySelectorAll('.subcategory-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.subcatKey === subcatKey);
    });

    console.log('📋 Rendering', items.length, 'items from', subcatKey);
    renderIngredientGrid(items);
}

// Simple direct mapping of ingredient names to exact image filenames
function renderIngredientGrid(items) {
    const grid = document.getElementById('ingredientGrid');
    if (!grid) return;

    grid.innerHTML = '';
    
    // Update count
    document.getElementById('ingredientCount').textContent = `${items.length} items`;

    items.forEach(itemName => {
        const card = createIngredientCard(itemName);
        grid.appendChild(card);
    });
}

function createIngredientCard(itemName) {
    const card = document.createElement('div');
    card.className = 'ingredient-card';
    card.dataset.ingredient = itemName;

    const isSelected = appState.selectedIngredients.some(i => i.name === itemName);
    if (isSelected) {
        card.classList.add('selected');
    }

    // Get image path for ingredient using imageMapping
    const imageName = imageMapping[itemName] || itemName.toLowerCase().replace(/\s+/g, '_') + '.png';
    const imgPath = `pictures/${imageName}`;
    
    console.log(`📸 ${itemName} → ${imageName} → ${imgPath}`);

    card.innerHTML = `
        <div class="ingredient-image-container">
            <img src="${imgPath}" class="ingredient-image" alt="${itemName}" onerror="console.error('Image failed: ${imgPath}')">
            <button class="ingredient-add-btn" onclick="toggleIngredientCard(event)" title="Add to recipe">
                ${isSelected ? '✓' : '+'}
            </button>
        </div>
    `;
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'ingredient-info';
    nameDiv.innerHTML = `<p class="ingredient-name">${itemName}</p>`;
    card.appendChild(nameDiv);

    card.addEventListener('click', function(e) {
        if (e.target.closest('.ingredient-add-btn')) return; // Handle via button
        toggleIngredientCard.call(card, { target: this });
    });

    return card;
}

function toggleIngredientCard(e) {
    const card = e.target.closest('.ingredient-card');
    if (!card) return;

    const ingredientName = card.dataset.ingredient;
    const index = appState.selectedIngredients.findIndex(i => i.name === ingredientName);

    if (index > -1) {
        // Remove
        appState.selectedIngredients.splice(index, 1);
        card.classList.remove('selected');
        card.querySelector('.ingredient-add-btn').textContent = '+';
        showMotherMessage(`${ingredientName} nikaal diya beta!`);
    } else {
        // Add
        appState.selectedIngredients.push({
            name: ingredientName,
            emoji: card.querySelector('.ingredient-image-container img').alt ? '🥬' : '❓',
            category: appState.currentCategory
        });
        card.classList.add('selected');
        card.querySelector('.ingredient-add-btn').textContent = '✓';
        showMotherMessage(`${ingredientName} add ho gaya beta! 🎉`);
    }

    updateBasket();
    saveState();
}

// ========================================
// INGREDIENT RENDERING
// ========================================

function renderIngredients() {
    // New ingredient rendering is handled by renderIngredientGrid()
    // Called during initializeIngredientSelector()
}

// ========================================
// BASKET MANAGEMENT
// ========================================

function updateBasket() {
    const count = appState.selectedIngredients.length;
    elements.basketCount.textContent = count;

    if (count === 0) {
        elements.basketContainer.innerHTML = '<p class="basket-empty">Kuch ingredients select kar...</p>';
        elements.generateBtn.disabled = true;
    } else {
        elements.basketContainer.innerHTML = '';
        appState.selectedIngredients.forEach(ingredient => {
            const tag = document.createElement('span');
            tag.className = 'basket-tag';
            tag.innerHTML = `
                ${ingredient.emoji} ${ingredient.name}
                <span class="basket-tag-remove">×</span>
            `;
            tag.querySelector('.basket-tag-remove').addEventListener('click', () => {
                const card = document.querySelector(`[data-ingredient="${ingredient.name}"]`);
                toggleIngredient(ingredient, card);
            });
            elements.basketContainer.appendChild(tag);
        });
        elements.generateBtn.disabled = false;
    }
}

// ========================================
// HEALTH STATUS
// ========================================

function setupEventListeners() {
    // Language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            appState.language = e.target.value;
            saveState();
            updateUILanguage();
        });
    }

    // Region selector
    const regionSelect = document.getElementById('regionSelect');
    if (regionSelect) {
        regionSelect.addEventListener('change', (e) => {
            appState.region = e.target.value;
            saveState();
            showMotherMessage(t('motherGreeting'));
        });
    }

    // Health buttons
    document.querySelectorAll('.health-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.health-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            appState.selectedHealth = btn.dataset.health;
            saveState();
        });
    });

    // Generate button
    elements.generateBtn.addEventListener('click', generateRecipes);

    // Close modal
    elements.closeModal.addEventListener('click', closeModal);

    // Logout
    elements.logoutBtn.addEventListener('click', logout);
}

// ========================================
// GEMINI API INTEGRATION
// ========================================

async function generateRecipes() {
    if (appState.selectedIngredients.length === 0) {
        showMotherMessage('Pehle ingredients select kar beta!');
        return;
    }

    showLoading(true);
    showMotherMessage('Mummy soch rahi hai... ek minute...');

    try {
        const ingredients = appState.selectedIngredients.map(i => i.name).join(', ');
        
        // Enrich health context with detailed information
        let healthContext = '';
        if (appState.selectedHealth) {
            const healthData = HEALTH_CONTEXT[appState.selectedHealth] || {};
            healthContext = `User's Health Status: ${healthData.label} (${healthData.description})\nRecipe Focus: ${healthData.suggestions}`;
        }
        
        const prompt = constructRecipePrompt(ingredients, healthContext);
        const recipes = await callGeminiAPI(prompt);
        
        displayRecipes(recipes);
        showMotherMessage('Dekho beta, ye recipe tumnhe pasand aayegi!');
    } catch (error) {
        console.error('Error generating recipes:', error);
        showMotherMessage('Beta, internet slow hai... dubara try kar.');
        showError('Failed to generate recipes. Please try again.');
    } finally {
        showLoading(false);
    }
}

function constructRecipePrompt(ingredients, healthContext) {
    const regionData = REGION_PREFERENCES[appState.region] || REGION_PREFERENCES.north;
    const languageInstruction = getLanguageInstruction(appState.language);
    
    return `
You are a loving Indian mother (MUMMY) who suggests delicious home-style recipes.

CONTEXT:
- User's Region: ${regionData.name}
- Regional Cooking Style: ${regionData.cookingStyle}
- User's Health Status: ${healthContext}
- Language Preference: ${LANGUAGES[appState.language]}

Available ingredients: ${ingredients}

Please suggest 2-3 authentic Indian home recipes from the ${regionData.name} cuisine that can be made with ONLY the available ingredients (you can suggest common substitutes if needed).

For EACH recipe, provide in this EXACT format:

🍲 RECIPE [Number]
Title: [Dish Name]
Subtitle: [Brief description in mother-like tone]

🥘 INGREDIENTS:
[List ingredients with quantities]

👩‍🍳 INSTRUCTIONS:
1. [Step 1]
2. [Step 2]
[Continue steps...]

💚 MOTHER'S TIPS:
[Give caring, warm cooking tips. Include regional variations and health tips based on user's health status]

---

IMPORTANT:
${languageInstruction}
- Suggest recipes typical of ${regionData.name}
- Keep tips emotional and relatable
- Consider the user's health condition in your suggestions
- Don't give medical advice, just food suggestions
- Be like a loving Indian mother
    `;
}

function getLanguageInstruction(language) {
    switch(language) {
        case 'hinglish':
            return `- Use warm, caring Hinglish tone throughout (mix of Hindi and English)
- Use sentences like "Beta, zyada mat bhuno", "Ye dish garmi mein bahut achha hai"`;
        case 'hindi':
            return `- Respond primarily in Hindi/Devanagari script
- Use warm, caring tone with emotional expressions
- Keep it simple and home-style`;
        default:
            return `- Use warm, caring English tone throughout
- Make it personal and encouraging`;
    }
}

async function callGeminiAPI(prompt) {
    if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY.includes('...')) {
        // Demo mode: return sample recipes
        return generateSampleRecipes();
    }

    const response = await fetch(CONFIG.GEMINI_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONFIG.GEMINI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gemini-2.5-flash',
            messages: [
                {
                    role: 'system',
                    content: 'You are Mummy, a loving Indian mother who suggests delicious home-style recipes.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]
        })
    });

    if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        const errorData = await response.json();
        console.error('Error Details:', errorData);
        throw new Error(`Gemini API Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Gemini API Response:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid Gemini API response format');
    }
    
    const recipeText = data.choices[0].message.content;
    const recipes = parseRecipes(recipeText);
    
    if (!recipes || recipes.length === 0) {
        throw new Error('No recipes generated from Gemini response');
    }
    
    return recipes;
}

function parseRecipes(text) {
    // Parse the formatted recipe text from Gemini
    const recipes = [];
    const recipeBlocks = text.split('---').filter(block => block.trim());

    recipeBlocks.forEach(block => {
        const recipe = parseRecipeBlock(block);
        if (recipe.title) recipes.push(recipe);
    });

    return recipes;
}

function parseRecipeBlock(block) {
    const lines = block.trim().split('\n');
    const recipe = {
        title: '',
        subtitle: '',
        ingredients: [],
        instructions: [],
        tips: ''
    };

    let currentSection = null;

    lines.forEach(line => {
        line = line.trim();
        
        if (line.includes('Title:')) {
            recipe.title = line.replace('Title:', '').trim();
        } else if (line.includes('Subtitle:')) {
            recipe.subtitle = line.replace('Subtitle:', '').trim();
        } else if (line.includes('INGREDIENTS')) {
            currentSection = 'ingredients';
        } else if (line.includes('INSTRUCTIONS')) {
            currentSection = 'instructions';
        } else if (line.includes('MOTHER\'S TIPS')) {
            currentSection = 'tips';
        } else if (line && currentSection === 'ingredients' && !line.startsWith('👨')) {
            recipe.ingredients.push(line);
        } else if (line && currentSection === 'instructions' && !line.startsWith('👨')) {
            recipe.instructions.push(line);
        } else if (currentSection === 'tips' && line) {
            recipe.tips += line + ' ';
        }
    });

    return recipe;
}

function generateSampleRecipes() {
    // Demo recipes when API key is not configured
    return [
        {
            title: 'Aloo Gobi',
            subtitle: 'Crispy potatoes aur gobhi ka mix - ghar ka classic!',
            ingredients: ['Aloo - 500g', 'Gobhi - 400g', 'Pyaaz - 2', 'Tamatar - 2', 'Garam masala - 1 tsp'],
            instructions: [
                'Aloo aur gobhi ko chhote pieces mein cut kar',
                'Heeng aur jeera dalkar oil mein tempering kar',
                'Pyaaz ko golden brown hone tak bhun',
                'Tomato daala aur masala mix kar',
                'Aloo aur gobhi daala, 15 minutes tak pakane de'
            ],
            tips: 'Beta, agar aloo crispy bana sakte ho toh bahut achha rahaega! Pehle high flame par bhun, phir thoda low karde. Namak aur mirch apne taste se dalna.'
        },
        {
            title: 'Moong Dal Khichdi',
            subtitle: 'Light, healthy, aur tummy friendly - bilkul ghar ka khana!',
            ingredients: ['Moong dal - 1 cup', 'Chawal - 1 cup', 'Turmeric - 1/2 tsp', 'Jeera - 1 tsp'],
            instructions: [
                'Dal aur chawal ko dhulkar 30 min soak kar',
                'Pressure cooker mein dal aur chawal daala',
                'Turmeric aur salt add kar',
                '3-4 whistle de aur cool hone de',
                'Serve ghi aur namak ke saath'
            ],
            tips: 'Ye khichdi bilkul light hai, tabiyat kharab ho toh perfect! Pehle dal ko well cook karne ke liye extra paani use kar. Garam garam serve karna, beta.'
        },
        {
            title: 'Sabzi Fry',
            subtitle: 'Sab vegetables ka mast tadka - pura nutrition ek plate mein!',
            ingredients: ['Mixed vegetables', 'Pyaaz - 2', 'Laal mirch - 1 tsp', 'Garam masala'],
            instructions: [
                'Sab vegetables ko uniform size mein cut kar',
                'Oil/ghee mein mustard seeds tempering kar',
                'Pyaaz ko sauna tak cook kar',
                'Sab vegetables daala aur 10 min tak fry kar',
                'Spices aur namak se season kar'
            ],
            tips: 'Sabzi ko zyada time mat pakao beta, soft rahni chahiye! Agar koi vegetable zyada hard hai toh pehle use pakao. Fresh dhania se garnish kar, bahut achha lagega!'
        }
    ];
}

// ========================================
// RECIPE DISPLAY
// ========================================

function displayRecipes(recipes) {
    let html = '<h2 style="color: var(--primary-orange); margin-bottom: 1.5rem;">Aaj ke liye ye recipes hain beta! 👩‍🍳</h2>';

    recipes.forEach((recipe, index) => {
        html += `
            <div class="recipe-card">
                <div class="recipe-title">🍲 ${recipe.title}</div>
                <div class="recipe-subtitle">${recipe.subtitle}</div>

                <div class="recipe-section">
                    <div class="recipe-section-title">🥘 Ingredients:</div>
                    <ul class="recipe-list">
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>

                <div class="recipe-section">
                    <div class="recipe-section-title">👩‍🍳 Instructions:</div>
                    <ol class="recipe-list">
                        ${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}
                    </ol>
                </div>

                <div class="recipe-tips">
                    <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--primary-orange);">💚 Mummy's Tips:</div>
                    <div class="recipe-tips-text">"${recipe.tips}"</div>
                </div>
            </div>
        `;
    });

    elements.recipeContainer.innerHTML = html;
    openModal();
}

// ========================================
// MODAL MANAGEMENT
// ========================================

function openModal() {
    elements.recipeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    elements.recipeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ========================================
// LOADING & MESSAGES
// ========================================

function showLoading(show) {
    if (show) {
        elements.loadingOverlay.classList.add('active');
    } else {
        elements.loadingOverlay.classList.remove('active');
    }
}

function showMotherMessage(message) {
    elements.motherMessage.textContent = message;
    elements.motherMessage.style.animation = 'pulse 1s ease-in-out';
    setTimeout(() => {
        elements.motherMessage.style.animation = '';
    }, 1000);
}

function showError(message) {
    alert(`⚠️ ${message}`);
}

// ========================================
// LANGUAGE & LOCALIZATION
// ========================================

function updateUILanguage() {
    // Update header text
    const appSubtitle = document.getElementById('appSubtitle');
    const motherMessage = document.getElementById('motherMessage');
    const moodTitle = document.getElementById('moodTitle');
    const langLabel = document.getElementById('langLabel');
    const regionLabel = document.getElementById('regionLabel');

    if (appSubtitle) appSubtitle.textContent = t('appSubtitle');
    if (motherMessage) motherMessage.textContent = t('motherGreeting');
    if (moodTitle) moodTitle.textContent = t('mood');
    if (langLabel) langLabel.textContent = t('language');
    if (regionLabel) regionLabel.textContent = t('region');

    // Update mood button text
    document.querySelectorAll('.health-btn').forEach(btn => {
        const health = btn.dataset.health;
        const moodTextEl = btn.querySelector('.mood-text');
        if (moodTextEl) {
            const keyMap = {
                'healthy': 'moodNormal',
                'fever': 'moodFever',
                'cold': 'moodCold',
                'tired': 'moodTired',
                'digestion': 'moodDigestion',
                'allergy': 'moodAllergy',
                'diabetic': 'moodDiabetic',
                'vegan': 'moodVegan'
            };
            moodTextEl.textContent = t(keyMap[health]) || health;
        }
    });

    // Update region select options
    const regionSelect = document.getElementById('regionSelect');
    if (regionSelect) {
        const options = regionSelect.querySelectorAll('option');
        options.forEach((option, index) => {
            const keyMap = ['regionNorth', 'regionSouth', 'regionEast', 'regionWest', 'regionNorthEast'];
            if (keyMap[index]) option.textContent = t(keyMap[index]);
        });
    }

    // Update language select label
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        const options = languageSelect.querySelectorAll('option');
        options[0].textContent = 'English';
        options[1].textContent = 'Hinglish (हिंग्लिश)';
        options[2].textContent = 'हिंदी';
    }

    // Update generate button text
    if (elements.generateBtn) {
        elements.generateBtn.querySelector('.cta-text').textContent = t('generate');
    }
}

// ========================================
// NOTIFICATIONS
// ========================================

function initializeNotifications() {
    if (!('Notification' in window)) return;

    // Request permission
    if (Notification.permission === 'granted') {
        scheduleNotifications();
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                scheduleNotifications();
            }
        });
    }
}

function scheduleNotifications() {
    // Morning reminder - 7 AM
    scheduleNotificationAt(7, 0, '☀️ Subah ho gai beta!', 'Paani piya kya? Ek glass paani pee le.');

    // Lunch reminder - 1 PM
    scheduleNotificationAt(13, 0, '🍽️ Lunch ka time!', 'Beta, khana to le le na... stomach ko bhookh lag jayegi!');

    // Evening snack - 4 PM
    scheduleNotificationAt(16, 0, '🍵 Chai ka time!', 'Ek cup chai kar le. Thandi mat reh.');

    // Dinner reminder - 8 PM
    scheduleNotificationAt(20, 0, '🌙 Raat ko khana!', 'Beta, light khana kar de. Raat ko heavy food nahi hota.');

    // Bedtime reminder - 10 PM
    scheduleNotificationAt(22, 0, '😴 Sone ka time!', 'Beta, ab so ja. Kal subah jaldi uthna hai.');
}

function scheduleNotificationAt(hours, minutes, title, body) {
    const checkNotification = setInterval(() => {
        const now = new Date();
        if (now.getHours() === hours && now.getMinutes() === minutes) {
            new Notification(title, {
                body: body,
                icon: '🍲',
                badge: '👩',
                tag: 'mummy-' + hours,
                requireInteraction: false
            });
            clearInterval(checkNotification);
            // Schedule again tomorrow
            scheduleNotificationAt(hours, minutes, title, body);
        }
    }, 30000); // Check every 30 seconds
}

// ========================================
// LOCAL STORAGE
// ========================================

function saveState() {
    localStorage.setItem(CONFIG.STORAGE_KEY_INGREDIENTS, JSON.stringify(appState.selectedIngredients));
    localStorage.setItem(CONFIG.STORAGE_KEY_HEALTH, appState.selectedHealth || '');
    localStorage.setItem(CONFIG.STORAGE_KEY_LANGUAGE, appState.language);
    localStorage.setItem(CONFIG.STORAGE_KEY_REGION, appState.region);
}

function restoreState() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY_INGREDIENTS);
    if (saved) {
        appState.selectedIngredients = JSON.parse(saved);
        updateBasket();
        appState.selectedIngredients.forEach(ingredient => {
            const card = document.querySelector(`[data-ingredient="${ingredient.name}"]`);
            if (card) card.classList.add('selected');
        });
    }

    const health = localStorage.getItem(CONFIG.STORAGE_KEY_HEALTH);
    if (health) {
        appState.selectedHealth = health;
        const btn = document.querySelector(`[data-health="${health}"]`);
        if (btn) btn.classList.add('selected');
    }

    // Restore language
    const language = localStorage.getItem(CONFIG.STORAGE_KEY_LANGUAGE);
    if (language) {
        appState.language = language;
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) languageSelect.value = language;
        updateUILanguage();
    }

    // Restore region
    const region = localStorage.getItem(CONFIG.STORAGE_KEY_REGION);
    if (region) {
        appState.region = region;
        const regionSelect = document.getElementById('regionSelect');
        if (regionSelect) regionSelect.value = region;
    }
}

// ========================================
// LOGOUT
// ========================================

function logout() {
    localStorage.removeItem(CONFIG.STORAGE_KEY_USER);
    localStorage.removeItem('mummy_user_name');
    redirectToLogin();
}
