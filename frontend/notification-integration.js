/**
 * Notification Integration
 * Integrates meal-time notifications with the main app
 */

console.log('🔔 Notification integration script loading...');

// Check for current meal time and trigger notification
function checkAndTriggerMealNotification() {
  console.log('🔍 Checking meal times...');
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  console.log(`⏰ Current time: ${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`);

  // Meal time windows - EXACT times
  const meals = [
    { name: 'Early Morning', emoji: '🌄', startHour: 6, endHour: 8, mumSays: 'Uth gaya? Thoda paani pi le pehle.' },
    { name: 'Breakfast', emoji: '☀️', startHour: 8, endHour: 11, mumSays: 'Nashta miss mat karna beta! Uthho aur kuch acha khao.' },
    { name: 'Mid-Morning Snack', emoji: '🍌', startHour: 11, endHour: 13, mumSays: 'Thoda phal kha le beta, energy mil jayegi!' },
    { name: 'Lunch', emoji: '🍽️', startHour: 13, endHour: 16, mumSays: 'Dopahar ka khana time ho gaya! Poora parivar mil ke khaao.' },
    { name: 'Evening Snack', emoji: '🍕', startHour: 16, endHour: 19, mumSays: 'Shaam ke snacks ka time! Kuch healthy kha le.' },
    { name: 'Dinner', emoji: '🌙', startHour: 19, endHour: 22, mumSays: 'Raat ka khana tayyar kar lo! Light dinner khana healthy.' }
  ];

  // Check each meal
  let foundMeal = null;
  for (let meal of meals) {
    const isInWindow = currentHour >= meal.startHour && currentHour < meal.endHour;
    console.log(`  ${meal.emoji} ${meal.name} (${meal.startHour}:00 - ${meal.endHour}:00): ${isInWindow ? '✅ ACTIVE' : '❌ Inactive'}`);
    
    if (isInWindow) {
      foundMeal = meal;
      break; // Found it, stop checking
    }
  }

  if (foundMeal) {
    console.log(`✅ FOUND: It's ${foundMeal.name} time!`);
    triggerMealNotification(foundMeal);
  } else {
    console.log('⏳ No meal time is active right now');
  }
}

/**
 * Trigger notification for a meal
 */
function triggerMealNotification(meal) {
  console.log(`🚀 Triggering ${meal.name} notification...`);
  
  // Wait for NotificationManager to be ready
  if (typeof window.notificationManager !== 'undefined' && typeof window.notificationManager.addNotification === 'function') {
    console.log('✅ NotificationManager is ready!');
    window.notificationManager.addNotification({
      title: `${meal.emoji} ${meal.name} Time`,
      message: meal.mumSays,
      icon: meal.emoji,
      suggestions: ['See Diet Plans', 'View Recipes']
    });
    console.log(`✅ ${meal.name} notification DISPLAYED!`);
  } else {
    console.warn('⚠️ NotificationManager not ready, will retry...');
    setTimeout(() => {
      if (typeof window.notificationManager !== 'undefined') {
        window.notificationManager.addNotification({
          title: `${meal.emoji} ${meal.name} Time`,
          message: meal.mumSays,
          icon: meal.emoji,
          suggestions: ['See Diet Plans', 'View Recipes']
        });
        console.log(`✅ ${meal.name} notification DISPLAYED (on retry)!`);
      }
    }, 500);
  }
}

// Run check only on page load (to avoid duplicate triggers)
window.addEventListener('load', () => {
  console.log('📄 Page loaded, checking meal times...');
  checkAndTriggerMealNotification();
});

console.log('🔔 Notification integration ready!');
console.log('💡 Available commands:');
console.log('   - checkAndTriggerMealNotification() - Check current time and show meal notification');
console.log('   - breakfastNotification() - Show breakfast immediately');
console.log('   - lunchNotification() - Show lunch immediately');
console.log('   - dinnerNotification() - Show dinner immediately');

/**
 * Show test notifications for demo purposes
 */
