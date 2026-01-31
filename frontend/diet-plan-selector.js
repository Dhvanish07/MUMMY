/**
 * Diet Plan Selector Module
 * Handles diet plan selection, storage, and integration with ingredient selection
 */

let selectedDietPlanId = null;
let selectedDietPlan = null;
let totalDailyCalories = 0;
let mealsCalorieTracker = {
    earlyMorning: 0,
    breakfast: 0,
    midMorning: 0,
    lunch: 0,
    eveningSnack: 0,
    dinner: 0
};

/**
 * Initialize diet plan selector
 */
function initializeDietPlanSelector() {
    const dietPlanLink = document.getElementById('dietPlanLink');
    const dietPlanModal = document.getElementById('dietPlanModal');
    const closeDietPlanModal = document.getElementById('closeDietPlanModal');
    const confirmDietPlanBtn = document.getElementById('confirmDietPlanBtn');
    const skipDietPlanBtn = document.getElementById('skipDietPlanBtn');

    // Open modal
    if (dietPlanLink) {
        dietPlanLink.addEventListener('click', (e) => {
            e.preventDefault();
            openDietPlanModal();
        });
    }

    // Close modal button
    if (closeDietPlanModal) {
        closeDietPlanModal.addEventListener('click', closeDietPlanModal_fn);
    }

    // Close modal when clicking outside (on backdrop)
    if (dietPlanModal) {
        dietPlanModal.addEventListener('click', (e) => {
            // Only close if clicking on the modal background, not the content
            if (e.target === dietPlanModal) {
                closeDietPlanModal_fn();
            }
        });
    }

    // Confirm selection
    if (confirmDietPlanBtn) {
        confirmDietPlanBtn.addEventListener('click', confirmDietPlanSelection);
    }

    // Skip diet plan
    if (skipDietPlanBtn) {
        skipDietPlanBtn.addEventListener('click', skipDietPlanSelection);
    }

    // Load previously selected plan if exists
    loadSelectedDietPlan();
}

/**
 * Open diet plan selection modal
 */
function openDietPlanModal() {
    const modal = document.getElementById('dietPlanModal');
    const gridContainer = document.getElementById('dietPlansGrid');

    if (!modal || !gridContainer) {
        console.error('❌ Modal or gridContainer not found!');
        return;
    }

    // Clear previous content
    gridContainer.innerHTML = '';

    // Get all diet plans
    const allPlans = getAllDietPlans();
    console.log('✅ Diet Plans Found:', allPlans);

    // Create plan cards
    for (const [planId, plan] of Object.entries(allPlans)) {
        console.log(`📋 Creating card for: ${planId}`, plan);
        const planCard = createDietPlanCard(planId, plan);
        gridContainer.appendChild(planCard);
    }

    // Show modal
    modal.style.display = 'flex';
    modal.classList.add('active');

    // Update selected state
    updateDietPlanSelection();
    console.log('✅ Diet plan modal opened');
}

/**
 * Create a diet plan card element
 */
function createDietPlanCard(planId, plan) {
    const card = document.createElement('div');
    card.className = 'diet-plan-card';
    card.dataset.planId = planId;
    
    const { emoji, name, description, dailyCalories } = plan;
    
    card.innerHTML = `
        <div class="diet-plan-card-header">
            <span class="diet-plan-emoji">${emoji}</span>
            <h3 class="diet-plan-name">${name}</h3>
        </div>
        <p class="diet-plan-description">${description}</p>
        <div class="diet-plan-calories">
            <span class="calorie-range">
                <strong>Daily Calories:</strong> ${dailyCalories.min} - ${dailyCalories.max} kcal
            </span>
        </div>
        <div class="diet-plan-meals">
            <strong>6 Meals per day:</strong>
            <div class="meals-list">
                <span>🌅 Early Morning</span>
                <span>🍳 Breakfast</span>
                <span>☕ Mid-Morning</span>
                <span>🍛 Lunch</span>
                <span>🍵 Evening Snack</span>
                <span>🌙 Dinner</span>
            </div>
        </div>
    `;

    // Add click handler
    card.addEventListener('click', () => {
        selectDietPlan(planId, plan);
    });

    return card;
}

/**
 * Select a diet plan
 */
function selectDietPlan(planId, plan) {
    selectedDietPlanId = planId;
    selectedDietPlan = plan;
    
    // Update visual selection
    updateDietPlanSelection();

    // Update info text
    const infoText = document.getElementById('selectedPlanInfo');
    if (infoText) {
        infoText.innerHTML = `<strong>Selected:</strong> ${plan.name} • ${plan.dailyCalories.min}-${plan.dailyCalories.max} kcal/day`;
    }
}

/**
 * Update visual selection of diet plan cards
 */
function updateDietPlanSelection() {
    const cards = document.querySelectorAll('.diet-plan-card');
    cards.forEach(card => {
        if (card.dataset.planId === selectedDietPlanId) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

/**
 * Confirm diet plan selection
 */
function confirmDietPlanSelection() {
    if (!selectedDietPlanId) {
        alert('Please select a diet plan first');
        return;
    }

    // Save to localStorage
    saveDietPlanSelection();

    // Close modal
    closeDietPlanModal_fn();

    // Show confirmation message
    showDietPlanConfirmation(selectedDietPlan);

    // Enable integration with ingredient selector
    enableDietPlanIntegration();
}

/**
 * Skip diet plan selection
 */
function skipDietPlanSelection() {
    selectedDietPlanId = null;
    selectedDietPlan = null;
    
    // Clear localStorage
    localStorage.removeItem('selectedDietPlan');
    localStorage.removeItem('selectedDietPlanId');

    // Close modal
    closeDietPlanModal_fn();

    // Show message
    console.log('Diet plan selection skipped. Ingredient selection is now unrestricted.');
}

/**
 * Close diet plan modal
 */
function closeDietPlanModal_fn() {
    const modal = document.getElementById('dietPlanModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
}

/**
 * Save diet plan selection to localStorage
 */
function saveDietPlanSelection() {
    if (selectedDietPlanId && selectedDietPlan) {
        localStorage.setItem('selectedDietPlanId', selectedDietPlanId);
        localStorage.setItem('selectedDietPlan', JSON.stringify(selectedDietPlan));
    }
}

/**
 * Get a diet plan by ID
 */
function getDietPlan(planId) {
    if (typeof getAllDietPlans === 'function') {
        const allPlans = getAllDietPlans();
        return allPlans[planId];
    }
    return null;
}

/**
 * Load diet plan selection from localStorage
 */
function loadSelectedDietPlan() {
    const savedPlanId = localStorage.getItem('selectedDietPlanId');
    if (savedPlanId) {
        const plan = getDietPlan(savedPlanId);
        if (plan) {
            selectedDietPlanId = savedPlanId;
            selectedDietPlan = plan;
            enableDietPlanIntegration();
        }
    }
}

/**
 * Show confirmation message
 */
function showDietPlanConfirmation(plan) {
    // Create a temporary notification or toast
    const message = `✅ Diet plan "${plan.name}" selected! Daily limit: ${plan.dailyCalories.min}-${plan.dailyCalories.max} kcal`;
    console.log(message);
    
    // Show in toast notification if available
    if (window.showNotification) {
        window.showNotification(message, 'success');
    }
}

/**
 * Enable diet plan integration with ingredient selector
 */
function enableDietPlanIntegration() {
    console.log('Diet plan integration enabled for:', selectedDietPlan.name);
    
    // This function will be called when ingredients are selected
    // It will validate against the selected diet plan's calorie limits
}

/**
 * Check if ingredient can be added based on diet plan
 * Returns { canAdd: boolean, message: string }
 */
function canAddIngredient(ingredientCalories) {
    if (!selectedDietPlanId || !selectedDietPlan) {
        // No diet plan selected, allow all ingredients
        return { canAdd: true, message: '' };
    }

    const { max } = selectedDietPlan.dailyCalories;
    const newTotal = totalDailyCalories + ingredientCalories;

    if (newTotal > max) {
        const excess = newTotal - max;
        return {
            canAdd: false,
            message: `Adding this ingredient would exceed your daily limit by ${excess} kcal. Current: ${totalDailyCalories} / ${max} kcal`
        };
    }

    const remaining = max - newTotal;
    return {
        canAdd: true,
        message: `You'll have ${remaining} kcal remaining for today`
    };
}

/**
 * Add ingredient calories to tracker
 */
function addIngredientCalories(ingredientCalories, mealType = 'lunch') {
    if (!selectedDietPlanId) return;

    totalDailyCalories += ingredientCalories;
    
    // Update meal-wise tracker if mealType provided
    if (mealType && mealsCalorieTracker.hasOwnProperty(mealType)) {
        mealsCalorieTracker[mealType] += ingredientCalories;
    }

    // Log to console for debugging
    console.log(`Total daily calories: ${totalDailyCalories} / ${selectedDietPlan.dailyCalories.max}`);
}

/**
 * Remove ingredient calories from tracker
 */
function removeIngredientCalories(ingredientCalories, mealType = 'lunch') {
    if (!selectedDietPlanId) return;

    totalDailyCalories = Math.max(0, totalDailyCalories - ingredientCalories);
    
    if (mealType && mealsCalorieTracker.hasOwnProperty(mealType)) {
        mealsCalorieTracker[mealType] = Math.max(0, mealsCalorieTracker[mealType] - ingredientCalories);
    }

    console.log(`Total daily calories: ${totalDailyCalories} / ${selectedDietPlan.dailyCalories.max}`);
}

/**
 * Get current diet plan status
 */
function getDietPlanStatus() {
    if (!selectedDietPlanId || !selectedDietPlan) {
        return {
            active: false,
            message: 'No diet plan selected'
        };
    }

    const { min, max } = selectedDietPlan.dailyCalories;
    return {
        active: true,
        planName: selectedDietPlan.name,
        minCalories: min,
        maxCalories: max,
        currentCalories: totalDailyCalories,
        remaining: Math.max(0, max - totalDailyCalories),
        percentUsed: Math.round((totalDailyCalories / max) * 100),
        status: totalDailyCalories > max ? 'exceeded' : (totalDailyCalories < min ? 'below' : 'within'),
        message: checkDailyCalorieLimit(selectedDietPlanId, totalDailyCalories).message
    };
}

/**
 * Reset diet plan tracker
 */
function resetDietPlanTracker() {
    totalDailyCalories = 0;
    mealsCalorieTracker = {
        earlyMorning: 0,
        breakfast: 0,
        midMorning: 0,
        lunch: 0,
        eveningSnack: 0,
        dinner: 0
    };
    console.log('Diet plan tracker reset');
}

/**
 * Clear selected diet plan
 */
function clearSelectedDietPlan() {
    selectedDietPlanId = null;
    selectedDietPlan = null;
    localStorage.removeItem('selectedDietPlan');
    localStorage.removeItem('selectedDietPlanId');
    resetDietPlanTracker();
    console.log('Diet plan cleared');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDietPlanSelector);
} else {
    initializeDietPlanSelector();
}
