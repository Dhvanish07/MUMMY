# Quick Test Guide - 7-Day Trial Lock System

## 🚀 Quick Start Test

### Test 1: Register and Verify Trial Started (5 minutes)

1. Go to `http://localhost/mummy/frontend/login.html`
2. Click "Create New Account"
3. Fill in the form:
   - **Email:** test@example.com
   - **Password:** test123
   - **Name:** John Doe
   - **Gender:** Male
   - Select preferences normally
4. Click "Register"
5. Should see: "Registration successful! Welcome John Doe\n\n7-day free trial activated!"
6. Check browser console (F12):
   ```
   ✅ SUCCESS
   ```
7. Go to recipes page - should work normally ✅

### Test 2: Verify Account Created Timestamp Saved (5 minutes)

1. Open browser console (F12)
2. Type:
   ```javascript
   console.log(localStorage.getItem('mummy_account_created_at'));
   ```
3. Should see current timestamp like:
   ```
   "2026-02-09 14:30:45"
   ```

### Test 3: Simulate 7+ Days Expiration (5 minutes - INSTANT)

**This is the quickest way to test!**

1. Open browser console (F12)
2. Paste this code to simulate 8 days passed:
   ```javascript
   // Set account creation to 8 days ago
   const eightDaysAgo = new Date(Date.now() - (8 * 24 * 60 * 60 * 1000));
   localStorage.setItem('mummy_account_created_at', eightDaysAgo.toISOString());
   
   // Reload page
   location.reload();
   ```
3. Page reloads
4. Should immediately see:
   - Blur overlay over entire screen
   - Lock message: "🔒 Trial Period Expired"
   - "Your 7-day free trial has ended."
   - "Upgrade to continue using premium features."
   - **Buttons disabled** ✅
   - **Inputs disabled** ✅
   - All features locked 🔒

### Test 4: Verify Lock Overlay Details (2 minutes)

When trial is locked, you should see:
- [ ] Blur effect on background
- [ ] Lock modal in center
- [ ] Lock emoji (🔒)
- [ ] "Trial Period Expired" heading
- [ ] Message text
- [ ] "Upgrade Now" button
- [ ] All page buttons disabled (greyed out, 50% opacity)
- [ ] All page inputs disabled

### Test 5: Verify Days Counter Updates (Optional)

1. Open console
2. Watch these logs every 60 seconds:
   ```
   TrialLock: Days passed: 3.5, Expired: false
   ```
3. Check if it updates correctly

## 🧪 Testing Checklist

### Registration
- [ ] Can register new account
- [ ] Account created timestamp saved
- [ ] localStorage has `mummy_account_created_at`
- [ ] Welcome message includes "7-day free trial activated!"

### Trial Active (Days 1-6)
- [ ] Page loads normally
- [ ] No overlay visible
- [ ] All buttons work
- [ ] All inputs work
- [ ] Recipe generation works
- [ ] Packing generation works

### Trial Expired (Day 7+)
- [ ] Overlay appears
- [ ] Lock message visible
- [ ] All buttons disabled
- [ ] All inputs disabled
- [ ] Recipe button doesn't work
- [ ] Packing button doesn't work
- [ ] "Upgrade Now" button visible

### Persistence
- [ ] Close browser
- [ ] Reopen browser
- [ ] Trial status persists
- [ ] Lock status (if expired) persists

## 🔧 Troubleshooting

### Overlay Not Appearing
**Solution:**
1. Check console for errors (F12)
2. Verify `trial-lock.js` loaded
3. Check localStorage timestamp: `localStorage.getItem('mummy_account_created_at')`
4. Manually set to 8 days ago and reload

### Features Not Locked
**Solution:**
1. Console should show: `TrialLock: Days passed: X, Expired: true`
2. If not showing, refresh page
3. Check if `TrialLock.lockFeatures()` was called
4. Verify CSS file loaded: `trial-lock.css`

### Wrong Days Calculation
**Solution:**
1. Check if timestamp format is correct: `YYYY-MM-DD HH:MM:SS`
2. Verify timezone is correct
3. Calculate manually: current date - account created date
4. Should be >= 7 days to expire

### Buttons Still Work When Locked
**Solution:**
1. Verify `disableInteractions()` ran
2. Check if CSS opacity applied (should be 0.5)
3. Check if cursor changed to `not-allowed`
4. Try clicking - should be disabled at JS level too

## 📊 Expected Behavior by Day

| Day | Status | Overlay | Buttons | Inputs | Features |
|-----|--------|---------|---------|--------|----------|
| 1 | Active | No | Enabled | Enabled | Works ✅ |
| 2 | Active | No | Enabled | Enabled | Works ✅ |
| 3 | Active | No | Enabled | Enabled | Works ✅ |
| 4 | Active | No | Enabled | Enabled | Works ✅ |
| 5 | Active | No | Enabled | Enabled | Works ✅ |
| 6 | Active | No | Enabled | Enabled | Works ✅ |
| 7 | **Expired** | **Yes** | **Disabled** | **Disabled** | **Locked** 🔒 |
| 8+ | **Expired** | **Yes** | **Disabled** | **Disabled** | **Locked** 🔒 |

## 📝 Test Results Template

```
Test 1 - Registration: [ ] PASS [ ] FAIL
Test 2 - Timestamp Saved: [ ] PASS [ ] FAIL
Test 3 - Simulate Expiration: [ ] PASS [ ] FAIL
Test 4 - Lock Overlay: [ ] PASS [ ] FAIL
Test 5 - Days Counter: [ ] PASS [ ] FAIL

Overall: [ ] ALL PASS [ ] SOME FAIL [ ] ALL FAIL

Issues Found:
- 
- 
- 
```

## 🎯 Success Criteria

✅ System is working if:
1. New user gets 7-day trial on registration
2. Trial status tracked via localStorage
3. After 7 days, overlay appears
4. Features locked with blur + disabled buttons
5. Lock persists after page refresh
6. Console shows no errors

---

**Ready to test!** Follow these steps and let me know if everything works. I haven't committed anything yet, so we can make changes if needed.
