// src/components/common/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNews } from '../../context/NewsContext';
import LoginModal from './LoginModal';
import PointsDisplay from '../news/PointsDisplay';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const { user, loading } = useNews();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navigationLinks = [
    { path: '/', label: 'Início' },
    { path: '/noticias-lol', label: 'Notícias LoL', badge: '🔥' },
    { path: '/equipe-lol', label: 'Equipe LoL' },
    { path: '/loja', label: 'Loja' },
    { path: '/lan-house', label: 'Lan House' },
    { path: '/doacao', label: 'Doações' }
  ];

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 hover:scale-105 transition-transform"
              onClick={closeMenu}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BF</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Bigfoot Esports
              </span>
            </Link>

            {/* Menu Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-medium transition-all duration-300 hover:text-blue-400 flex items-center gap-2 ${
                    isActiveRoute(link.path)
                      ? 'text-blue-400'
                      : 'text-gray-300'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-sm">{link.badge}</span>
                  )}
                  {isActiveRoute(link.path) && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Área do usuário */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <PointsDisplay />
                  <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      {user.email?.split('@')[0]}
                    </span>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 py-2 rounded-full transition-all duration-300 font-medium"
                  >
                    Entrar
                  </button>
                  <Link
                    to="/noticias-lol"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                  >
                    🪙 Ganhar Tokens
                  </Link>
                </div>
              )}
            </div>

            {/* Botão do menu mobile */}
            <button 
              onClick={toggleMenu}
              className="lg:hidden relative w-8 h-8 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                <span className="block w-6 h-0.5 bg-white transition-all duration-300"></span>
                <span className="block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5"></span>
                <span className="block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5"></span>
              </div>
            </button>
          </div>

          {/* Menu Mobile */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}>
            <nav className="bg-gray-800/95 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <div className="space-y-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={`block py-2 px-4 rounded-lg transition-colors flex items-center justify-between ${
                      isActiveRoute(link.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                      {link.badge && (
                        <span className="text-sm">{link.badge}</span>
                      )}
                    </span>
                    {isActiveRoute(link.path) && (
                      <span className="text-blue-200">✓</span>
                    )}
                  </Link>
                ))}
                
                <div className="border-t border-gray-700 pt-4 mt-4">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {user.email?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">
                            {user.email?.split('@')[0]}
                          </div>
                          <div className="text-gray-400 text-xs">{user.email}</div>
                        </div>
                      </div>
                      <PointsDisplay />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setShowLoginModal(true);
                          closeMenu();
                        }}
                        className="w-full bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white py-2 px-4 rounded-lg transition-all duration-300 font-medium"
                      >
                        Entrar
                      </button>
                      <Link
                        to="/noticias-lol"
                        onClick={closeMenu}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-300 font-medium text-center block"
                      >
                        🪙 Ganhar Tokens
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Modal de Login */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      <style jsx>{`
        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
      `}</style>
    </>
  );
};

export default Header;
