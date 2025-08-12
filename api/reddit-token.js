// backend/api/reddit-token.js (ou src/pages/api/reddit-token.js para Next.js)

import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientId = process.env.VITE_REDDIT_CLIENT_ID;
  const clientSecret = process.env.VITE_REDDIT_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Missing Reddit client credentials' });
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'bigfoot-esports-app',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Reddit token error:', text);
      return res.status(response.status).json({ error: 'Failed to get token from Reddit' });
    }

    const data = await response.json();
    return res.status(200).json(data); // contains access_token, expires_in, etc.
  } catch (err) {
    console.error('Error fetching Reddit token:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
