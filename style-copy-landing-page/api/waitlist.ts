import type { VercelRequest, VercelResponse } from '@vercel/node';

interface WaitlistPayload {
  name: string;
  email: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeName(name: string): string {
  return name.trim().replace(/\s+/g, ' ').slice(0, 100);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const allowedOrigin = process.env.CORS_ALLOW_ORIGIN || 'https://www.wearatmos.com';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const SHEETY_API_URL = process.env.SHEETY_API_URL;
  const SHEETY_API_KEY = process.env.SHEETY_API_KEY;

  if (!SHEETY_API_URL || !SHEETY_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Basic Origin enforcement (helps prevent browser-originated abuse)
    const requestOrigin = (req.headers.origin as string) || '';
    if (allowedOrigin && requestOrigin && requestOrigin !== allowedOrigin) {
      return res.status(403).json({ error: 'Forbidden origin' });
    }

    const body: (WaitlistPayload & { website?: string }) = req.body || {};
    // Honeypot: reject if hidden field is filled
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return res.status(400).json({ error: 'Bot detected' });
    }
    const name = sanitizeName(String(body.name || ''));
    const email = String(body.email || '').trim();

    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Invalid name' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const sheetyResponse = await fetch(SHEETY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SHEETY_API_KEY}`,
      },
      body: JSON.stringify({
        sheet1: {
          name,
          email,
          createdAt: new Date().toISOString(),
        },
      }),
    });

    if (!sheetyResponse.ok) {
      const text = await sheetyResponse.text();
      return res.status(502).json({ error: 'Upstream error', details: text });
    }

    const data = await sheetyResponse.json();
    return res.status(200).json({ success: true, data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown';
    return res.status(500).json({ error: 'Unexpected error', message: errorMessage });
  }
}


