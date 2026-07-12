-- ========================================================
-- MYTHVERSE DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- ========================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Player Profiles
CREATE TABLE IF NOT EXISTS public.player_profiles (
    id UUID PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    origin VARCHAR(50) NOT NULL,
    avatar_url TEXT,
    title VARCHAR(100) DEFAULT 'Mythwalker',
    level INTEGER DEFAULT 1 CHECK (level >= 1),
    xp INTEGER DEFAULT 0 CHECK (xp >= 0),
    coins INTEGER DEFAULT 200 CHECK (coins >= 0),
    divine_essence INTEGER DEFAULT 0 CHECK (divine_essence >= 0),
    oracle_tokens INTEGER DEFAULT 5 CHECK (oracle_tokens >= 0),
    daily_streak INTEGER DEFAULT 0 CHECK (daily_streak >= 0),
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Player Stats (Attributes)
CREATE TABLE IF NOT EXISTS public.player_stats (
    player_id UUID PRIMARY KEY REFERENCES public.player_profiles(id) ON DELETE CASCADE,
    strength INTEGER DEFAULT 10 CHECK (strength >= 0),
    wisdom INTEGER DEFAULT 10 CHECK (wisdom >= 0),
    insight INTEGER DEFAULT 10 CHECK (insight >= 0),
    endurance INTEGER DEFAULT 10 CHECK (endurance >= 0),
    agility INTEGER DEFAULT 10 CHECK (agility >= 0),
    spirit INTEGER DEFAULT 10 CHECK (spirit >= 0),
    luck INTEGER DEFAULT 10 CHECK (luck >= 0),
    mythic_affinity INTEGER DEFAULT 10 CHECK (mythic_affinity >= 0)
);

-- 3. Pantheon Affinity (Reputation)
CREATE TABLE IF NOT EXISTS public.pantheon_affinity (
    player_id UUID REFERENCES public.player_profiles(id) ON DELETE CASCADE,
    pantheon VARCHAR(50) NOT NULL,
    reputation INTEGER DEFAULT 0 CHECK (reputation >= 0),
    rank VARCHAR(50) DEFAULT 'Outsider',
    PRIMARY KEY (player_id, pantheon)
);

-- 4. Equipment Items Definition (Base database for forge reference)
CREATE TABLE IF NOT EXISTS public.equipment_items (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'weapon', 'head', 'chest', 'arms', 'legs', 'relic'
    rarity VARCHAR(30) NOT NULL, -- 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Divine'
    pantheon VARCHAR(50) NOT NULL,
    base_stat INTEGER NOT NULL, -- Damage or Defense
    description TEXT,
    lore TEXT,
    attributes JSONB DEFAULT '{}'::jsonb, -- custom stats like { "strength_mod": 2 }
    image_url TEXT,
    upgrade_recipe JSONB DEFAULT '{}'::jsonb
);

-- 5. Player Inventory (Equipped status & Upgrade level)
CREATE TABLE IF NOT EXISTS public.player_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES public.player_profiles(id) ON DELETE CASCADE,
    item_id VARCHAR(100) REFERENCES public.equipment_items(id) ON DELETE CASCADE,
    upgrade_level INTEGER DEFAULT 0 CHECK (upgrade_level >= 0),
    is_equipped BOOLEAN DEFAULT FALSE,
    equipped_slot VARCHAR(50), -- 'weapon', 'head', 'chest', 'arms', 'legs', 'relic_1', 'relic_2', 'relic_3'
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Player Materials Inventory
CREATE TABLE IF NOT EXISTS public.player_materials (
    player_id UUID REFERENCES public.player_profiles(id) ON DELETE CASCADE,
    material_name VARCHAR(100) NOT NULL, -- 'bronze_fragment', 'rune_stone', 'divine_essence', 'titan_ore', 'spirit_thread'
    quantity INTEGER DEFAULT 0 CHECK (quantity >= 0),
    PRIMARY KEY (player_id, material_name)
);

-- 7. Player Codex Discoveries
CREATE TABLE IF NOT EXISTS public.player_codex (
    player_id UUID REFERENCES public.player_profiles(id) ON DELETE CASCADE,
    entity_id VARCHAR(100) NOT NULL, -- matches deities, heroes, creatures, realms, artifacts
    discovery_percentage INTEGER DEFAULT 0 CHECK (discovery_percentage BETWEEN 0 AND 100),
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (player_id, entity_id)
);

-- 8. Player Campaign Progress
CREATE TABLE IF NOT EXISTS public.player_campaign (
    player_id UUID REFERENCES public.player_profiles(id) ON DELETE CASCADE,
    pantheon VARCHAR(50) NOT NULL,
    current_chapter INTEGER DEFAULT 1,
    progress_nodes JSONB DEFAULT '[]'::jsonb, -- array of completed node IDs
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (player_id, pantheon)
);

-- 9. Player Quests Track
CREATE TABLE IF NOT EXISTS public.player_quests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES public.player_profiles(id) ON DELETE CASCADE,
    quest_id VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'claimed'
    progress INTEGER DEFAULT 0 CHECK (progress >= 0),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (player_id, quest_id)
);

