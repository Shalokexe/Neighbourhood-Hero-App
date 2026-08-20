-- NEIGHBORHOOD HERO DATABASE SCHEMA (PostgreSQL + PostGIS)
-- Run this migration on Supabase or PostgreSQL cluster

CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. CITIES & LOCALITIES
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  state VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS localities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  center_lat DOUBLE PRECISION NOT NULL,
  center_lng DOUBLE PRECISION NOT NULL,
  location GEOGRAPHY(Point, 4326),
  is_active BOOLEAN DEFAULT TRUE
);

-- 2. USERS & HERO PROFILES
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  profile_image_url TEXT,
  city_id UUID REFERENCES cities(id),
  locality_id UUID REFERENCES localities(id),
  bio TEXT,
  rating NUMERIC(3, 2) DEFAULT 5.00,
  rating_count INT DEFAULT 0,
  total_credits INT DEFAULT 0,
  lifetime_credits INT DEFAULT 0,
  level INT DEFAULT 1,
  badges JSONB DEFAULT '[]'::jsonb,
  interests JSONB DEFAULT '[]'::jsonb,
  role VARCHAR(20) DEFAULT 'USER',
  is_verified BOOLEAN DEFAULT FALSE,
  is_blocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. GIGS / MISSIONS
DO $$ BEGIN
  CREATE TYPE gig_status AS ENUM ('OPEN', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'REVIEWED', 'CANCELLED', 'DISPUTED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE gig_urgency AS ENUM ('FLEXIBLE', 'TODAY', 'SOON', 'URGENT');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS gigs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poster_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  subcategory VARCHAR(50),
  city_id UUID REFERENCES cities(id),
  locality_id UUID REFERENCES localities(id),
  approx_address TEXT NOT NULL,
  exact_address TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  location GEOGRAPHY(Point, 4326),
  budget NUMERIC(10, 2),
  credit_reward INT NOT NULL DEFAULT 20,
  urgency gig_urgency DEFAULT 'TODAY',
  estimated_duration VARCHAR(50),
  preferred_completion_time TIMESTAMPTZ,
  status gig_status DEFAULT 'OPEN',
  accepted_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

-- 4. CREDIT TRANSACTIONS LEDGER
DO $$ BEGIN
  CREATE TYPE credit_tx_type AS ENUM ('EARN', 'BONUS', 'REDEMPTION', 'ADMIN_ADJUSTMENT', 'REFUND', 'REVERSAL');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount INT NOT NULL,
  type credit_tx_type NOT NULL,
  reason VARCHAR(255) NOT NULL,
  gig_id UUID REFERENCES gigs(id),
  redemption_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REWARDS & REDEMPTIONS
CREATE TABLE IF NOT EXISTS reward_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  credit_cost INT NOT NULL,
  stock INT NOT NULL DEFAULT 100,
  partner_name VARCHAR(120),
  redemption_instructions TEXT,
  expiry_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reward_id UUID REFERENCES reward_items(id),
  credits_spent INT NOT NULL,
  redemption_code VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(30) DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  fulfilled_at TIMESTAMPTZ
);

-- 6. CHAT & MESSAGES
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id UUID REFERENCES gigs(id) ON DELETE CASCADE,
  poster_id UUID REFERENCES users(id),
  helper_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id),
  text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. REVIEWS & REPORTS
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id UUID REFERENCES gigs(id) ON DELETE CASCADE,
  from_user_id UUID REFERENCES users(id),
  to_user_id UUID REFERENCES users(id),
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_review_per_gig UNIQUE(gig_id, from_user_id)
);

CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES users(id),
  reported_user_id UUID REFERENCES users(id),
  gig_id UUID REFERENCES gigs(id),
  reason VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(30) DEFAULT 'PENDING',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR HIGH-PERFORMANCE GEOSPATIAL SEARCH
CREATE INDEX IF NOT EXISTS idx_gigs_location ON gigs USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_gigs_status_city ON gigs (status, city_id, locality_id);
CREATE INDEX IF NOT EXISTS idx_credit_tx_user ON credit_transactions (user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages (conversation_id, created_at);

-- FUNCTION FOR NEARBY RADIUS SEARCH
CREATE OR REPLACE FUNCTION get_nearby_gigs(
  user_lat DOUBLE PRECISION,
  user_lng DOUBLE PRECISION,
  radius_meters DOUBLE PRECISION DEFAULT 5000
)
RETURNS TABLE (
  id UUID,
  title VARCHAR,
  category VARCHAR,
  credit_reward INT,
  urgency gig_urgency,
  distance_meters DOUBLE PRECISION
)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    g.id,
    g.title,
    g.category,
    g.credit_reward,
    g.urgency,
    ST_Distance(g.location, ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography) AS distance_meters
  FROM gigs g
  WHERE g.status = 'OPEN'
    AND ST_DWithin(g.location, ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography, radius_meters)
  ORDER BY distance_meters ASC;
END;
$$;
