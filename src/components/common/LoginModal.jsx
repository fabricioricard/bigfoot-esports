// src/components/common/LoginModal.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (error) {
      console.error('Erro na autenticação:', error);
      
      switch (error.code) {
        case 'auth/user-not-found':
          setError('Usuário não encontrado');
          break;
        case 'auth/wrong-password':
          setError('Senha incorreta');
          break;
        case 'auth/email-already-in-use':
          setError('Este e-mail já está em uso');
          break;
        case 'auth/weak-password':
          setError('A senha deve ter pelo menos 6 caracteres');
          break;
        case 'auth/invalid-email':
          setError('E-mail inválido');
          break;
        default:
          setError('Erro na autenticação. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      console.error('Erro no login com Google:', error);
      setError('Erro ao fazer login com Google');
    } finally {
      setLoading(false);
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
            <div className="bg-blue-600 p-2 rounded-lg">
              <span className="text-white text-lg">🔐</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {isLogin ? 'Entrar' : 'Criar Conta'}
              </h2>
              <p className="text-sm text-gray-400">
                {isLogin ? 'Acesse sua conta para ganhar tokens' : 'Crie sua conta e comece a ganhar'}
              </p>
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
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* E-mail */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 outline-none transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 outline-none transition-colors"
                placeholder="Sua senha"
                minLength={6}
              />
            </div>

            {/* Confirmar senha (apenas no cadastro) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 outline-none transition-colors"
                  placeholder="Confirme sua senha"
                  minLength={6}
                />
              </div>
            )}

            {/* Erro */}
            {error && (
              <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Benefícios */}
            {!isLogin && (
              <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-2">🎁 Benefícios da conta:</h4>
                <ul className="text-xs text-blue-100 space-y-1">
                  <li>• Ganhe 5 BIGFOOT por notícia lida</li>
                  <li>• Ganhe 10 BIGFOOT por anúncio assistido</li>
                  <li>• Resgate skins e RP grátis</li>
                  <li>• Converta para tokens Solana</li>
                </ul>
              </div>
            )}

            {/* Botão principal */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors font-semibold"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {isLogin ? 'Entrando...' : 'Criando conta...'}
                </div>
              ) : (
                isLogin ? '🚀 Entrar' : '✨ Criar Conta'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">ou</span>
            </div>
          </div>

          {/* Login com Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar com Google
          </button>

          {/* Toggle entre login/cadastro */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="text-blue-400 hover:text-blue-300 ml-1 font-medium"
              >
                {isLogin ? 'Criar conta' : 'Fazer login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
