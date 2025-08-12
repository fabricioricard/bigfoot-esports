// src/context/NewsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userPoints, setUserPoints] = useState(0);

  // Função para buscar notícias
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // Aqui você pode implementar a lógica para buscar notícias
      // Por exemplo, de uma API ou dados mockados
      const mockNews = [
        {
          id: 1,
          title: "Championship Finals This Weekend",
          content: "The biggest esports event of the year is happening this weekend...",
          date: new Date().toISOString(),
          points: 10
        },
        {
          id: 2,
          title: "New Tournament Announced",
          content: "A new tournament with $100,000 prize pool has been announced...",
          date: new Date().toISOString(),
          points: 15
        }
      ];
      
      setNews(mockNews);
    } catch (err) {
      setError('Failed to fetch news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar pontos do usuário
  const addPoints = (points) => {
    setUserPoints(prevPoints => prevPoints + points);
  };

  // Função para resetar pontos
  const resetPoints = () => {
    setUserPoints(0);
  };

  // Função para marcar notícia como lida
  const markAsRead = (newsId) => {
    setNews(prevNews => 
      prevNews.map(item => 
        item.id === newsId 
          ? { ...item, isRead: true }
          : item
      )
    );
  };

  const value = {
    news,
    setNews,
    loading,
    error,
    userPoints,
    setUserPoints,
    fetchNews,
    addPoints,
    resetPoints,
    markAsRead
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

// Exportação do contexto para uso direto se necessário
export { NewsContext };
