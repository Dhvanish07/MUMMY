/**
 * Notification Bell UI
 * Manages the notification bell UI in the navbar
 */

class NotificationBellUI {
    constructor() {
        this.bellButton = document.getElementById('notificationBell');
        this.dropdown = document.getElementById('notificationDropdown');
        this.notificationList = document.getElementById('notificationList');
        this.notificationCount = document.getElementById('notificationCount');
        this.closeBtn = document.getElementById('closeNotificationDropdown');
        this.clearBtn = document.getElementById('clearNotificationsBtn');
        this.notificationService = null;
        
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Open/close dropdown
        if (this.bellButton) {
            this.bellButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown();
            });
        }

        // Close dropdown
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeDropdown();
            });
        }

        // Clear all notifications
        if (this.clearBtn) {
            this.clearBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.clearAllNotifications();
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-info')) {
                this.closeDropdown();
            }
        });

        // Listen for new notifications
        window.addEventListener('notificationSent', (e) => {
            this.addNotificationToList(e.detail);
            this.updateBadge();
        });
    }

    setNotificationService(service) {
        this.notificationService = service;
        this.loadNotifications();
    }

    toggleDropdown() {
        if (this.dropdown.style.display === 'none' || !this.dropdown.style.display) {
            this.openDropdown();
        } else {
            this.closeDropdown();
        }
    }

    openDropdown() {
        this.dropdown.style.display = 'flex';
        this.loadNotifications();
    }

    closeDropdown() {
        this.dropdown.style.display = 'none';
    }

    loadNotifications() {
        if (!this.notificationService) return;

        const notifications = this.notificationService.getTodayNotifications();
        this.renderNotifications(notifications);
        this.updateBadge();
    }

    renderNotifications(notifications) {
        if (!notifications || notifications.length === 0) {
            this.notificationList.innerHTML = '<p class="empty-message">No notifications yet</p>';
            return;
        }

        this.notificationList.innerHTML = notifications.map((notif, index) => {
            const time = new Date(notif.timestamp).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            return `
                <div class="notification-item">
                    <div class="notification-item-time">${time}</div>
                    <div class="notification-item-title">${notif.icon} ${notif.title.replace(/^[🌄☀️🍎🍽️☕🌙🥛]+ /, '')}</div>
                    <div class="notification-item-message">${notif.message}</div>
                </div>
            `;
        }).join('');
    }

    addNotificationToList(notification) {
        // Remove empty message if exists
        const emptyMsg = this.notificationList.querySelector('.empty-message');
        if (emptyMsg) {
            emptyMsg.remove();
        }

        const time = new Date(notification.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const itemHTML = `
            <div class="notification-item">
                <div class="notification-item-time">${time}</div>
                <div class="notification-item-title">${notification.icon} ${notification.title.replace(/^[🌄☀️🍎🍽️☕🌙🥛]+ /, '')}</div>
                <div class="notification-item-message">${notification.message}</div>
            </div>
        `;

        // Prepend new notification to list
        this.notificationList.insertAdjacentHTML('afterbegin', itemHTML);
    }

    updateBadge() {
        if (!this.notificationService) return;

        const notifications = this.notificationService.getTodayNotifications();
        const count = notifications.length;

        if (count > 0) {
            this.notificationCount.textContent = count;
            this.notificationCount.style.display = 'flex';
        } else {
            this.notificationCount.style.display = 'none';
        }
    }

    clearAllNotifications() {
        if (!this.notificationService) return;

        if (confirm('Are you sure you want to clear all notifications?')) {
            this.notificationService.clearTodayNotifications();
            this.notificationList.innerHTML = '<p class="empty-message">No notifications yet</p>';
            this.updateBadge();
        }
    }
}

// Initialize when DOM is ready
let notificationBellUI = null;
document.addEventListener('DOMContentLoaded', () => {
    notificationBellUI = new NotificationBellUI();
});
