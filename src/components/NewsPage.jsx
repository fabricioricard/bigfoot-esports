// src/components/news/NewsPage.jsx
import React, { useState, useEffect } from 'react';
import { useRedditNews } from '../../hooks/useRedditNews';
import { useNews } from '../../context/NewsContext'; // usa o hook correto (useNews)
import NewsCard from './NewsCard';
import NewsModal from './NewsModal';
import AdModal from './AdModal';
import PointsDisplay from './PointsDisplay';
import UserDashboard from './UserDashboard';
import NotificationToast from '../common/NotificationToast';

const NewsPage = () => {
  const { news, loading, error, refreshNews } = useRedditNews();
  const { user, notifications } = useNews(); // usa useNews aqui
  const [selectedNews, setSelectedNews] = useState(null);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const handleNewsClick = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  const handleShowAd = () => {
    if (!user) {
      alert('Você precisa estar logado para ganhar pontos!');
      return;
    }
    setShowAdModal(true);
  };

  const filteredAndSortedNews = React.useMemo(() => {
    let filtered = news;

    if (filter !== 'all') {
      filtered = news.filter(item => {
        const title = item.title.toLowerCase();
        switch (filter) {
          case 'worlds':
            return title.includes('worlds') || title.includes('mundial');
          case 'patch':
            return title.includes('patch') || title.includes('update');
          case 'champions':
            return title.includes('campeão') || title.includes('champion');
          case 'esports':
            return title.includes('cblol') || title.includes('lcs') || title.includes('lec');
          default:
            return true;
        }
      });
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.score - a.score;
        case 'comments':
          return b.num_comments - a.num_comments;
        case 'recent':
        default:
          return b.created_utc - a.created_utc;
      }
    });
  }, [news, filter, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            <p className="text-white mt-4">Carregando notícias do LoL...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Erro ao carregar notícias</h2>
            <p className="mb-4">{error}</p>
            <button 
              onClick={refreshNews}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Notícias LoL
          </h1>
          <p className="text-gray-300 text-lg">
            Fique por dentro das últimas novidades do League of Legends
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-400 outline-none"
            >
              <option value="all">Todas as notícias</option>
              <option value="worlds">Worlds</option>
              <option value="patch">Patches</option>
              <option value="champions">Campeões</option>
              <option value="esports">Esports</option>
            </select>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-400 outline-none"
            >
              <option value="recent">Mais recentes</option>
              <option value="popular">Mais populares</option>
              <option value="comments">Mais comentadas</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleShowAd}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>💰</span>
              Assistir Anúncio (+10 BIGFOOT)
            </button>

            {user && <PointsDisplay />}

            {user && (
              <button
                onClick={() => setShowDashboard(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Dashboard
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedNews.map((newsItem) => (
            <NewsCard
              key={newsItem.id}
              news={newsItem}
              onClick={() => handleNewsClick(newsItem)}
            />
          ))}
        </div>

        {filteredAndSortedNews.length === 0 && (
          <div className="text-center text-gray-300 py-12">
            <h3 className="text-xl font-semibold mb-2">Nenhuma notícia encontrada</h3>
            <p>Tente ajustar os filtros ou recarregar a página.</p>
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={refreshNews}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            🔄 Recarregar Notícias
          </button>
        </div>
      </div>

      {selectedNews && (
        <NewsModal 
          news={selectedNews} 
          onClose={handleCloseModal}
        />
      )}

      {showAdModal && (
        <AdModal 
          onClose={() => setShowAdModal(false)}
        />
      )}

      {showDashboard && (
        <UserDashboard 
          onClose={() => setShowDashboard(false)}
        />
      )}

      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