function showTestNotifications() {
  if (typeof window.notificationManager === 'undefined') {
    console.warn('NotificationManager not ready yet');
    return;
  }

  // Test notification 1 - Breakfast reminder
  window.notificationManager.addNotification({
    title: '☀️ Good Morning! Breakfast Time',
    message: 'Nashta miss mat karna beta. Uthho aur kuch acha khao!',
    icon: '☀️',
    suggestions: ['Paratha + sabzi', 'Dosa', 'Upma', 'Poha']
  });

  // Test notification 2 - Mid-morning snack
  setTimeout(() => {
    window.notificationManager.addNotification({
      title: '🍌 Time for Mid-Morning Snack',
      message: 'Thoda phal kha le beta, energy mil jayegi!',
      icon: '🍌',
      suggestions: ['Apple 🍎', 'Banana 🍌', 'Coconut water', 'Peanuts']
    });
  }, 2000);

  // Test notification 3 - Lunch reminder
  setTimeout(() => {
    window.notificationManager.addNotification({
      title: '🍽️ Lunch Time!',
      message: 'Dopahar ka khana time ho gaya. Poora parivar khaa le!',
      icon: '🍽️',
      suggestions: ['Rice + Dal', 'Roti + Sabzi', 'Sambar + Rice']
    });
  }, 4000);

  console.log('🎉 Test notifications added!');
  console.log('💡 Use testNotifications() to add more test notifications anytime');
}

/**
 * Add test notifications manually (can be called from console)
 */
window.testNotifications = function() {
  showTestNotifications();
};

/**
 * Trigger breakfast notification immediately (demo)
 */
window.breakfastNotification = function() {
  if (typeof window.notificationManager === 'undefined') {
    console.warn('NotificationManager not ready yet');
    return;
  }

  window.notificationManager.addNotification({
    title: '☀️ Breakfast Time - 8:00 AM',
    message: 'Nashta miss mat karna beta! Uthho aur kuch acha khao. Morning energy ke liye breakfast zaroori hai!',
    icon: '☀️',
    suggestions: ['Paratha + sabzi', 'Dosa + sambar', 'Upma', 'Poha', 'Idli', 'Bread + omelette', 'Milk + tea']
  });

  console.log('🍳 Breakfast notification triggered!');
};

/**
 * Trigger lunch notification immediately (demo)
 */
window.lunchNotification = function() {
  if (typeof window.notificationManager === 'undefined') {
    console.warn('NotificationManager not ready yet');
    return;
  }

  window.notificationManager.addNotification({
    title: '🍽️ Lunch Time - 1:00 PM',
    message: 'Dopahar ka khana time ho gaya! Poora parivar mil ke khaao. Proper lunch zaroor khao taake energy rhe.',
    icon: '🍽️',
    suggestions: ['Rice + Dal', 'Roti + Sabzi', 'Sambar + Rice', 'Chicken Curry', 'Fish Fry']
  });

  console.log('🍽️ Lunch notification triggered!');
};

/**
 * Trigger dinner notification immediately (demo)
 */
window.dinnerNotification = function() {
  if (typeof window.notificationManager === 'undefined') {
    console.warn('NotificationManager not ready yet');
    return;
  }

  window.notificationManager.addNotification({
    title: '🌙 Dinner Time - 7:00 PM',
    message: 'Raat ka khana tayyar kar lo! Light dinner khana healthy hota hai. Acha neend aayegi!',
    icon: '🌙',
    suggestions: ['Khichdi', 'Light soup', 'Grilled vegetables', 'Dal + Rice', 'Roti + Raita']
  });

  console.log('🌙 Dinner notification triggered!');
};

/**
 * Trigger breakfast if it's currently breakfast time
 */
function triggerBreakfastIfTime() {
  if (typeof window.notificationManager === 'undefined') {
    console.warn('⚠️ NotificationManager still not available');
    return;
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Breakfast is 8:00 AM to 10:00 AM
  const isBreakfastTime = currentHour === 8 || currentHour === 9;

  if (isBreakfastTime) {
    console.log(`🔥 Forcing breakfast notification for ${currentHour}:${currentMinute.toString().padStart(2, '0')}`);
    window.notificationManager.addNotification({
      title: '☀️ Breakfast Time - 8:00 AM',
      message: 'Nashta miss mat karna beta! Uthho aur kuch acha khao. Morning energy ke liye breakfast zaroori hai!',
      icon: '☀️',
      suggestions: ['Paratha + sabzi', 'Dosa + sambar', 'Upma', 'Poha', 'Idli', 'Bread + omelette', 'Milk + tea']
    });
  }
}

console.log('🔔 Notification integration loaded');
console.log('💡 Available commands:');
console.log('   - testNotifications() → Show 3 demo notifications');
console.log('   - breakfastNotification() → Trigger breakfast at 8:00 AM');
console.log('   - lunchNotification() → Trigger lunch at 1:00 PM');
console.log('   - dinnerNotification() → Trigger dinner at 7:00 PM');
console.log('   - triggerBreakfastIfTime() → Force breakfast if time matches');
