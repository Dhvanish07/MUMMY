-- ========================================
-- MUMMY DATABASE QUERIES
-- Quick Reference for Common Operations
-- ========================================

-- ========================================
-- SETUP QUERIES (Run First)
-- ========================================

CREATE DATABASE IF NOT EXISTS mummy_db;
USE mummy_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_name VARCHAR(200) NOT NULL,
    ingredients VARCHAR(1000) NOT NULL,
    instructions LONGTEXT NOT NULL,
    tips LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    health_status VARCHAR(50),
    favorite_ingredients VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    emoji VARCHAR(10),
    INDEX idx_category (category)
);

-- ========================================
-- INSERT QUERIES (Ingredients)
-- ========================================

INSERT IGNORE INTO ingredients (name, category, emoji) VALUES
('Aloo (Potato)', 'vegetables', '🥔'),
('Pyaaz (Onion)', 'vegetables', '🧅'),
('Tamatar (Tomato)', 'vegetables', '🍅'),
('Gaajar (Carrot)', 'vegetables', '🥕'),
('Patta Gobhi (Cabbage)', 'vegetables', '🥬'),
('Bhindi (Okra)', 'vegetables', '🫘'),
('Shimla Mirch (Bell Pepper)', 'vegetables', '🫑'),
('Kheera (Cucumber)', 'vegetables', '🥒'),
('Broccoli', 'vegetables', '🥦'),
('Spinach', 'vegetables', '🌱'),
('Baingan (Eggplant)', 'vegetables', '🍆'),
('Corn', 'vegetables', '🌽'),
('Heeng (Asafetida)', 'spices', '✨'),
('Jeera (Cumin)', 'spices', '🟤'),
('Laal Mirch (Red Chili)', 'spices', '🌶️'),
('Turmeric (Haldi)', 'spices', '🟡'),
('Coriander (Dhania)', 'spices', '🍃'),
('Garam Masala', 'spices', '🟫'),
('Black Pepper', 'spices', '⚫'),
('Thyme', 'spices', '🌿'),
('Fennel (Saunf)', 'spices', '💫'),
('Cinnamon (Dalchini)', 'spices', '🟤'),
('Chawal (Rice)', 'grains', '🍚'),
('Atta (Wheat Flour)', 'grains', '🌾'),
('Maida (All Purpose Flour)', 'grains', '💛'),
('Oats', 'grains', '🥣'),
('Dal (Lentils)', 'grains', '🫘'),
('Moong Dal', 'grains', '🟢'),
('Urad Dal', 'grains', '⚪'),
('Chickpea', 'grains', '🟤'),
('Doodh (Milk)', 'dairy', '🥛'),
('Dahi (Yogurt)', 'dairy', '🍶'),
('Paneer', 'dairy', '🧀'),
('Makkhan (Butter)', 'dairy', '🧈'),
('Cheese', 'dairy', '🧀'),
('Cream', 'dairy', '🤍'),
('Bacha Dhaniya', 'leftovers', '🍃'),
('Bacha Mint', 'leftovers', '🌿'),
('Bacha Roti', 'leftovers', '🫓'),
('Bacha Chawal', 'leftovers', '🍚'),
('Bacha Chicken', 'leftovers', '🍗'),
('Bacha Sabzi', 'leftovers', '🥘');

-- ========================================
-- USER QUERIES
-- ========================================

-- Create new user
INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@example.com', SHA2('password', 256));

-- Get user by email
SELECT * FROM users WHERE email = 'john@example.com';

-- Get user by ID
SELECT * FROM users WHERE id = 1;

-- Update user name
UPDATE users SET name = 'Jane Doe' WHERE id = 1;

-- Delete user
DELETE FROM users WHERE id = 1;

-- Get all users
SELECT * FROM users;

-- Check if email exists
SELECT COUNT(*) FROM users WHERE email = 'john@example.com';

-- ========================================
-- RECIPE QUERIES
-- ========================================

-- Add new recipe
INSERT INTO recipes (user_id, recipe_name, ingredients, instructions, tips) 
VALUES (1, 'Aloo Gobi', 'Aloo, Gobhi, Pyaaz, Tamatar', 'Step 1... Step 2...', 'Beta, zyada mat bhuno');

-- Get user recipes
SELECT * FROM recipes WHERE user_id = 1;

-- Get recipe by ID
SELECT * FROM recipes WHERE id = 1;

-- Update recipe
UPDATE recipes SET recipe_name = 'Aloo Gobi Fry' WHERE id = 1;

-- Delete recipe
DELETE FROM recipes WHERE id = 1;

-- Get latest recipes
SELECT * FROM recipes ORDER BY created_at DESC LIMIT 10;

-- ========================================
-- USER PREFERENCES QUERIES
-- ========================================

-- Set user preferences
INSERT INTO user_preferences (user_id, health_status, favorite_ingredients) 
VALUES (1, 'healthy', 'Aloo, Pyaaz, Tamatar')
ON DUPLICATE KEY UPDATE health_status = 'healthy';

-- Get user preferences
SELECT * FROM user_preferences WHERE user_id = 1;

-- Update health status
UPDATE user_preferences SET health_status = 'fever' WHERE user_id = 1;

-- Delete preferences
DELETE FROM user_preferences WHERE user_id = 1;

-- ========================================
-- INGREDIENT QUERIES
-- ========================================

-- Get all ingredients
SELECT * FROM ingredients;

-- Get ingredients by category
SELECT * FROM ingredients WHERE category = 'vegetables';
SELECT * FROM ingredients WHERE category = 'spices';
SELECT * FROM ingredients WHERE category = 'grains';
SELECT * FROM ingredients WHERE category = 'dairy';
SELECT * FROM ingredients WHERE category = 'leftovers';

-- Count ingredients by category
SELECT category, COUNT(*) as count FROM ingredients GROUP BY category;

-- Search ingredient
SELECT * FROM ingredients WHERE name LIKE '%Aloo%';

-- Get all categories
SELECT DISTINCT category FROM ingredients;

-- ========================================
-- ANALYTICS QUERIES
-- ========================================

-- Total users
SELECT COUNT(*) as total_users FROM users;

-- Total recipes created
SELECT COUNT(*) as total_recipes FROM recipes;

-- Recipes per user
SELECT user_id, COUNT(*) as recipe_count FROM recipes GROUP BY user_id;

-- Most used ingredients
SELECT name, category FROM ingredients LIMIT 5;

-- Users created today
SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURDATE();

-- Active users (with recipes)
SELECT DISTINCT user_id FROM recipes;

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check all tables exist
SHOW TABLES;

-- Check users table structure
DESCRIBE users;

-- Check recipes table structure
DESCRIBE recipes;

-- Check preferences table structure
DESCRIBE user_preferences;

-- Check ingredients table structure
DESCRIBE ingredients;

-- Check total ingredients
SELECT COUNT(*) as total_ingredients FROM ingredients;

-- ========================================
-- CLEANUP QUERIES (Use With Caution!)
-- ========================================

-- Clear all data (keep structure)
DELETE FROM recipes;
DELETE FROM users;
DELETE FROM user_preferences;
DELETE FROM ingredients;

-- Drop all tables (complete reset)
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS user_preferences;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS ingredients;

-- Drop entire database (complete reset)
DROP DATABASE IF EXISTS mummy_db;

-- ========================================
-- EXPORT QUERIES
-- ========================================

-- Export users to CSV
SELECT * FROM users INTO OUTFILE '/tmp/users.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';

-- Export recipes to CSV
SELECT * FROM recipes INTO OUTFILE '/tmp/recipes.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';

-- ========================================
-- END OF QUERIES
-- ========================================