-- 10. Player Achievements Unlocks
CREATE TABLE IF NOT EXISTS public.player_achievements (
    player_id UUID REFERENCES public.player_profiles(id) ON DELETE CASCADE,
    achievement_id VARCHAR(100) NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (player_id, achievement_id)
);

-- 11. Battle History logs
CREATE TABLE IF NOT EXISTS public.battle_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES public.player_profiles(id) ON DELETE CASCADE,
    opponent_id VARCHAR(100) NOT NULL, -- matches creature ID
    outcome VARCHAR(30) NOT NULL, -- 'victory', 'defeat', 'fled'
    rounds INTEGER DEFAULT 1,
    xp_gained INTEGER DEFAULT 0,
    coins_gained INTEGER DEFAULT 0,
    loot_dropped JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Quiz Session History
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES public.player_profiles(id) ON DELETE CASCADE,
    pantheon VARCHAR(50) NOT NULL,
    difficulty VARCHAR(30) NOT NULL,
    score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    accuracy_percentage NUMERIC(5,2) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- TRIGGERS, INDEXES, AND PERFORMANCE TUNING
-- ========================================================

-- Indexes for fast query lookup
CREATE INDEX IF NOT EXISTS idx_inventory_player ON public.player_inventory(player_id);
CREATE INDEX IF NOT EXISTS idx_codex_player ON public.player_codex(player_id);
CREATE INDEX IF NOT EXISTS idx_quests_player ON public.player_quests(player_id);
CREATE INDEX IF NOT EXISTS idx_materials_player ON public.player_materials(player_id);

-- Automatic stats and affinity initialization trigger when a player is registered
CREATE OR REPLACE FUNCTION public.handle_new_player()
RETURNS TRIGGER AS $$
BEGIN
    -- Initialize player stats
    INSERT INTO public.player_stats (player_id, strength, wisdom, insight, endurance, agility, spirit, luck, mythic_affinity)
    VALUES (NEW.id, 10, 10, 10, 10, 10, 10, 10, 10);
    
    -- Initialize pantheon affinity reputations
    INSERT INTO public.pantheon_affinity (player_id, pantheon, reputation, rank)
    VALUES 
        (NEW.id, 'greek', 0, 'Outsider'),
        (NEW.id, 'norse', 0, 'Outsider'),
        (NEW.id, 'egyptian', 0, 'Outsider');
        
    -- Initialize default materials
    INSERT INTO public.player_materials (player_id, material_name, quantity)
    VALUES
        (NEW.id, 'bronze_fragment', 0),
        (NEW.id, 'rune_stone', 0),
        (NEW.id, 'divine_essence', 0),
        (NEW.id, 'titan_ore', 0),
        (NEW.id, 'spirit_thread', 0);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trigger_new_player
    AFTER INSERT ON public.player_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_player();

-- Row Level Security (RLS) Rules for Supabase
ALTER TABLE public.player_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pantheon_affinity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_codex ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_campaign ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battle_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Creating policies where a user can only select/update their own data
CREATE POLICY "Allow select on profiles to owner" ON public.player_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow update on profiles to owner" ON public.player_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow select/update on stats to owner" ON public.player_stats
    FOR ALL USING (auth.uid() = player_id);

CREATE POLICY "Allow select/update on affinity to owner" ON public.pantheon_affinity
    FOR ALL USING (auth.uid() = player_id);

CREATE POLICY "Allow select/update on inventory to owner" ON public.player_inventory
    FOR ALL USING (auth.uid() = player_id);

CREATE POLICY "Allow select/update on materials to owner" ON public.player_materials
    FOR ALL USING (auth.uid() = player_id);

CREATE POLICY "Allow select/update on codex to owner" ON public.player_codex
    FOR ALL USING (auth.uid() = player_id);

CREATE POLICY "Allow select/update on campaign to owner" ON public.player_campaign
    FOR ALL USING (auth.uid() = player_id);

CREATE POLICY "Allow select/update on quests to owner" ON public.player_quests
    FOR ALL USING (auth.uid() = player_id);

CREATE POLICY "Allow select/update on achievements to owner" ON public.player_achievements
    FOR ALL USING (auth.uid() = player_id);
