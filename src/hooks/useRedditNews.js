import { useState, useEffect } from 'react';
import { fetchRedditNews } from '../services/redditAPI';

export const useRedditNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const newsData = await fetchRedditNews();
        setNews(newsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  return { news, loading, error };
};