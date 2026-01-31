-- =============================================
-- MUMMY APP - USER PREFERENCES TABLE
-- Database Schema Update
-- =============================================

-- OPTION 1: ADD COLUMNS TO EXISTING USERS TABLE
-- Run this if you already have a users table

ALTER TABLE users ADD COLUMN food_preference VARCHAR(50);
-- Values: 'veg', 'eggitarian', 'nonveg'

ALTER TABLE users ADD COLUMN cooking_frequency VARCHAR(50);
-- Values: 'roz', 'kabhikabhi', 'bahutKam'

ALTER TABLE users ADD COLUMN spice_level VARCHAR(50);
-- Values: 'kam', 'medium', 'teekha'

ALTER TABLE users ADD COLUMN cooking_time_preference VARCHAR(50);
-- Values: '10-15min', '20-30min', 'aramSe'

ALTER TABLE users ADD COLUMN late_night_hunger VARCHAR(50);
-- Values: 'haan', 'kabhikabhi', 'nahi'

ALTER TABLE users ADD COLUMN outside_food_frequency VARCHAR(50);
-- Values: 'roz', 'weekends', 'kabhikabhi'

ALTER TABLE users ADD COLUMN mummy_reminders VARCHAR(50);
-- Values: 'haan', 'kabhikabhi', 'nahi'

ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- =============================================
-- OPTION 2: CREATE NEW USER PREFERENCES TABLE
-- Run this if you want to keep preferences separate

CREATE TABLE IF NOT EXISTS user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    food_preference VARCHAR(50),
    -- Possible values: 'veg', 'eggitarian', 'nonveg'
    
    cooking_frequency VARCHAR(50),
    -- Possible values: 'roz', 'kabhikabhi', 'bahutKam'
    
    spice_level VARCHAR(50),
    -- Possible values: 'kam', 'medium', 'teekha'
    
    cooking_time_preference VARCHAR(50),
    -- Possible values: '10-15min', '20-30min', 'aramSe'
    
    late_night_hunger VARCHAR(50),
    -- Possible values: 'haan', 'kabhikabhi', 'nahi'
    
    outside_food_frequency VARCHAR(50),
    -- Possible values: 'roz', 'weekends', 'kabhikabhi'
    
    mummy_reminders VARCHAR(50),
    -- Possible values: 'haan', 'kabhikabhi', 'nahi'
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_prefs (user_id)
);

-- =============================================
-- SAMPLE DATA (for testing)

-- If using OPTION 1 (columns in users table):
UPDATE users 
SET 
    food_preference = 'nonveg',
    cooking_frequency = 'roz',
    spice_level = 'teekha',
    cooking_time_preference = '20-30min',
    late_night_hunger = 'haan',
    outside_food_frequency = 'weekends',
    mummy_reminders = 'haan'
WHERE id = 1;

-- If using OPTION 2 (separate preferences table):

-- User 1: Non-veg, daily cooking, high spice
INSERT INTO user_preferences (
    user_id,
    food_preference,
    cooking_frequency,
    spice_level,
    cooking_time_preference,
    late_night_hunger,
    outside_food_frequency,
    mummy_reminders
) VALUES (
    1,
    'nonveg',
    'roz',
    'teekha',
    '20-30min',
    'haan',
    'weekends',
    'haan'
);

-- User 2: Vegetarian, sometimes cooks, medium spice
INSERT INTO user_preferences (
    user_id,
    food_preference,
    cooking_frequency,
    spice_level,
    cooking_time_preference,
    late_night_hunger,
    outside_food_frequency,
    mummy_reminders
) VALUES (
    2,
    'veg',
    'kabhikabhi',
    'medium',
    '10-15min',
    'kabhikabhi',
    'roz',
    'kabhikabhi'
);

-- User 3: Eggitarian, rarely cooks, low spice
INSERT INTO user_preferences (
    user_id,
    food_preference,
    cooking_frequency,
    spice_level,
    cooking_time_preference,
    late_night_hunger,
    outside_food_frequency,
    mummy_reminders
) VALUES (
    3,
    'eggitarian',
    'bahutKam',
    'kam',
    'aramSe',
    'nahi',
    'kabhikabhi',
    'nahi'
);

-- User 4: Non-veg, sometimes cooks, low spice
INSERT INTO user_preferences (
    user_id,
    food_preference,
    cooking_frequency,
    spice_level,
    cooking_time_preference,
    late_night_hunger,
    outside_food_frequency,
    mummy_reminders
) VALUES (
    4,
    'nonveg',
    'kabhikabhi',
    'kam',
    '20-30min',
    'nahi',
    'weekends',
    'haan'
);

-- User 5: Vegetarian, daily cooking, high spice
INSERT INTO user_preferences (
    user_id,
    food_preference,
    cooking_frequency,
    spice_level,
    cooking_time_preference,
    late_night_hunger,
    outside_food_frequency,
    mummy_reminders
) VALUES (
    5,
    'veg',
    'roz',
    'teekha',
    '10-15min',
    'haan',
    'roz',
    'kabhikabhi'
);

-- =============================================
-- QUERIES TO RETRIEVE PREFERENCES

-- Get all preferences for a user (OPTION 1):
SELECT 
    id,
    name,
    email,
    food_preference,
    cooking_frequency,
    spice_level,
    cooking_time_preference,
    late_night_hunger,
    outside_food_frequency,
    mummy_reminders
FROM users
WHERE id = ?;

-- Get all preferences for a user (OPTION 2):
SELECT 
    up.food_preference,
    up.cooking_frequency,
    up.spice_level,
    up.cooking_time_preference,
    up.late_night_hunger,
    up.outside_food_frequency,
    up.mummy_reminders
FROM user_preferences up
JOIN users u ON up.user_id = u.id
WHERE u.id = ?;

-- =============================================
-- UPDATING PREFERENCES

-- Update preferences (OPTION 1):
UPDATE users 
SET 
    food_preference = ?,
    cooking_frequency = ?,
    spice_level = ?,
    cooking_time_preference = ?,
    late_night_hunger = ?,
    outside_food_frequency = ?,
    mummy_reminders = ?
WHERE id = ?;

-- Update preferences (OPTION 2):
UPDATE user_preferences 
SET 
    food_preference = ?,
    cooking_frequency = ?,
    spice_level = ?,
    cooking_time_preference = ?,
    late_night_hunger = ?,
    outside_food_frequency = ?,
    mummy_reminders = ?
WHERE user_id = ?;

-- =============================================
-- RECOMMENDATIONS

-- Choose OPTION 1 if:
-- - You have a small number of users
-- - You want simpler queries
-- - You're just starting out

-- Choose OPTION 2 if:
-- - You plan to scale
-- - You want to add more preference categories later
-- - You want to track preference history
