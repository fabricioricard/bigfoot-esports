// src/components/news/NewsCard.jsx
import React from 'react';

const NewsCard = ({ news, onClick }) => {
  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m atrás`;
    } else if (hours < 24) {
      return `${hours}h atrás`;
    } else {
      return `${days}d atrás`;
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:bg-gray-800 border border-gray-700 hover:border-blue-400"
    >
      {/* Imagem/Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden">
        {news.thumbnail && news.thumbnail !== 'self' ? (
          <img 
            src={news.thumbnail} 
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Placeholder quando não há imagem */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <div className="text-white text-4xl">🎮</div>
        </div>

        {/* Overlay com score */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-semibold">
          ⬆ {news.score}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {news.title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-3 line-clamp-3">
          {truncateText(news.content)}
        </p>

        {/* Meta informações */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-3">
            <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
              u/{news.author}
            </span>
            <span className="flex items-center gap-1">
              💬 {news.num_comments}
            </span>
          </div>
          <span>{formatTimeAgo(news.created_utc)}</span>
        </div>
      </div>

      {/* Indicador de hover */}
      <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default NewsCard;
