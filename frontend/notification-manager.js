/**
 * Notification Manager
 * Handles notification UI and user interactions
 */

class NotificationManager {
  constructor() {
    this.notificationBell = document.getElementById('notificationBell');
    this.notificationDropdown = document.getElementById('notificationDropdown');
    this.notificationList = document.getElementById('notificationList');
    this.closeDropdownBtn = document.getElementById('closeNotificationDropdown');
    this.clearNotificationsBtn = document.getElementById('clearNotificationsBtn');

    this.notifications = [];
    this.initializeEventListeners();
  }

  /**
   * Initialize event listeners
   */
  initializeEventListeners() {
    if (this.notificationBell) {
      this.notificationBell.addEventListener('click', () => this.toggleDropdown());
    }

    if (this.closeDropdownBtn) {
      this.closeDropdownBtn.addEventListener('click', () => this.closeDropdown());
    }

    if (this.clearNotificationsBtn) {
      this.clearNotificationsBtn.addEventListener('click', () => this.clearAllNotifications());
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (
        this.notificationDropdown &&
        !this.notificationDropdown.contains(e.target) &&
        !this.notificationBell.contains(e.target)
      ) {
        this.closeDropdown();
      }
    });
  }

  /**
   * Toggle notification dropdown visibility
   */
  toggleDropdown() {
    if (!this.notificationDropdown.classList.contains('active')) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  /**
   * Open notification dropdown
   */
  openDropdown() {
    if (this.notificationDropdown) {
      this.notificationDropdown.classList.add('active');
      this.notificationDropdown.style.display = 'block';
      this.notificationBell.classList.add('active');
    }
  }

  /**
   * Close notification dropdown
   */
  closeDropdown() {
    if (this.notificationDropdown) {
      this.notificationDropdown.classList.remove('active');
      setTimeout(() => {
        this.notificationDropdown.style.display = 'none';
      }, 300);
      this.notificationBell.classList.remove('active');
    }
  }

  /**
   * Add a notification to the display
   * @param {Object} notificationData - Notification details
   */
  addNotification(notificationData) {
    const { title, message, icon, suggestions, timestamp } = notificationData;

    const notification = {
      id: Date.now(),
      title,
      message,
      icon,
      suggestions: suggestions || [],
      timestamp: timestamp || new Date().toLocaleTimeString()
    };

    this.notifications.unshift(notification);

    // Update UI
    this.renderNotifications();

    // Show a brief visual indicator on the bell
    this.showNotificationIndicator();

    // Auto-open the notification popup
    this.openDropdown();

    // Auto-close after 5 seconds
    setTimeout(() => {
      this.closeDropdown();
    }, 5000);
  }

  /**
   * Render all notifications in the dropdown
   */
  renderNotifications() {
    if (!this.notificationList) return;

    if (this.notifications.length === 0) {
      this.notificationList.innerHTML = '<p class="empty-message">No notifications yet</p>';
      return;
    }

    this.notificationList.innerHTML = this.notifications
      .map(
        (notif) =>
          `
      <div class="notification-item" data-id="${notif.id}">
        <div class="notification-icon">${notif.icon}</div>
        <div class="notification-content">
          <div class="notification-title">${notif.title}</div>
          <div class="notification-message">${notif.message}</div>
          ${
            notif.suggestions.length > 0
              ? `<div class="notification-suggestions">💡 ${notif.suggestions.slice(0, 2).join(', ')}</div>`
              : ''
          }
          <div class="notification-time">${notif.timestamp}</div>
        </div>
        <button class="notification-close" data-id="${notif.id}">×</button>
      </div>
    `
      )
      .join('');

    // Add close button listeners
    this.notificationList.querySelectorAll('.notification-close').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeNotification(parseInt(btn.dataset.id));
      });
    });
  }

  /**
   * Remove a notification
   * @param {number} id - Notification ID
   */
  removeNotification(id) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.renderNotifications();
    this.showNotificationIndicator(); // Update badge count
  }

  /**
   * Clear all notifications
   */
  clearAllNotifications() {
    this.notifications = [];
    this.renderNotifications();
    this.showNotificationIndicator(); // Update badge count
  }

  /**
   * Show a brief visual indicator on the bell
   */
  showNotificationIndicator() {
    if (!this.notificationBell) return;

    // Add notification badge
    let badge = this.notificationBell.querySelector('.notification-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'notification-badge';
      this.notificationBell.appendChild(badge);
    }

    badge.textContent = this.notifications.length;
    badge.style.display = this.notifications.length > 0 ? 'block' : 'none';
  }

  /**
   * Get all notifications
   */
  getNotifications() {
    return this.notifications;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.notificationManager = new NotificationManager();
  console.log('✅ Notification Manager initialized');
});
