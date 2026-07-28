-- ====================================================================
-- Beyond Barista Academy - Neon migration 001
-- Adds Clerk identity linkage and course ownership, without touching
-- any existing data. Safe to re-run (IF NOT EXISTS / conditional drops).
-- ====================================================================

-- Link Neon's existing integer-id users to Clerk-issued identities.
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS clerk_id TEXT UNIQUE;

-- Clerk now owns credentials; stop requiring a locally-managed password hash.
ALTER TABLE public.users ALTER COLUMN password_hash DROP NOT NULL;

-- Course ownership, needed for instructor CRUD authorization checks.
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS instructor_id INTEGER REFERENCES public.users(id);
