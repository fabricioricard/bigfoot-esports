// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo e descrição */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BF</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Bigfoot Esports
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              A melhor experiência em esports do Brasil. Acompanhe nossas equipes, 
              participe da comunidade e ganhe recompensas exclusivas.
            </p>
            
            {/* Redes sociais */}
            <div className="flex gap-3">
              <a 
                href="https://discord.gg/bigfoot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
              </a>
              
              <a 
                href="https://instagram.com/bigfootesports" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a 
                href="https://twitter.com/bigfootesports" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-colors group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>

              <a 
                href="https://youtube.com/bigfootesports" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link 
                  to="/noticias-lol" 
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Notícias LoL
                </Link>
              </li>
              <li>
                <Link 
                  to="/equipe-lol" 
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Equipe LoL
                </Link>
              </li>
              <li>
                <Link 
                  to="/loja" 
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Loja
                </Link>
              </li>
              <li>
                <Link 
                  to="/lan-house" 
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Lan House
                </Link>
              </li>
              <li>
                <Link 
                  to="/doacao" 
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Doações
                </Link>
              </li>
            </ul>
          </div>

          {/* BIGFOOT Tokens */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">BIGFOOT Tokens</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Leia notícias e ganhe tokens
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Assista anúncios por recompensas
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Resgate skins e RP grátis
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Converta para tokens Solana
              </li>
            </ul>
            <div className="mt-4">
              <Link 
                to="/noticias-lol"
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-2"
              >
                <span>🪙</span>
                Começar a ganhar
              </Link>
            </div>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:contato@bigfootesports.com.br" 
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
                >
                  <span>📧</span>
                  contato@bigfootesports.com.br
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/bigfoot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
                >
                  <span>💬</span>
                  Discord Oficial
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
                >
                  <span>📱</span>
                  WhatsApp
                </a>
              </li>
              <li>
                <div className="text-gray-400 text-sm flex items-center gap-2">
                  <span>🕒</span>
                  Seg-Sex: 9h às 18h
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} Bigfoot Esports. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="/termos" className="hover:text-blue-400 transition-colors">
                Termos de Uso
              </a>
              <a href="/privacidade" className="hover:text-blue-400 transition-colors">
                Política de Privacidade
              </a>
              <a href="/cookies" className="hover:text-blue-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>

          {/* Badge de tecnologias */}
          <div className="mt-4 pt-4 border-t border-gray-800/50 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span>⚛️</span>
                React
              </span>
              <span className="flex items-center gap-1">
                <span>🔥</span>
                Firebase
              </span>
              <span className="flex items-center gap-1">
                <span>◎</span>
                Solana
              </span>
              <span className="flex items-center gap-1">
                <span>🎮</span>
                Riot Games API
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
