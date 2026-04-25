-- ============================================
-- Albertson & Weiss Motors - Database Schema
-- ============================================

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'investor' CHECK (role IN ('investor', 'admin')),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Cars table
CREATE TABLE cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  vin TEXT,
  engine TEXT,
  mileage_km INTEGER,
  color TEXT,
  equipment TEXT[],
  purchase_price_usd NUMERIC,
  target_sale_price_eur NUMERIC,
  investment_needed_eur NUMERIC NOT NULL,
  investment_collected_eur NUMERIC DEFAULT 0,
  estimated_return_pct NUMERIC DEFAULT 25,
  estimated_duration_days INTEGER DEFAULT 90,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'funded', 'in_transit', 'sold', 'completed')),
  logistics_phase INTEGER DEFAULT 1,
  logistics_phases JSONB DEFAULT '[
    {"phase": 1, "name": "Sourced & Acquired", "completed": false, "date": null, "photos": []},
    {"phase": 2, "name": "In Transit to Warehouse", "completed": false, "date": null, "photos": []},
    {"phase": 3, "name": "Import & Customs", "completed": false, "date": null, "photos": []},
    {"phase": 4, "name": "Preparation & Certification", "completed": false, "date": null, "photos": []},
    {"phase": 5, "name": "Listed for Sale", "completed": false, "date": null, "photos": []},
    {"phase": 6, "name": "Under Offer", "completed": false, "date": null, "photos": []},
    {"phase": 7, "name": "Sold", "completed": false, "date": null, "photos": []},
    {"phase": 8, "name": "Payout Processed", "completed": false, "date": null, "photos": []}
  ]'::jsonb,
  shipping_container TEXT,
  shipping_carrier TEXT,
  shipping_route TEXT,
  shipping_eta DATE,
  photos_showcase TEXT[],
  photos_exterior TEXT[],
  photos_interior TEXT[],
  photos_detail TEXT[],
  thumbnail TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Investments table
CREATE TABLE investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  car_id UUID REFERENCES cars(id),
  amount_eur NUMERIC NOT NULL,
  expected_return_eur NUMERIC,
  actual_return_eur NUMERIC,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  contract_url TEXT,
  invested_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'update', 'milestone', 'return')),
  read BOOLEAN DEFAULT false,
  car_id UUID REFERENCES cars(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Car updates table
CREATE TABLE car_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID REFERENCES cars(id),
  phase INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  photos TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Row Level Security
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_updates ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Policies
-- ============================================

-- Users
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can read all users" ON users FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Cars
CREATE POLICY "Anyone can view open cars" ON cars FOR SELECT USING (true);
CREATE POLICY "Admins can manage cars" ON cars FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Investments
CREATE POLICY "Users can view own investments" ON investments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage investments" ON investments FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Car updates
CREATE POLICY "Anyone can view car updates" ON car_updates FOR SELECT USING (true);
CREATE POLICY "Admins can manage car updates" ON car_updates FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- Storage buckets (crear manualmente en Supabase dashboard):
-- 'car-photos'    -> publico, para fotos de showcase
-- 'car-logistics' -> privado, para fotos de fases logisticas
-- 'contracts'     -> privado, para contratos PDF
-- ============================================
