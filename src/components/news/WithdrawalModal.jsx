// src/components/news/WithdrawalModal.jsx
import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';

const WithdrawalModal = ({ onClose }) => {
  const { userPoints, spendPoints, addNotification } = useNews();
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const minWithdrawal = 100;
  const fee = 0.05; // 5% de taxa

  const handleWithdrawal = async () => {
    const withdrawAmount = parseInt(amount);
    
    if (!withdrawAmount || withdrawAmount < minWithdrawal) {
      addNotification(`Valor mínimo de resgate é ${minWithdrawal} BIGFOOT`, 'error');
      return;
    }

    if (withdrawAmount > userPoints) {
      addNotification('Saldo insuficiente', 'error');
      return;
    }

    if (!walletAddress.trim()) {
      addNotification('Digite o endereço da carteira Solana', 'error');
      return;
    }

    // Validação básica do endereço Solana
    if (walletAddress.length < 32 || walletAddress.length > 44) {
      addNotification('Endereço de carteira inválido', 'error');
      return;
    }

    setLoading(true);

    try {
      // Simular processo de resgate
      await new Promise(resolve => setTimeout(resolve, 3000));

      const finalAmount = Math.floor(withdrawAmount * (1 - fee));
      
      if (spendPoints(withdrawAmount)) {
        addNotification(
          `Resgate de ${finalAmount} BIGFOOT tokens iniciado! Você receberá em até 24h.`, 
          'success'
        );
        onClose();
      } else {
        addNotification('Erro ao processar resgate', 'error');
      }
    } catch (error) {
      addNotification('Erro ao processar resgate. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const calculateFinalAmount = () => {
    const withdrawAmount = parseInt(amount) || 0;
    return Math.floor(withdrawAmount * (1 - fee));
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
      <div className="bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl border border-gray-600">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-600 p-2 rounded-lg">
              💸
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Resgatar BIGFOOT</h3>
              <p className="text-sm text-gray-400">Convertir para tokens Solana</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6">
          {/* Saldo atual */}
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm mb-1">Saldo Disponível</p>
            <div className="text-2xl font-bold text-yellow-400">
              🪙 {userPoints.toLocaleString('pt-BR')} BIGFOOT
            </div>
          </div>

          {/* Campo de valor */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Valor para Resgate
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Mínimo ${minWithdrawal}`}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 outline-none"
                min={minWithdrawal}
                max={userPoints}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                BIGFOOT
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Mínimo: {minWithdrawal} BIGFOOT • Máximo: {userPoints.toLocaleString('pt-BR')} BIGFOOT
            </p>
          </div>

          {/* Campo de endereço da carteira */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Endereço da Carteira Solana
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Ex: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Digite o endereço da sua carteira Phantom, Solflare ou similar
            </p>
          </div>

          {/* Resumo da transação */}
          {amount && parseInt(amount) >= minWithdrawal && (
            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-3">Resumo da Transação</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Valor solicitado:</span>
                  <span className="text-white">{parseInt(amount).toLocaleString('pt-BR')} BIGFOOT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Taxa de rede (5%):</span>
                  <span className="text-red-400">-{Math.floor(parseInt(amount) * fee).toLocaleString('pt-BR')} BIGFOOT</span>
                </div>
                <div className="border-t border-gray-600 pt-2 flex justify-between font-semibold">
                  <span className="text-gray-300">Você receberá:</span>
                  <span className="text-green-400">{calculateFinalAmount().toLocaleString('pt-BR')} BIGFOOT</span>
                </div>
              </div>
            </div>
          )}

          {/* Informações importantes */}
          <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
            <div className="flex gap-3">
              <span className="text-blue-400 text-lg">ℹ️</span>
              <div className="text-sm text-blue-100">
                <p className="font-semibold mb-1">Informações importantes:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Processamento em até 24 horas</li>
                  <li>• Taxa de rede: 5% do valor</li>
                  <li>• Transação irreversível</li>
                  <li>• Verifique o endereço da carteira</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleWithdrawal}
            disabled={loading || !amount || parseInt(amount) < minWithdrawal || !walletAddress.trim()}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors font-semibold"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processando...
              </div>
            ) : (
              '💸 Confirmar Resgate'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;
