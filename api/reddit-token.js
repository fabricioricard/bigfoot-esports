// api/reddit-token.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const client_id = process.env.VITE_REDDIT_CLIENT_ID;
  const client_secret = process.env.VITE_REDDIT_CLIENT_SECRET;

  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorData = await response.text();
      return res.status(response.status).send(errorData);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch token' });
  }
}
