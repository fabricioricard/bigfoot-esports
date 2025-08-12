// src/components/news/NewsModal.jsx
import React, { useEffect } from 'react';
import { useNews } from '../../context/NewsContext';

const NewsModal = ({ news, onClose }) => {
  const { user, addPoints, addNotification } = useNews();

  useEffect(() => {
    // Impede o scroll do body quando o modal está aberto
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleReadComplete = () => {
    if (user) {
      addPoints(5);
      addNotification('Você ganhou 5 BIGFOOT por ler a notícia!', 'success');
    }
  };

  const handleExternalLink = () => {
    window.open(news.url, '_blank');
    handleReadComplete();
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fecha o modal ao clicar no overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Fecha o modal com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-800 rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-600 animate-fadeIn">
        {/* Header do modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              🎮
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Notícia LoL</h2>
              <p className="text-gray-400 text-sm">
                Por u/{news.author} • {formatDate(news.created_utc)}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conteúdo do modal */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <h1 className="text-2xl font-bold text-white mb-4">
            {news.title}
          </h1>

          {/* Stats da notícia */}
          <div className="flex items-center gap-6 mb-6 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              ⬆ <strong className="text-green-400">{news.score}</strong> upvotes
            </span>
            <span className="flex items-center gap-1">
              💬 <strong className="text-blue-400">{news.num_comments}</strong> comentários
            </span>
            {user && (
              <span className="text-green-400 font-semibold">
                +5 BIGFOOT ao ler
              </span>
            )}
          </div>

          {/* Conteúdo da notícia */}
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {news.content}
            </p>

            {/* Conteúdo expandido mock */}
            <div className="space-y-4 text-gray-300">
              <p>
                Esta notícia representa uma das principais discussões na comunidade do League of Legends. 
                Os desenvolvedores da Riot Games continuam trabalhando para melhorar a experiência dos jogadores, 
                implementando mudanças baseadas no feedback da comunidade.
              </p>
              
              <p>
                O impacto dessas mudanças pode ser sentido tanto no cenário competitivo quanto nos jogos casuais. 
                A equipe de desenvolvimento monitora constantemente as estatísticas de jogo para garantir 
                que o meta permaneça equilibrado e divertido para todos os jogadores.
              </p>

              <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="italic">
                  "Nosso objetivo é sempre proporcionar a melhor experiência possível para nossa comunidade global de jogadores." 
                  - Equipe da Riot Games
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer do modal */}
        <div className="p-6 border-t border-gray-700 bg-gray-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleReadComplete}
                disabled={!user}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>✓</span>
                {user ? 'Marcar como lida (+5 BIGFOOT)' : 'Faça login para ganhar pontos'}
              </button>

              <button
                onClick={handleExternalLink}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>🔗</span>
                Ver fonte original
              </button>
            </div>

            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
