/* ========================================
   TRIAL LOCK MANAGER - UPDATED
   Locks features after trial end date
   Uses trial_end_date from localStorage
   ======================================== */

const TrialLock = {
    CHECK_INTERVAL: 60000, // Check every 60 seconds
    isLocked: false,
    checkIntervalId: null,

    // Initialize trial lock system
    init: function() {
        console.log('🔐 TrialLock initialized');
        this.checkTrialStatus();
        this.checkIntervalId = setInterval(() => this.checkTrialStatus(), this.CHECK_INTERVAL);
        
        // Listen for storage changes (cross-tab updates)
        window.addEventListener('storage', (e) => {
            if (e.key === 'mummy_trial_end_date') {
                console.log('📱 Trial date updated from another tab');
                this.checkTrialStatus();
            }
        });
    },

    // Check if trial has expired using trial_end_date
    checkTrialStatus: function() {
        const trialEndDate = localStorage.getItem('mummy_trial_end_date');
        
        if (!trialEndDate) {
            console.log('⏰ No trial end date stored - trial inactive');
            this.unlockFeatures();
            return;
        }

        const endDate = new Date(trialEndDate);
        const now = new Date();
        const isExpired = now >= endDate;
        
        // Calculate time remaining
        const timeRemaining = endDate - now;
        const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60));
        
        console.log(`⏳ Trial Status: ${isExpired ? 'EXPIRED' : 'ACTIVE'} | Days Remaining: ${Math.max(0, daysRemaining)}`);
        
        if (isExpired) {
            console.log('❌ Trial period has expired');
            this.lockFeatures(daysRemaining);
        } else {
            console.log(`✅ Trial active - ${Math.max(0, daysRemaining)} days remaining`);
            this.unlockFeatures();
            
            // Show warning if less than 1 day remaining
            if (hoursRemaining <= 24 && hoursRemaining > 0) {
                this.showExpirationWarning(hoursRemaining);
            }
        }
    },

    // Lock features (show overlay, disable interactions)
    lockFeatures: function(daysRemaining = 0) {
        if (this.isLocked) return;
        
        console.log('🔒 Locking features...');
        this.isLocked = true;
        
        // Create overlay if doesn't exist
        if (!document.getElementById('trial-lock-overlay')) {
            this.createLockOverlay();
        }
        
        // Show overlay and message
        const overlay = document.getElementById('trial-lock-overlay');
        const message = document.getElementById('trial-lock-message');
        
        if (overlay && message) {
            overlay.style.display = 'flex';
            message.style.display = 'block';
            
            // Update message with time info
            const expiredText = document.querySelector('.trial-expired-text');
            if (expiredText) {
                if (daysRemaining < 0) {
                    expiredText.textContent = `Your trial expired ${Math.abs(Math.floor(daysRemaining))} days ago`;
                } else {
                    expiredText.textContent = 'Your trial has expired!';
                }
            }
        }
        
        this.disableInteractions();
    },

    // Unlock features (remove overlay, enable interactions)
    unlockFeatures: function() {
        if (!this.isLocked) return;
        
        console.log('🔓 Unlocking features...');
        this.isLocked = false;
        
        const overlay = document.getElementById('trial-lock-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
        
        this.enableInteractions();
    },

    // Disable all interactive elements
    disableInteractions: function() {
        console.log('🚫 Disabling interactions...');
        
        // Disable all buttons
        document.querySelectorAll('button').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });
        
        // Disable all inputs
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.disabled = true;
            input.style.opacity = '0.5';
            input.style.cursor = 'not-allowed';
        });
        
        // Disable links (except upgrade link)
        document.querySelectorAll('a:not(.trial-upgrade-btn)').forEach(link => {
            link.style.pointerEvents = 'none';
            link.style.opacity = '0.5';
        });
    },

    // Enable all interactive elements
    enableInteractions: function() {
        console.log('✅ Enabling interactions...');
        
        document.querySelectorAll('button').forEach(btn => {
            if (!btn.hasAttribute('data-trial-locked')) {
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
        });
        
        document.querySelectorAll('input, textarea, select').forEach(input => {
            if (!input.hasAttribute('data-trial-locked')) {
                input.disabled = false;
                input.style.opacity = '1';
                input.style.cursor = 'auto';
            }
        });
        
        document.querySelectorAll('a').forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.opacity = '1';
        });
    },

    // Create lock overlay and message
    createLockOverlay: function() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'trial-lock-overlay';
        overlay.className = 'trial-lock-overlay';
        
        // Create message container
        const message = document.createElement('div');
        message.id = 'trial-lock-message';
        message.className = 'trial-lock-message';
        
        message.innerHTML = `
            <div class="trial-lock-emoji">🔐</div>
            <h2>Trial Period Ended</h2>
            <p class="trial-expired-text">Your trial has expired!</p>
            <p class="trial-description">Upgrade to continue using all features</p>
            <button class="trial-upgrade-btn" onclick="location.href='/mummy/upgrade.html'">
                Upgrade Now
            </button>
            <p class="trial-small-text">Need more time? Contact support</p>
        `;
        
        overlay.appendChild(message);
        document.body.appendChild(overlay);
    },

    // Show warning when trial is expiring soon
    showExpirationWarning: function(hoursRemaining) {
        if (document.getElementById('trial-expiration-notice')) return;
        
        const notice = document.createElement('div');
        notice.id = 'trial-expiration-notice';
        notice.className = 'trial-lock-notice';
        notice.innerHTML = `
            ⏰ Your trial expires in <strong>${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''}</strong>. 
            <a href="#upgrade" style="color: #d97706; font-weight: bold;">Upgrade now</a>
        `;
        
        document.body.insertBefore(notice, document.body.firstChild);
        console.log(`⚠️ Trial expiring soon: ${hoursRemaining} hours`);
    },

    // Update trial end date from server response or manual input
    setTrialEndDate: function(trialEndDate) {
        localStorage.setItem('mummy_trial_end_date', trialEndDate);
        console.log('📅 Trial end date set to:', trialEndDate);
        this.checkTrialStatus();
    },

    // Update trial by number of days from now
    setTrialDays: function(days) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + days);
        const formattedDate = endDate.toISOString().slice(0, 19).replace('T', ' ');
        this.setTrialEndDate(formattedDate);
        console.log(`📅 Trial set for ${days} days from now`);
    },

    // Update trial via API endpoint
    updateTrialViaAPI: function(userId, trialDays) {
        fetch('/mummy/backend/set-trial-date.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userId,
                trial_days: trialDays
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log('✅ Trial updated via API:', data.trial_end_date);
                this.setTrialEndDate(data.trial_end_date);
            } else {
                console.error('❌ Failed to update trial:', data.error);
            }
        })
        .catch(err => console.error('API Error:', err));
    }
};

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        TrialLock.init();
    });
} else {
    TrialLock.init();
}
