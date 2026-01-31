-- MUMMY APP - Sample User Data for Testing
-- Run these INSERT queries in your MySQL database

-- Sample User 1: Non-veg, daily cooking, high spice
INSERT INTO users (name, email, password, food_preference, cooking_frequency, spice_level, cooking_time_preference, late_night_hunger, outside_food_frequency, mummy_reminders) 
VALUES (
    'Arjun Singh',
    'arjun@example.com',
    '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86.sqbsnqlm', -- password: test123
    'nonveg',
    'roz',
    'teekha',
    '20-30min',
    'haan',
    'weekends',
    'haan'
);

-- Sample User 2: Vegetarian, sometimes cooks, medium spice
INSERT INTO users (name, email, password, food_preference, cooking_frequency, spice_level, cooking_time_preference, late_night_hunger, outside_food_frequency, mummy_reminders) 
VALUES (
    'Priya Sharma',
    'priya@example.com',
    '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86.sqbsnqlm', -- password: test123
    'veg',
    'kabhikabhi',
    'medium',
    '10-15min',
    'kabhikabhi',
    'roz',
    'kabhikabhi'
);

-- Sample User 3: Eggitarian, rarely cooks, low spice
INSERT INTO users (name, email, password, food_preference, cooking_frequency, spice_level, cooking_time_preference, late_night_hunger, outside_food_frequency, mummy_reminders) 
VALUES (
    'Rahul Patel',
    'rahul@example.com',
    '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86.sqbsnqlm', -- password: test123
    'eggitarian',
    'bahutKam',
    'kam',
    'aramSe',
    'nahi',
    'kabhikabhi',
    'nahi'
);

-- Sample User 4: Non-veg, sometimes cooks, low spice
INSERT INTO users (name, email, password, food_preference, cooking_frequency, spice_level, cooking_time_preference, late_night_hunger, outside_food_frequency, mummy_reminders) 
VALUES (
    'Neha Gupta',
    'neha@example.com',
    '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86.sqbsnqlm', -- password: test123
    'nonveg',
    'kabhikabhi',
    'kam',
    '20-30min',
    'nahi',
    'weekends',
    'haan'
);

-- Sample User 5: Vegetarian, daily cooking, high spice
INSERT INTO users (name, email, password, food_preference, cooking_frequency, spice_level, cooking_time_preference, late_night_hunger, outside_food_frequency, mummy_reminders) 
VALUES (
    'Aisha Khan',
    'aisha@example.com',
    '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86.sqbsnqlm', -- password: test123
    'veg',
    'roz',
    'teekha',
    '10-15min',
    'haan',
    'roz',
    'kabhikabhi'
);

-- Verify inserted data
SELECT COUNT(*) as total_users FROM users;
SELECT * FROM users;
