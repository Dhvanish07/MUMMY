-- ========================================
-- MUMMY – BHOOK LAGI HAI
-- Complete Database Setup SQL
-- ========================================

-- 1. CREATE DATABASE
-- ========================================
CREATE DATABASE IF NOT EXISTS mummy_db;
USE mummy_db;

-- 2. USERS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- 3. RECIPES TABLE (Optional - for saving favorites)
-- ========================================
CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_name VARCHAR(200) NOT NULL,
    ingredients VARCHAR(1000) NOT NULL,
    instructions LONGTEXT NOT NULL,
    tips LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- 4. USER PREFERENCES TABLE (Optional - for storing health status, etc)
-- ========================================
CREATE TABLE IF NOT EXISTS user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    health_status VARCHAR(50),
    favorite_ingredients VARCHAR(1000),
    dietary_restrictions VARCHAR(500),
    notification_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. INGREDIENTS TABLE (Optional - for ingredient database)
-- ========================================
CREATE TABLE IF NOT EXISTS ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    emoji VARCHAR(10),
    description VARCHAR(500),
    health_benefits VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category)
);

-- 6. INSERT DEFAULT INGREDIENTS
-- ========================================

-- Vegetables
INSERT IGNORE INTO ingredients (name, category, emoji, description, health_benefits) VALUES
('Aloo (Potato)', 'vegetables', '🥔', 'Staple vegetable', 'Rich in potassium and vitamin C'),
('Pyaaz (Onion)', 'vegetables', '🧅', 'Aromatic vegetable', 'Anti-inflammatory properties'),
('Tamatar (Tomato)', 'vegetables', '🍅', 'Red vegetable', 'Rich in lycopene'),
('Gaajar (Carrot)', 'vegetables', '🥕', 'Orange root vegetable', 'Good for eyesight'),
('Patta Gobhi (Cabbage)', 'vegetables', '🥬', 'Leafy vegetable', 'Rich in fiber'),
('Bhindi (Okra)', 'vegetables', '🫘', 'Green vegetable', 'Low in calories'),
('Shimla Mirch (Bell Pepper)', 'vegetables', '🫑', 'Colorful vegetable', 'Rich in vitamin C'),
('Kheera (Cucumber)', 'vegetables', '🥒', 'Cooling vegetable', 'Hydrating'),
('Broccoli', 'vegetables', '🥦', 'Green vegetable', 'Rich in antioxidants'),
('Spinach', 'vegetables', '🌱', 'Leafy green', 'High in iron'),
('Baingan (Eggplant)', 'vegetables', '🍆', 'Purple vegetable', 'Low in calories'),
('Corn', 'vegetables', '🌽', 'Sweet grain vegetable', 'Rich in fiber');

-- Spices
INSERT IGNORE INTO ingredients (name, category, emoji, description, health_benefits) VALUES
('Heeng (Asafetida)', 'spices', '✨', 'Pungent spice', 'Aids digestion'),
('Jeera (Cumin)', 'spices', '🟤', 'Aromatic spice', 'Digestive properties'),
('Laal Mirch (Red Chili)', 'spices', '🌶️', 'Hot spice', 'Boosts metabolism'),
('Turmeric (Haldi)', 'spices', '🟡', 'Golden spice', 'Anti-inflammatory'),
('Coriander (Dhania)', 'spices', '🍃', 'Aromatic spice', 'Digestive aid'),
('Garam Masala', 'spices', '🟫', 'Spice blend', 'Warming properties'),
('Black Pepper', 'spices', '⚫', 'Peppercorn', 'Enhances digestion'),
('Thyme', 'spices', '🌿', 'Herb spice', 'Antioxidant rich'),
('Fennel (Saunf)', 'spices', '💫', 'Sweet spice', 'Cooling effect'),
('Cinnamon (Dalchini)', 'spices', '🟤', 'Sweet spice', 'Regulates blood sugar');

-- Grains
INSERT IGNORE INTO ingredients (name, category, emoji, description, health_benefits) VALUES
('Chawal (Rice)', 'grains', '🍚', 'Staple grain', 'Energy source'),
('Atta (Wheat Flour)', 'grains', '🌾', 'Flour', 'Rich in fiber'),
('Maida (All Purpose Flour)', 'grains', '💛', 'Refined flour', 'Versatile for baking'),
('Oats', 'grains', '🥣', 'Whole grain', 'High in fiber'),
('Dal (Lentils)', 'grains', '🫘', 'Legume', 'Protein rich'),
('Moong Dal', 'grains', '🟢', 'Green lentil', 'Easy to digest'),
('Urad Dal', 'grains', '⚪', 'White lentil', 'Rich in protein'),
('Chickpea', 'grains', '🟤', 'Legume', 'High in protein');

-- Dairy
INSERT IGNORE INTO ingredients (name, category, emoji, description, health_benefits) VALUES
('Doodh (Milk)', 'dairy', '🥛', 'Dairy product', 'Rich in calcium'),
('Dahi (Yogurt)', 'dairy', '🍶', 'Fermented dairy', 'Probiotics'),
('Paneer', 'dairy', '🧀', 'Fresh cheese', 'High in protein'),
('Makkhan (Butter)', 'dairy', '🧈', 'Dairy fat', 'Flavorful'),
('Cheese', 'dairy', '🧀', 'Hard cheese', 'Protein and calcium'),
('Cream', 'dairy', '🤍', 'Dairy product', 'Rich and creamy');

-- Leftovers
INSERT IGNORE INTO ingredients (name, category, emoji, description, health_benefits) VALUES
('Bacha Dhaniya', 'leftovers', '🍃', 'Leftover herbs', 'Garnish'),
('Bacha Mint', 'leftovers', '🌿', 'Leftover mint', 'Cooling'),
('Bacha Roti', 'leftovers', '🫓', 'Leftover bread', 'Can be repurposed'),
('Bacha Chawal', 'leftovers', '🍚', 'Leftover rice', 'Fried rice base'),
('Bacha Chicken', 'leftovers', '🍗', 'Leftover chicken', 'Protein'),
('Bacha Sabzi', 'leftovers', '🥘', 'Leftover vegetables', 'Mixed use');

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check if database created
SELECT DATABASE();

-- Check users table
DESCRIBE users;

-- Count ingredients by category
SELECT category, COUNT(*) as count FROM ingredients GROUP BY category;

-- Show all tables
SHOW TABLES;

-- ========================================
-- USEFUL QUERIES FOR OPERATIONS
-- ========================================

-- Get user by email
-- SELECT * FROM users WHERE email = 'test@example.com';

-- Insert new user
-- INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@example.com', 'hashed_password_here');

-- Update user
-- UPDATE users SET name = 'Jane Doe' WHERE id = 1;

-- Delete user
-- DELETE FROM users WHERE id = 1;

-- Get all ingredients by category
-- SELECT * FROM ingredients WHERE category = 'vegetables';

-- Get user preferences
-- SELECT * FROM user_preferences WHERE user_id = 1;

-- ========================================
-- END OF DATABASE SETUP
-- ========================================
