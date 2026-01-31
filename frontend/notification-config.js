/**
 * Notification Configuration
 * Meal-time based notifications for daily health reminders
 */

const notificationConfig = {
  // Enable/disable notifications
  enabled: true,
  
  // Timezone (can be adjusted based on user location)
  timezone: "Asia/Kolkata",
  
  // Notification method: 'browser', 'push', 'email', 'sms'
  notificationMethod: "browser",
  
  // Sound enabled for notifications
  soundEnabled: true,
  
  // Vibration enabled for mobile
  vibrationEnabled: true,
  
  // Schedule: Daily meal reminders
  schedule: {
    earlyMorning: {
      time: "06:00",
      enabled: true,
      repeat: "daily",
      duration: 90 // minutes
    },
    breakfast: {
      time: "08:00",
      enabled: true,
      repeat: "daily",
      duration: 120
    },
    midMorningSnack: {
      time: "11:00",
      enabled: true,
      repeat: "daily",
      duration: 60
    },
    lunch: {
      time: "13:00",
      enabled: true,
      repeat: "daily",
      duration: 90,
      important: true
    },
    eveningSnack: {
      time: "16:30",
      enabled: true,
      repeat: "daily",
      duration: 90
    },
    dinner: {
      time: "19:30",
      enabled: true,
      repeat: "daily",
      duration: 120
    },
    bedtime: {
      time: "22:00",
      enabled: true,
      repeat: "daily",
      duration: 90,
      optional: true
    }
  },
  
  // Notification persistence settings
  persistence: {
    saveHistory: true,
    maxHistory: 100,
    storageType: "localStorage" // or 'IndexedDB', 'sessionStorage'
  },
  
  // User preferences
  preferences: {
    remindDaily: true,
    snoozeOption: true,
    snoozeDuration: 5, // minutes
    dismissible: true
  }
};

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = notificationConfig;
}
