// src/components/news/AdModal.jsx
import React, { useState, useEffect } from 'react';
import { useNews } from '../../context/NewsContext';

const AdModal = ({ onClose }) => {
  const { addPoints, addNotification } = useNews();
  const [timeLeft, setTimeLeft] = useState(15); // 15 segundos de anúncio
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanClose(true);
    }
  }, [timeLeft]);

  const handleClose = () => {
    if (canClose) {
      addPoints(10);
      addNotification('Você ganhou 10 BIGFOOT por assistir o anúncio!', 'success');
      onClose();
    }
  };

  const handleSkip = () => {
    if (timeLeft <= 5) { // Permite pular nos últimos 5 segundos
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl border border-gray-600">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              📺
            </div>
            <div>
              <h3 className="font-bold text-white">Anúncio Patrocinado</h3>
              <p className="text-sm text-gray-400">Assista para ganhar 10 BIGFOOT</p>
            </div>
          </div>
          
          <div className="text-white bg-gray-700 px-3 py-1 rounded-full text-sm">
            {timeLeft > 0 ? `${timeLeft}s` : 'Concluído!'}
          </div>
        </div>

        {/* Conteúdo do anúncio */}
        <div className="p-6 text-center">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 mb-6">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Bigfoot Esports
            </h2>
            <p className="text-blue-100 text-lg">
              A melhor experiência em esports!
            </p>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              🏆 Acompanhe as melhores equipes de League of Legends
            </p>
            <p>
              💰 Ganhe tokens BIGFOOT lendo notícias e participando da comunidade
            </p>
            <p>
              🎯 Use seus tokens para resgatar prêmios exclusivos
            </p>
            <p>
              🎪 Participe de eventos e torneios especiais
            </p>
          </div>

          {/* Barra de progresso */}
          <div className="mt-6">
            <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-1000 ease-linear"
                style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {timeLeft > 0 
                ? `Aguarde ${timeLeft} segundos para ganhar seus BIGFOOT tokens`
                : 'Anúncio concluído! Clique em "Receber Recompensa" para continuar'
              }
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-900 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Anúncio • Bigfoot Esports
          </div>
          
          <div className="flex gap-2">
            {timeLeft <= 5 && timeLeft > 0 && (
              <button
                onClick={handleSkip}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Pular ({5 - timeLeft + 1}s)
              </button>
            )}
            
            <button
              onClick={handleClose}
              disabled={!canClose}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${
                canClose
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {canClose ? '💰 Receber Recompensa' : `Aguarde ${timeLeft}s`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdModal;
