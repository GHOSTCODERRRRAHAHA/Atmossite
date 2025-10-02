# Supabase Waitlist Setup Guide

This guide will help you set up the new Supabase-powered waitlist system for your Atmos website.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. Your Atmos project cloned locally

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `atmos-waitlist` (or your preferred name)
   - **Database Password**: Generate a strong password
   - **Region**: Choose the closest region to your users
5. Click "Create new project"
6. Wait for the project to be set up (usually 2-3 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://your-project.supabase.co`)
   - **Project API Key** (anon/public key)

## Step 3: Set Up Environment Variables

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

## Step 4: Run Database Migrations

1. Install Supabase CLI (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. Link your project to Supabase:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Run the migration to create the waitlist table:
   ```bash
   supabase db push
   ```

   Or manually run the SQL from `supabase/migrations/001_create_waitlist_table.sql` in your Supabase SQL editor.

## Step 5: Configure Row Level Security (RLS)

The migration includes RLS policies, but verify they're working:

1. Go to **Authentication** → **Policies** in your Supabase dashboard
2. Ensure the following policies exist for the `waitlist` table:
   - `Allow public read access to waitlist count`
   - `Allow public insert to waitlist`
   - `Allow public update for unsubscribing`

## Step 6: Test the Waitlist

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your website and test the waitlist form
3. Check your Supabase dashboard → **Table Editor** → **waitlist** to see new entries

## Features Included

### ✅ **Enhanced Waitlist Form**
- Real-time validation
- Duplicate email detection
- Rate limiting (5 attempts per 15 minutes)
- Success/error states
- Honeypot bot protection

### ✅ **Real-time Waitlist Count**
- Live count display
- Auto-refreshes every 30 seconds
- Formatted numbers (1K, 1M, etc.)
- Loading states

### ✅ **Analytics Dashboard**
- Total signups
- Recent signups (24h)
- Growth rate
- Top sources
- Conversion tracking

### ✅ **Database Features**
- Automatic timestamps
- Status tracking (active, notified, converted, unsubscribed)
- Source tracking
- Referrer tracking
- Metadata support
- Optimized indexes

### ✅ **Security Features**
- Row Level Security (RLS)
- Rate limiting
- Input validation
- Bot protection
- SQL injection prevention

## Usage Examples

### Basic Waitlist Form
```tsx
import { WaitlistForm } from '@/components/WaitlistForm';

<WaitlistForm source="homepage" />
```

### With Waitlist Count
```tsx
import { WaitlistCount } from '@/components/WaitlistCount';

<WaitlistCount showDetails={true} />
```

### Analytics Dashboard
```tsx
import { WaitlistDashboard } from '@/components/WaitlistDashboard';

<WaitlistDashboard />
```

## API Functions

### Add to Waitlist
```typescript
import { addToWaitlist } from '@/lib/waitlistService';

await addToWaitlist({
  email: 'user@example.com',
  name: 'John Doe',
  source: 'homepage',
  referrer: 'https://google.com'
});
```

### Get Waitlist Stats
```typescript
import { getWaitlistStats } from '@/lib/waitlistService';

const stats = await getWaitlistStats();
console.log(stats.total_count); // Total signups
console.log(stats.recent_count); // Last 24 hours
console.log(stats.growth_rate); // Growth percentage
```

### Check if Email Exists
```typescript
import { isEmailInWaitlist } from '@/lib/waitlistService';

const exists = await isEmailInWaitlist('user@example.com');
```

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Check your `.env.local` file has the correct Supabase URL and key
   - Restart your development server after adding environment variables

2. **"Failed to add to waitlist"**
   - Check your Supabase RLS policies
   - Verify the `waitlist` table exists
   - Check the browser console for detailed error messages

3. **Rate limiting not working**
   - Rate limiting is client-side only
   - For production, implement server-side rate limiting

4. **Count not updating**
   - Check your Supabase connection
   - Verify the `waitlist_stats` view exists
   - Check browser console for errors

### Database Queries

View all waitlist entries:
```sql
SELECT * FROM waitlist ORDER BY created_at DESC;
```

Get waitlist statistics:
```sql
SELECT * FROM waitlist_stats;
```

Check recent signups:
```sql
SELECT * FROM waitlist 
WHERE created_at >= NOW() - INTERVAL '24 hours' 
ORDER BY created_at DESC;
```

## Production Deployment

1. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Ensure your Supabase project is in production mode
3. Test the waitlist form thoroughly
4. Monitor the Supabase dashboard for any issues

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Supabase configuration
3. Check the Supabase logs in your dashboard
4. Ensure all environment variables are set correctly

The new Supabase waitlist system provides a robust, scalable solution for managing your waitlist with real-time updates, analytics, and security features.
