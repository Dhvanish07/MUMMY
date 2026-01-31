/**
 * Notification Integration
 * Integrates the notification service with the MUMMY app
 */

let notificationServiceInstance = null;

function initializeMummyNotifications() {
    if (!('Notification' in window)) {
        console.log('⚠️ Browser does not support notifications');
        return;
    }

    console.log('🔔 Initializing MUMMY notification system...');
    
    // Create notification service instance
    notificationServiceInstance = new NotificationService(notificationConfig);

    // Request permission if not already granted or denied
    if (Notification.permission === 'granted') {
        console.log('✅ Notification permission already granted');
        scheduleAllMummyMealNotifications();
    } else if (Notification.permission !== 'denied') {
        console.log('⏳ Requesting notification permission...');
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('✅ Notification permission granted by user');
                scheduleAllMummyMealNotifications();
            } else {
                console.log('❌ Notification permission denied');
            }
        });
    } else {
        console.log('⛔ Notification permission previously denied');
    }
}

function scheduleAllMummyMealNotifications() {
    console.log('📅 Loading meal notification schedule...');
    
    // Load meal notifications from JSON
    fetch('./notifications.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log(`📋 Found ${data.notifications.length} meal notifications`);
            
            data.notifications.forEach(meal => {
                // Format notification data
                const notificationData = {
                    title: `${meal.icon} ${meal.title}`,
                    message: meal.message,
                    icon: meal.icon,
                    tag: meal.category,
                    purpose: meal.purpose,
                    suggestions: meal.suggestions
                };
                
                // Schedule the notification
                notificationServiceInstance.scheduleNotification(meal.time, notificationData);
                console.log(`  ✓ Scheduled: ${meal.icon} ${meal.title} at ${meal.time}`);
            });
            
            // Connect notification service to bell UI
            if (typeof notificationBellUI !== 'undefined' && notificationBellUI) {
                notificationBellUI.setNotificationService(notificationServiceInstance);
                console.log('🔔 Notification bell connected');
            }
            
            console.log('🎉 All meal notifications scheduled successfully!');
        })
        .catch(error => {
            console.error('❌ Failed to load notifications:', error);
        });
}

// Export for use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeMummyNotifications, scheduleAllMummyMealNotifications };
}
