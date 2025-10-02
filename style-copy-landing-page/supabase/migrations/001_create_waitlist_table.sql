-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  source VARCHAR(50) DEFAULT 'website',
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'notified', 'converted', 'unsubscribed')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_source ON waitlist(source);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at 
  BEFORE UPDATE ON waitlist 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to count (for stats)
CREATE POLICY "Allow public read access to waitlist count" ON waitlist
  FOR SELECT USING (true);

-- Create policy to allow public insert (for new signups)
CREATE POLICY "Allow public insert to waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create policy to allow public update for unsubscribing
CREATE POLICY "Allow public update for unsubscribing" ON waitlist
  FOR UPDATE USING (true);

-- Create a view for public stats (without sensitive data)
CREATE OR REPLACE VIEW waitlist_stats AS
SELECT 
  COUNT(*) FILTER (WHERE status = 'active') as total_count,
  COUNT(*) FILTER (WHERE status = 'active' AND created_at >= NOW() - INTERVAL '24 hours') as recent_count,
  COUNT(*) FILTER (WHERE status = 'active' AND created_at >= NOW() - INTERVAL '7 days') as weekly_count,
  COUNT(*) FILTER (WHERE status = 'converted') as converted_count
FROM waitlist;

-- Grant access to the view
GRANT SELECT ON waitlist_stats TO anon, authenticated;
