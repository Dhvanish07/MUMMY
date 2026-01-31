# 🔔 MUMMY Notifications System

Daily meal-time reminders to keep you healthy and on track with proper nutrition!

## 📁 Folder Structure

```
notifications/
├── notifications.json           # Core notification data (7 meal times)
├── notification-config.js       # Configuration settings
├── notification-service.js      # Notification service logic
└── README.md                    # This file
```

## 📋 Meal Notification Schedule

| Time | Meal | MUMMY Says | Purpose |
|------|------|-----------|---------|
| 🌄 06:00-07:30 | Early Morning | "Uth gaya? Thoda paani pi le pehle." | Hydration & digestion |
| ☀️ 08:00-10:00 | Breakfast | "Nashta miss mat karna beta." | Energy boost |
| 🍎 11:00-12:00 | Mid-Morning Snack | "Thoda phal kha le." | Prevent weakness |
| 🍽️ 13:00-14:30 | Lunch | "Lunch theek se kha—sirf snacks nahi." | Main meal (IMPORTANT) |
| ☕ 16:30-18:00 | Evening Snack | "Shaam ka kuch kha le." | Recharge before dinner |
| 🌙 19:30-21:30 | Dinner | "Raat ko halka kha." | Light meal |
| 🥛 22:00-23:30 | Bedtime | "Sone se pehle doodh le le." | Optional warm milk |

## 🚀 Usage

### Browser Notifications

```javascript
// Import the service
const NotificationService = require('./notification-service.js');
const service = new NotificationService();

// Initialize permissions
await service.initializePermissions();

// Load notifications
const notificationsData = require('./notifications.json');

// Schedule all notifications
notificationsData.notifications.forEach(meal => {
  service.scheduleNotification(meal.time, service.formatNotification(meal));
});
```

### Integrated with Frontend

Add to your `app.js` or main JavaScript file:

```javascript
import NotificationService from './notifications/notification-service.js';
import notificationsData from './notifications/notifications.json';

const notificationService = new NotificationService(notificationConfig);

// Initialize on app load
async function initializeNotifications() {
  await notificationService.initializePermissions();
  
  notificationsData.notifications.forEach(meal => {
    notificationService.scheduleNotification(
      meal.time,
      notificationService.formatNotification(meal)
    );
  });
}

initializeNotifications();
```

## ⚙️ Configuration Options

Edit `notification-config.js` to customize:

- **Timezone**: Set to your location
- **Notification Method**: 'browser', 'push', 'email', 'sms'
- **Sound/Vibration**: Enable/disable alerts
- **Snooze Duration**: Customize snooze time
- **User Preferences**: Daily reminders, dismissible options

## 🔧 Features

✅ 7 meal-time reminders daily  
✅ MUMMY's caring messages in Hindi/English  
✅ Food suggestions for each meal  
✅ Timezone support  
✅ Snooze functionality  
✅ Notification history logging  
✅ Browser notification API integration  

## 📱 Mobile Support

- Works on Android Chrome, Firefox
- Works on iOS Safari (partial support)
- Requires user permission for notifications
- Vibration support on compatible devices

## 🛠️ Integration Steps

1. Copy this `notifications/` folder to your project root
2. Import `notification-service.js` in your main app
3. Load `notifications.json` for meal data
4. Call `initializeNotifications()` on app startup
5. User grants notification permission when prompted

## 🔐 Permissions

Users must grant permission in their browser:
- Chrome/Edge: "Allow notifications" prompt
- Firefox: Settings → Permissions → Notifications
- Safari: Settings → Notifications

## 📊 Data Structure

Each notification contains:
- `id`: Unique identifier
- `title`: Meal name
- `time`: Start time (HH:MM)
- `endTime`: Duration window
- `category`: Meal category
- `message`: MUMMY's reminder in Hindi/English
- `purpose`: Why this meal matters
- `suggestions`: Food recommendations
- `icon`: Emoji representation

## 🎯 Future Enhancements

- [ ] Backend push notifications
- [ ] Email reminders
- [ ] SMS notifications
- [ ] Customizable meal suggestions per user
- [ ] Nutrition tracking
- [ ] Multi-language support
- [ ] User preferences storage
- [ ] Analytics dashboard

## 📝 Notes

- All times are in 24-hour format
- Timezone can be configured in notification-config.js
- Lunch is marked as MOST IMPORTANT
- Bedtime drink is optional

---

**Created for MUMMY Project** ❤️  
*Because a healthy routine starts with timely reminders!*
