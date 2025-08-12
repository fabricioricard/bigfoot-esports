// src/components/news/UserDashboard.jsx
import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import WithdrawalModal from './WithdrawalModal';

const UserDashboard = ({ onClose }) => {
  const { user, userPoints } = useNews();
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data para transações
  const transactions = [
    { id: 1, type: 'earn', amount: 10, description: 'Anúncio assistido', date: new Date(Date.now() - 3600000) },
    { id: 2, type: 'earn', amount: 5, description: 'Notícia lida', date: new Date(Date.now() - 7200000) },
    { id: 3, type: 'spend', amount: -50, description: 'Resgate de skin', date: new Date(Date.now() - 86400000) },
    { id: 4, type: 'earn', amount: 15, description: 'Participação em evento', date: new Date(Date.now() - 172800000) }
  ];

  const stats = {
    totalEarned: 245,
    totalSpent: 95,
    newsRead: 12,
    adsWatched: 8
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-600">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-purple-900 to-blue-900">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-full">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Dashboard</h2>
              <p className="text-gray-300">{user?.email}</p>
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

        {/* Tabs */}
        <div className="border-b border-gray-700">
          <div className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'transactions'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Transações
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'rewards'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Recompensas
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Saldo atual */}
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-6 text-center">
                <h3 className="text-white text-lg font-semibold mb-2">Saldo Atual</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  🪙 {userPoints.toLocaleString('pt-BR')}
                </div>
                <p className="text-yellow-100">BIGFOOT Tokens</p>
                <button
                  onClick={() => setShowWithdrawal(true)}
                  className="mt-4 bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  💸 Resgatar Tokens
                </button>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {stats.totalEarned}
                  </div>
                  <p className="text-sm text-gray-300">Total Ganho</p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-400 mb-1">
                    {stats.totalSpent}
                  </div>
                  <p className="text-sm text-gray-300">Total Gasto</p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {stats.newsRead}
                  </div>
                  <p className="text-sm text-gray-300">Notícias Lidas</p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {stats.adsWatched}
                  </div>
                  <p className="text-sm text-gray-300">Anúncios Vistos</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Histórico de Transações</h3>
              
              <div className="space-y-3">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'earn' ? 'bg-green-600' : 'bg-red-600'
                      }`}>
                        {transaction.type === 'earn' ? '📈' : '📉'}
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-400">
                          {transaction.date.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className={`font-bold ${
                      transaction.type === 'earn' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} BIGFOOT
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Recompensas Disponíveis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-center mb-3">
                    <div className="text-3xl mb-2">🎮</div>
                    <h4 className="font-bold text-white">Skin LoL</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Resgate uma skin aleatória para League of Legends
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-bold">500 BIGFOOT</span>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      Resgatar
                    </button>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-center mb-3">
                    <div className="text-3xl mb-2">💎</div>
                    <h4 className="font-bold text-white">RP Grátis</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Receba 650 RP para sua conta do LoL
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-bold">750 BIGFOOT</span>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      Resgatar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showWithdrawal && (
        <WithdrawalModal onClose={() => setShowWithdrawal(false)} />
      )}
    </div>
  );
};

export default UserDashboard;
