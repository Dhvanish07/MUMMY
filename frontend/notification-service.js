/**
 * Notification Service
 * Handles sending meal-time notifications
 */

class NotificationService {
  constructor(config = {}) {
    this.config = config;
    this.notifications = [];
    this.activeNotifications = new Map();
    this.notificationHistory = []; // Track all sent notifications
    this.initializePermissions();
  }

  /**
   * Initialize browser notification permissions
   */
  async initializePermissions() {
    if (!("Notification" in window)) {
      console.warn("Browser does not support notifications");
      return;
    }

    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
  }

  /**
   * Send a notification
   * @param {Object} notificationData - Notification details
   */
  sendNotification(notificationData) {
    const {
      title = "MUMMY Reminder",
      message = "",
      icon = "",
      tag = "meal-reminder"
    } = notificationData;

    // Add to history
    const historyEntry = {
      timestamp: new Date(),
      title: title,
      message: message,
      icon: icon,
      read: false
    };
    this.notificationHistory.push(historyEntry);

    // Trigger custom event with history update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('notificationSent', { detail: historyEntry }));
    }

    if (Notification.permission === "granted") {
      const notification = new Notification(title, {
        body: message,
        icon: icon,
        tag: tag,
        requireInteraction: true
      });

      // Handle notification click
      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return notification;
    }
  }

  /**
   * Get notification history for today
   */
  getTodayNotifications() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.notificationHistory.filter(notification => {
      const notificationDate = new Date(notification.timestamp);
      notificationDate.setHours(0, 0, 0, 0);
      return notificationDate.getTime() === today.getTime();
    });
  }

  /**
   * Clear all notification history for today
   */
  clearTodayNotifications() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    this.notificationHistory = this.notificationHistory.filter(notification => {
      const notificationDate = new Date(notification.timestamp);
      notificationDate.setHours(0, 0, 0, 0);
      return notificationDate.getTime() !== today.getTime();
    });
  }

  /**
   * Schedule a notification at a specific time
   * @param {string} time - Time in HH:MM format
   * @param {Object} notificationData - Notification details
   */
  scheduleNotification(time, notificationData) {
    const [hours, minutes] = time.split(":").map(Number);
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    // If time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const delayMs = scheduledTime - now;
    const timeoutId = setTimeout(() => {
      this.sendNotification(notificationData);
    }, delayMs);

    this.activeNotifications.set(notificationData.tag, timeoutId);
    return timeoutId;
  }

  /**
   * Cancel a scheduled notification
   * @param {string} tag - Notification tag
   */
  cancelNotification(tag) {
    if (this.activeNotifications.has(tag)) {
      clearTimeout(this.activeNotifications.get(tag));
      this.activeNotifications.delete(tag);
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  cancelAllNotifications() {
    this.activeNotifications.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    this.activeNotifications.clear();
  }

  /**
   * Format notification message with emoji and text
   * @param {Object} mealData - Meal notification data
   */
  formatNotification(mealData) {
    return {
      title: `${mealData.icon} ${mealData.title}`,
      message: mealData.message,
      icon: mealData.icon,
      tag: mealData.category,
      purpose: mealData.purpose,
      suggestions: mealData.suggestions
    };
  }

  /**
   * Log notification history
   * @param {Object} notificationData - Notification details
   */
  logNotification(notificationData) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...notificationData
    };
    this.notifications.push(logEntry);
    return logEntry;
  }

  /**
   * Test helper - Send a test notification
   * @param {string} message - Custom message for testing
   */
  sendTestNotification(message = "This is a test notification") {
    return this.sendNotification({
      title: "🧪 Test Notification",
      message: message,
      icon: "🔔",
      tag: "test-notification"
    });
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NotificationService;
}
