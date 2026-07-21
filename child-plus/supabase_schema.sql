-- ==========================================================================
-- Child Plus - Supabase Database Reset & Creation Script
-- Fixes table column conflicts by cleanly recreating tables.
-- Copy and run in Supabase SQL Editor: https://supabase.co/dashboard/project/cveityvuekdajvpxfpet
-- ==========================================================================

-- 1. Drop old existing tables to resolve column mismatch conflicts
DROP TABLE IF EXISTS public.activity_logs CASCADE;
DROP TABLE IF EXISTS public.growth_logs CASCADE;
DROP TABLE IF EXISTS public.children CASCADE;

-- 2. Create Fresh Children Table with all required columns
CREATE TABLE public.children (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE,
    gender TEXT,
    center_id TEXT,
    height NUMERIC,
    weight NUMERIC,
    muac NUMERIC,
    status TEXT,
    cognitive_score INT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Fresh Growth Logs Table
CREATE TABLE public.growth_logs (
    id BIGSERIAL PRIMARY KEY,
    child_id TEXT REFERENCES public.children(id) ON DELETE CASCADE,
    date DATE,
    height NUMERIC,
    weight NUMERIC,
    muac NUMERIC,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Fresh Activity Logs Table
CREATE TABLE public.activity_logs (
    id BIGSERIAL PRIMARY KEY,
    child_id TEXT REFERENCES public.children(id) ON DELETE CASCADE,
    activity_name TEXT,
    category TEXT,
    score INT,
    stars INT,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS) & Public Access Policies
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read/write on children" ON public.children FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write on growth_logs" ON public.growth_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write on activity_logs" ON public.activity_logs FOR ALL USING (true) WITH CHECK (true);

-- 6. Insert Sample Children Profiles (Aarav, Priya, Vihaan)
INSERT INTO public.children (id, name, dob, gender, center_id, height, weight, muac, status, cognitive_score)
VALUES 
  ('child_aarav', 'Aarav Kumar', '2023-03-15', 'Male', 'c_anekal_12', 96.5, 14.8, 14.2, 'NORMAL', 88),
  ('child_priya', 'Priya Sharma', '2024-06-10', 'Female', 'c_anekal_12', 81.0, 9.8, 12.1, 'MAM', 68),
  ('child_vihaan', 'Vihaan Reddy', '2022-01-20', 'Male', 'c_anekal_08', 98.0, 15.2, 13.8, 'STUNTING_RISK', 92);
