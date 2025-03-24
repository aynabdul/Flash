-- Create leadership table
CREATE TABLE IF NOT EXISTS leadership (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  designation TEXT NOT NULL,
  img_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  img_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  pdf_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create success_stories table
CREATE TABLE IF NOT EXISTS success_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  circumstances TEXT NOT NULL,
  engaged_on TEXT NOT NULL,
  released_on TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only)
CREATE POLICY "Allow public read access" ON leadership FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON resources FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON success_stories FOR SELECT USING (true);

-- Create policies for authenticated users (full access)
CREATE POLICY "Allow authenticated full access" ON leadership FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON resources FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON success_stories FOR ALL USING (auth.role() = 'authenticated'); 