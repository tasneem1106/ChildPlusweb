-- SQL DDL schema script for Child Plus Supabase tables
-- Copy and paste this script directly into the SQL Editor of your Supabase Dashboard

-- 1. Create Children Table
CREATE TABLE IF NOT EXISTS public.children (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('MALE', 'FEMALE')),
    anganwadi_center_id TEXT NOT NULL,
    village_name TEXT,
    parent_name TEXT,
    parent_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Growth Records Table
CREATE TABLE IF NOT EXISTS public.growth_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    child_id UUID NOT NULL,
    measured_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    height_cm NUMERIC(5, 2) NOT NULL,
    weight_kg NUMERIC(5, 2) NOT NULL,
    muac_mm NUMERIC(4, 1),
    weight_for_age_z NUMERIC(4, 2),
    height_for_age_z NUMERIC(4, 2),
    weight_for_height_z NUMERIC(4, 2),
    wasting_status VARCHAR(10) DEFAULT 'NORMAL' NOT NULL CHECK (wasting_status IN ('NORMAL', 'MAM', 'SAM')),
    stunting_status VARCHAR(10) DEFAULT 'NORMAL' NOT NULL CHECK (stunting_status IN ('NORMAL', 'MAM', 'SAM')),
    underweight_status VARCHAR(10) DEFAULT 'NORMAL' NOT NULL CHECK (underweight_status IN ('NORMAL', 'MAM', 'SAM')),
    measured_by_aww_id TEXT NOT NULL,
    notes TEXT,
    photo_validation_status VARCHAR(10) DEFAULT 'PENDING' CHECK (photo_validation_status IN ('PENDING', 'VALID', 'INVALID')),
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_growth_child FOREIGN KEY (child_id) REFERENCES public.children(id) ON DELETE CASCADE
);

-- 3. Create Milestones Table
CREATE TABLE IF NOT EXISTS public.milestones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    child_id UUID NOT NULL,
    milestone_code VARCHAR(50) NOT NULL,
    milestone_name TEXT NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('COGNITIVE', 'LITERACY', 'NUMERACY', 'MOTOR', 'SOCIAL')),
    target_age_months INTEGER NOT NULL,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    completed_at TIMESTAMPTZ,
    logged_by_aww_id TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_milestone_child FOREIGN KEY (child_id) REFERENCES public.children(id) ON DELETE CASCADE,
    CONSTRAINT unique_child_milestone UNIQUE (child_id, milestone_code)
);

-- 4. Create Performance Indices
CREATE INDEX IF NOT EXISTS idx_children_anganwadi ON public.children(anganwadi_center_id);
CREATE INDEX IF NOT EXISTS idx_growth_records_child ON public.growth_records(child_id);
CREATE INDEX IF NOT EXISTS idx_milestones_child ON public.milestones(child_id);
