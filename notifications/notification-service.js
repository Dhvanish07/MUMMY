/**
 * Notification Service
 * Handles sending meal-time notifications
 */

class NotificationService {
  constructor(config = {}) {
    this.config = config;
    this.notifications = [];
    this.activeNotifications = new Map();
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
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NotificationService;
}
