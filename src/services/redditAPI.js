import axios from 'axios';

const getRedditAccessToken = async () => {
  const response = await axios.post(
    'https://www.reddit.com/api/v1/access_token',
    'grant_type=client_credentials',
    {
      auth: {
        username: import.meta.env.VITE_REDDIT_CLIENT_ID,
        password: import.meta.env.VITE_REDDIT_CLIENT_SECRET,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
  return response.data.access_token;
};

export const fetchRedditNews = async () => {
  try {
    const token = await getRedditAccessToken();
    const response = await axios.get('https://oauth.reddit.com/r/leagueoflegends/hot', {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 10 },
    });
    return response.data.data.children.map(post => ({
      id: post.data.id,
      title: post.data.title,
      url: post.data.url,
      thumbnail: post.data.thumbnail,
      created: post.data.created_utc,
      description: post.data.selftext || 'No description available',
    }));
  } catch (error) {
    console.error('Reddit API Error:', error);
    return [];
  }
};