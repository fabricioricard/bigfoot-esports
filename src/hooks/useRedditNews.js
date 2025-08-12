// src/hooks/useRedditNews.js
import { useState, useEffect } from 'react';

export const useRedditNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRedditNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Vamos usar dados mock por enquanto, já que o Reddit pode bloquear CORS
      const mockNews = [
        {
          id: '1',
          title: 'Worlds 2024: Final entre T1 e BLG promete ser épica',
          content: 'O campeonato mundial de League of Legends chegou à sua fase final com um confronto histórico entre duas das maiores equipes da atualidade.',
          author: 'RiotGames',
          created_utc: Date.now() - 3600000, // 1 hora atrás
          score: 1250,
          num_comments: 89,
          url: 'https://lolesports.com',
          thumbnail: '/images/lol-worlds.jpg'
        },
        {
          id: '2',
          title: 'Novo campeão Briar chega ao Rift com kit agressivo',
          content: 'A nova campeã vampira promete revolucionar a jungle com suas mecânicas únicas de cura e dano.',
          author: 'LeagueOfLegends',
          created_utc: Date.now() - 7200000, // 2 horas atrás
          score: 892,
          num_comments: 156,
          url: 'https://leagueoflegends.com',
          thumbnail: '/images/briar.jpg'
        },
        {
          id: '3',
          title: 'CBLOL 2024: Final acontece no Allianz Parque',
          content: 'O Campeonato Brasileiro de League of Legends terá sua grande final no maior estádio do país.',
          author: 'CBLoL',
          created_utc: Date.now() - 10800000, // 3 horas atrás
          score: 634,
          num_comments: 78,
          url: 'https://cblol.com.br',
          thumbnail: '/images/cblol.jpg'
        },
        {
          id: '4',
          title: 'Arena está de volta em nova versão melhorada',
          content: 'O modo de jogo favorito dos fãs retorna com novas mecânicas e campeões balanceados especialmente para o formato.',
          author: 'RiotGames',
          created_utc: Date.now() - 14400000, // 4 horas atrás
          score: 445,
          num_comments: 92,
          url: 'https://leagueoflegends.com',
          thumbnail: '/images/arena.jpg'
        },
        {
          id: '5',
          title: 'Patch 14.8 traz nerfs para Smolder e Viego',
          content: 'As mudanças de balance visam equilibrar o meta competitivo antes dos playoffs regionais.',
          author: 'RiotPhroxzon',
          created_utc: Date.now() - 18000000, // 5 horas atrás
          score: 378,
          num_comments: 203,
          url: 'https://leagueoflegends.com',
          thumbnail: '/images/patch.jpg'
        }
      ];

      setNews(mockNews);
    } catch (err) {
      setError('Erro ao carregar notícias');
      console.error('Erro ao buscar notícias:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedditNews();
  }, []);

  const refreshNews = () => {
    fetchRedditNews();
  };

  return {
    news,
    loading,
    error,
    refreshNews
  };
};
