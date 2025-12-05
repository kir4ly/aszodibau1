-- ===================================
-- ADMIN PANEL SUPABASE SETUP
-- ===================================
-- Ez a script létrehozza az összes szükséges táblát és storage bucket-et
-- a működő admin panelhez.

-- 1. ADMIN ACCESS TABLE
-- Ez tárolja a hozzáférési kódokat
CREATE TABLE IF NOT EXISTS admin_access (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index a gyors kereséshez
CREATE INDEX IF NOT EXISTS idx_admin_access_code ON admin_access(code);
CREATE INDEX IF NOT EXISTS idx_admin_access_active ON admin_access(is_active);

-- 2. GALLERY IMAGES TABLE
-- Ez tárolja a feltöltött képek metaadatait
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index az időrendhez
CREATE INDEX IF NOT EXISTS idx_gallery_images_created_at ON gallery_images(created_at DESC);

-- 3. SITE CONTENT TABLE
-- Ez tárolja az oldal szöveges tartalmát
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'html')),
  section TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index a gyors kereséshez
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(key);
CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content(section);

-- 4. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE admin_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- 5. RLS POLICIES
-- Ezek a szabályok határozzák meg, hogy ki mit olvashat/írhat

-- Admin access: Csak olvasható mindenki számára (a kód ellenőrzéshez)
CREATE POLICY "Admin access readable by all"
  ON admin_access FOR SELECT
  USING (true);

-- Gallery images: Mindenki olvashatja
CREATE POLICY "Gallery images readable by all"
  ON gallery_images FOR SELECT
  USING (true);

-- Gallery images: Bárki írhatja (később finomíthatod)
CREATE POLICY "Gallery images writable by all"
  ON gallery_images FOR ALL
  USING (true);

-- Site content: Mindenki olvashatja
CREATE POLICY "Site content readable by all"
  ON site_content FOR SELECT
  USING (true);

-- Site content: Bárki írhatja (később finomíthatod)
CREATE POLICY "Site content writable by all"
  ON site_content FOR ALL
  USING (true);

-- 6. ADMIN ACCESS KÓD BESZÚRÁSA
-- Cseréld ki a 'Aszodibau1212345' értéket a saját hozzáférési kódodra!
INSERT INTO admin_access (code, is_active)
VALUES ('Aszodibau1212345', true)
ON CONFLICT (code) DO NOTHING;

-- OPCIONÁLIS: Példa tartalmak
-- Kommenteld ki, ha nem akarod őket használni

-- INSERT INTO site_content (key, value, type, section) VALUES
--   ('hero_title', 'Üdvözöljük az Aszódi Bau oldalán!', 'text', 'home'),
--   ('hero_subtitle', 'Professzionális építőipari szolgáltatások', 'text', 'home'),
--   ('about_description', 'Cégünk több mint 10 éve foglalkozik építőipari munkákkal.', 'text', 'about'),
--   ('contact_email', 'info@aszodibau.hu', 'text', 'contact')
-- ON CONFLICT (key) DO NOTHING;

-- ===================================
-- STORAGE BUCKET LÉTREHOZÁSA
-- ===================================
-- FIGYELEM: Ez a része NEM SQL-ben fut!
-- Ezt a Supabase Dashboard-on kell végrehajtani:
--
-- 1. Menj a Supabase Dashboard > Storage menüpontba
-- 2. Kattints a "New bucket" gombra
-- 3. Bucket neve: 'images'
-- 4. Public bucket: IGEN (checked)
-- 5. Kattints a "Create bucket" gombra
-- 6. A bucket létrehozása után menj a Policies fülre
-- 7. Add hozzá ezeket a policy-kat:
--
-- Policy 1: "Public read access"
--   - Operation: SELECT
--   - Policy definition: true
--
-- Policy 2: "Public insert access"
--   - Operation: INSERT
--   - Policy definition: true
--
-- Policy 3: "Public delete access"
--   - Operation: DELETE
--   - Policy definition: true

-- Alternatíva: Ha van hozzáférésed a Supabase SQL Editor-hoz,
-- használhatod ezt a storage policy létrehozást is:

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('images', 'images', true)
-- ON CONFLICT (id) DO NOTHING;

-- CREATE POLICY "Public read images"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'images');

-- CREATE POLICY "Public insert images"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'images');

-- CREATE POLICY "Public delete images"
-- ON storage.objects FOR DELETE
-- USING (bucket_id = 'images');
