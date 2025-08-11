import { useState } from 'react';
import { auth, provider } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { motion, AnimatePresence } from 'framer-motion';

function LoginModal({ isOpen, setIsOpen }) {
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState({ login: '', register: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setIsOpen(false);
    } catch (err) {
      setError({ ...error, login: err.message });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerPassword.length < 6) {
      setError({ ...error, register: 'A senha deve ter no mínimo 6 caracteres.' });
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      setIsOpen(false);
    } catch (err) {
      setError({ ...error, register: err.message });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      setIsOpen(false);
    } catch (err) {
      setError({ ...error, login: err.message });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="modal-content"
            initial={{ y: 30, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="modal-close" onClick={() => setIsOpen(false)}>×</span>
            <div className="modal-header">
              <h2>🎮 Bem-vindo!</h2>
              <p>Faça login para acessar as notícias e ganhar pontos</p>
            </div>
            <div className="modal-body">
              <div className="modal-tabs">
                <div
                  className={`modal-tab ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </div>
                <div
                  className={`modal-tab ${activeTab === 'register' ? 'active' : ''}`}
                  onClick={() => setActiveTab('register')}
                >
                  Registro
                </div>
              </div>
              {activeTab === 'login' ? (
                <form id="login-form" onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="login-email">Email</label>
                    <input
                      type="email"
                      id="login-email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                    {error.login && <span className="error-text show">{error.login}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="login-password">Senha</label>
                    <input
                      type="password"
                      id="login-password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Sua senha"
                      required
                    />
                    {error.login && <span className="error-text show">{error.login}</span>}
                  </div>
                  <a
                    href="#"
                    className="text-primary text-right"
                    style={{ display: 'block', fontSize: '12px', marginBottom: '15px' }}
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Funcionalidade de redefinição de senha em desenvolvimento.');
                    }}
                  >
                    Esqueci minha senha
                  </a>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '15px' }}>
                    🚀 Entrar
                  </button>
                  <button type="button" className="btn-google" onClick={handleGoogleLogin}>
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.60 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuar com Google
                  </button>
                </form>
              ) : (
                <form id="register-form" onSubmit={handleRegister}>
                  <div className="form-group">
                    <label htmlFor="register-email">Email</label>
                    <input
                      type="email"
                      id="register-email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                    {error.register && <span className="error-text show">{error.register}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="register-password">Senha</label>
                    <input
                      type="password"
                      id="register-password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      required
                    />
                    {error.register && <span className="error-text show">{error.register}</span>}
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    🎯 Criar Conta
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoginModal;