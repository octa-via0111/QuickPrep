-- QuickPrep Database Schema for Supabase PostgreSQL
-- Aplikasi Panduan Memasak Praktis & Cerdas

-- 1. Table: categories
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: tools
CREATE TABLE IF NOT EXISTS tools (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: ingredients
CREATE TABLE IF NOT EXISTS ingredients (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table: recipes
CREATE TABLE IF NOT EXISTS recipes (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category_id VARCHAR(50) REFERENCES categories(id) ON UPDATE CASCADE,
    cooking_time INT NOT NULL, -- dalam menit
    preparation_time INT NOT NULL DEFAULT 5, -- dalam menit
    estimated_cost INT NOT NULL, -- total estimasi biaya dalam Rupiah
    cost_per_serving INT NOT NULL, -- estimasi per porsi
    servings INT NOT NULL DEFAULT 1,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Mudah', 'Sedang', 'Sulit')),
    instructions JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array step: [{step_number, title, instruction, duration_minutes, tips}]
    tips TEXT,
    tags TEXT[] DEFAULT '{}',
    is_popular BOOLEAN DEFAULT false,
    is_kos_friendly BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table: recipe_tools (many-to-many relationship)
CREATE TABLE IF NOT EXISTS recipe_tools (
    recipe_id VARCHAR(100) REFERENCES recipes(id) ON DELETE CASCADE,
    tool_id VARCHAR(50) REFERENCES tools(id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, tool_id)
);

-- 6. Table: recipe_ingredients (many-to-many relationship with quantity)
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id VARCHAR(100) REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id VARCHAR(100) REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity NUMERIC(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    is_optional BOOLEAN DEFAULT false,
    notes TEXT
);

-- 7. Table: substitutions (Pengganti Bahan)
CREATE TABLE IF NOT EXISTS substitutions (
    id SERIAL PRIMARY KEY,
    original_ingredient VARCHAR(150) NOT NULL,
    substitute_ingredient VARCHAR(150) NOT NULL,
    reason TEXT NOT NULL,
    taste_change TEXT NOT NULL,
    texture_change TEXT NOT NULL,
    suitable_for VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Table: cooking_history (Riwayat Memasak)
CREATE TABLE IF NOT EXISTS cooking_history (
    id SERIAL PRIMARY KEY,
    recipe_id VARCHAR(100) REFERENCES recipes(id) ON DELETE SET NULL,
    recipe_name VARCHAR(200) NOT NULL,
    servings_cooked INT DEFAULT 1,
    cooked_at TIMESTAMPTZ DEFAULT NOW(),
    duration_minutes INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    notes TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category_id);
CREATE INDEX IF NOT EXISTS idx_recipes_cost ON recipes(estimated_cost);
CREATE INDEX IF NOT EXISTS idx_recipes_cooking_time ON recipes(cooking_time);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_tools_recipe ON recipe_tools(recipe_id);
