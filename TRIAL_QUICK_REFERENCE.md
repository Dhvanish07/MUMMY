# Trial System - Quick Reference

## What's New?

### Before (Fixed 7-Days)
```
User registers → account_created_at stored → 7 days counted → Locked
```

### After (Customizable)
```
User registers → trial_end_date set → ANY duration → Locked when date passes
```

## API Endpoints

### 1. Register User with Custom Trial
**POST** `/backend/register_with_preferences.php`
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password",
  "trial_days": 14,
  "preferences": { "gender": "male", "foodPref": "veg", ... }
}
```

**Response includes:**
- `trial_end_date: "2026-02-23 14:30:45"`
- `trial_days: 14`
- `trial_days_remaining: 14`

### 2. Set/Update Trial End Date
**POST** `/backend/set-trial-date.php`

**Option A - By Days:**
```json
{
  "user_id": 1,
  "trial_days": 30
}
```

**Option B - By Date:**
```json
{
  "user_id": 1,
  "trial_end_date": "2026-03-21 14:30:45"
}
```

### 3. Check Trial Status
**POST** `/backend/check-trial.php`
```json
{
  "user_id": 1
}
```

**Response:**
```json
{
  "trial_end_date": "2026-02-23 14:30:45",
  "days_remaining": 13.5,
  "hours_remaining": 324.5,
  "trial_expired": false,
  "status": "active"
}
```

## Frontend JavaScript

### Check Current Status
```javascript
TrialLock.checkTrialStatus();
```

### Set Trial Manually
```javascript
// 30 days from now
TrialLock.setTrialDays(30);

// Specific date
TrialLock.setTrialEndDate('2026-03-21 14:30:45');
```

### Update via API
```javascript
TrialLock.updateTrialViaAPI(userId, 60);  // 60-day trial
```

## Testing

### Test Trial Expiration Instantly
```javascript
// In browser console (F12):
const yesterday = new Date(Date.now() - 86400000);
localStorage.setItem('mummy_trial_end_date', yesterday.toISOString().slice(0, 19).replace('T', ' '));
location.reload();
```

### Test Trial Extended
```javascript
// In browser console:
const next30Days = new Date(Date.now() + 30 * 86400000);
localStorage.setItem('mummy_trial_end_date', next30Days.toISOString().slice(0, 19).replace('T', ' '));
location.reload();
```

## Database

### Schema
```sql
ALTER TABLE users ADD COLUMN trial_end_date DATETIME DEFAULT NULL;
```

### Example Data
```sql
SELECT user_id, email, trial_end_date, 
       DATEDIFF(trial_end_date, NOW()) as days_remaining
FROM users;
```

### Extend All Active Trials by 7 Days
```sql
UPDATE users 
SET trial_end_date = DATE_ADD(trial_end_date, INTERVAL 7 DAY)
WHERE trial_end_date > NOW();
```

## Common Tasks

### Register User with 30-Day Trial
```bash
curl -X POST http://localhost/mummy/backend/register_with_preferences.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "pass123",
    "trial_days": 30,
    "preferences": {"gender": "male"}
  }'
```

### Give User 60-Day Trial
```bash
curl -X POST http://localhost/mummy/backend/set-trial-date.php \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "trial_days": 60}'
```

### Expire Trial Immediately
```bash
curl -X POST http://localhost/mummy/backend/set-trial-date.php \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "trial_end_date": "2026-02-08 00:00:00"}'
```

## LocalStorage Keys
- `mummy_trial_end_date` - When trial expires (format: `YYYY-MM-DD HH:MM:SS`)
- `mummy_account_created_at` - When account created
- `mummy_user_id` - User ID

## Debug Checklist

- [ ] Is `mummy_trial_end_date` set in localStorage?
- [ ] Is the date in correct format? (`YYYY-MM-DD HH:MM:SS`)
- [ ] Is server time synced with client?
- [ ] Does browser console show any errors?
- [ ] Did trial-lock.js load? (Check console for "🔐 TrialLock initialized")
- [ ] Is the overlay CSS loaded? (Check Styles in DevTools)

## Files Modified

1. **backend/config.php** - Schema + helpers
2. **backend/register_with_preferences.php** - Capture trial_end_date
3. **backend/set-trial-date.php** - NEW: Manage trial dates
4. **backend/check-trial.php** - Check trial status
5. **frontend/trial-lock.js** - UPDATED: New methods
6. **frontend/login.html** - Save trial_end_date
7. **frontend/index.html** - Already integrated
8. **frontend/packing.html** - Already integrated

## Status

✅ Database schema updated
✅ Backend endpoints ready
✅ Frontend integration complete
✅ Testing methods available
⏳ Awaiting user testing/commit
