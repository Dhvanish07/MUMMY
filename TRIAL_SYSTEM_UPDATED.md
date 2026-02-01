# 7-Day Trial System - Updated with Customizable Duration

## Overview
The trial system now allows **customizable trial durations** using `trial_end_date` instead of fixed 7-day calculations. This gives you flexibility to set different trial lengths per user or change them anytime.

## Key Changes

### 1. Database Schema Update
```sql
ALTER TABLE users ADD COLUMN trial_end_date DATETIME DEFAULT NULL;
```

**Field Details:**
- `trial_end_date` - DATETIME field storing when trial expires
- `account_created_at` - Kept for reference (not used for calculations)
- Format: `YYYY-MM-DD HH:MM:SS`

### 2. New Helper Functions (config.php)

```php
// Check if trial expired using trial_end_date
function isTrialExpired($trialEndDate) {
    if (!$trialEndDate) return false;
    return time() >= strtotime($trialEndDate);
}

// Get days remaining
function getDaysRemaining($trialEndDate) {
    if (!$trialEndDate) return 7;
    $secondsRemaining = strtotime($trialEndDate) - time();
    return max(0, round($secondsRemaining / (24 * 60 * 60), 1));
}

// Calculate trial end date (default 7 days from now)
function calculateTrialEndDate($daysFromNow = 7) {
    $endDate = new DateTime();
    $endDate->add(new DateInterval('P' . $daysFromNow . 'D'));
    return $endDate->format('Y-m-d H:i:s');
}
```

### 3. Registration API Enhancement

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "trial_days": 14,  // Optional, defaults to 7
  "preferences": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "user_id": 1,
  "trial_end_date": "2026-02-23 14:30:45",
  "trial_days": 14,
  "trial_days_remaining": 14,
  "account_created_at": "2026-02-09 14:30:45"
}
```

### 4. New API Endpoint: Set Trial Date

**File:** `/backend/set-trial-date.php`

**Purpose:** Update/extend trial for existing users

**Request:**
```json
{
  "user_id": 1,
  "trial_days": 30  // Option 1: Calculate from days
}
```

OR

```json
{
  "user_id": 1,
  "trial_end_date": "2026-03-21 14:30:45"  // Option 2: Direct date
}
```

**Response:**
```json
{
  "success": true,
  "trial_end_date": "2026-03-21 14:30:45",
  "days_remaining": 40.5,
  "trial_expired": false,
  "status": "active"
}
```

### 5. Updated Trial Lock System (frontend)

**Key Methods:**

#### `TrialLock.setTrialEndDate(dateString)`
Set trial end date directly:
```javascript
TrialLock.setTrialEndDate('2026-03-09 12:00:00');
```

#### `TrialLock.setTrialDays(days)`
Set trial for N days from now:
```javascript
TrialLock.setTrialDays(30);  // 30-day trial
```

#### `TrialLock.updateTrialViaAPI(userId, trialDays)`
Update via backend:
```javascript
TrialLock.updateTrialViaAPI(1, 60);  // 60-day trial for user 1
```

### 6. LocalStorage Keys

| Key | Value | Example |
|-----|-------|---------|
| `mummy_trial_end_date` | Trial expiration datetime | `2026-02-23 14:30:45` |
| `mummy_account_created_at` | Registration timestamp | `2026-02-09 14:30:45` |
| `mummy_user_id` | User ID | `1` |

## Usage Examples

### Example 1: Register with Custom Trial Duration
```javascript
const registerData = {
  name: "Jane Smith",
  email: "jane@example.com",
  password: "pass123",
  trial_days: 30,  // 30-day trial instead of 7
  preferences: { ... }
};
```

### Example 2: Extend Existing User's Trial
```javascript
// Via API
fetch('/mummy/backend/set-trial-date.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_id: 5,
    trial_days: 60  // Extend to 60 days
  })
})
.then(res => res.json())
.then(data => console.log('Trial extended:', data.trial_end_date));
```

### Example 3: Test Trial Expiration
```javascript
// Console command to instantly expire trial
const yesterday = new Date(Date.now() - (24 * 60 * 60 * 1000));
localStorage.setItem('mummy_trial_end_date', yesterday.toISOString().slice(0, 19).replace('T', ' '));
location.reload();
```

## Features

✅ **Flexible Trial Durations** - Set any duration per user
✅ **Extend/Modify** - Update trial end date anytime
✅ **Automatic Locking** - Features lock when trial expires
✅ **Countdown Warnings** - Alert when <24 hours remaining
✅ **Server-Side Validation** - Date checked on both frontend and backend
✅ **Cross-Tab Sync** - Changes sync across browser tabs
✅ **Persistent** - Survives browser restart via localStorage

## File Changes Summary

| File | Change | Status |
|------|--------|--------|
| `backend/config.php` | Added trial_end_date schema + helper functions | ✅ Updated |
| `backend/register_with_preferences.php` | Capture trial_end_date on registration | ✅ Updated |
| `backend/set-trial-date.php` | New endpoint to set/modify trial | ✅ Created |
| `backend/check-trial.php` | Updated to use trial_end_date | ✅ Updated |
| `frontend/trial-lock.js` | New methods for trial management | ✅ Updated |
| `frontend/login.html` | Save trial_end_date to localStorage | ✅ Updated |
| `frontend/index.html` | Trial lock integration | ✅ Ready |
| `frontend/packing.html` | Trial lock integration | ✅ Ready |

## Migration from Fixed 7-Day System

If upgrading from the old system:

1. **Database:** Run `ALTER TABLE users ADD COLUMN trial_end_date DATETIME DEFAULT NULL;`
2. **Backfill:** Set trial_end_date for existing users:
   ```sql
   UPDATE users 
   SET trial_end_date = DATE_ADD(account_created_at, INTERVAL 7 DAY)
   WHERE trial_end_date IS NULL;
   ```
3. **Frontend:** Update trial-lock.js (already done)
4. **Backend:** Update PHP files (already done)

## Troubleshooting

**Trial not locking after expiration?**
- Check browser console for errors
- Verify `mummy_trial_end_date` is set in localStorage
- Ensure time is synced correctly (server vs client)

**"No trial end date stored" message?**
- User needs to register or re-login
- Trial-lock.js checks localStorage on init

**API returns "Invalid date format"?**
- Use format: `YYYY-MM-DD HH:MM:SS`
- Example: `2026-02-23 14:30:45`
