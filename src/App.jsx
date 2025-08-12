// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext';

// Componentes existentes
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import TeamSection from './components/TeamSection';
import DonationSection from './components/DonationSection';
import ShopSection from './components/ShopSection';
import ContactSection from './components/ContactSection';
import BackToTop from './components/common/BackToTop';

// Páginas existentes
import Loja from './components/Loja';
import LanHouse from './components/LanHouse';
import Doacao from './components/Doacao';
import EquipeLol from './components/EquipeLol';

// Nova página de notícias
import NewsPage from './components/news/NewsPage';

import './assets/styles.css';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Controle do botão de voltar ao topo
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Componente da página inicial
  const HomePage = () => (
    <main>
      <HeroSection />
      <StatsSection />
      <TeamSection />
      <DonationSection />
      <ShopSection />
      <ContactSection />
      {showBackToTop && <BackToTop />}
    </main>
  );

  return (
    <NewsProvider>
      <Router>
        <div className="App">
          <Header />
          
          <Routes>
            {/* Página inicial */}
            <Route path="/" element={<HomePage />} />
            
            {/* Páginas existentes */}
            <Route path="/loja" element={<Loja />} />
            <Route path="/lan-house" element={<LanHouse />} />
            <Route path="/doacao" element={<Doacao />} />
            <Route path="/equipe-lol" element={<EquipeLol />} />
            
            {/* Nova página de notícias */}
            <Route path="/noticias-lol" element={<NewsPage />} />
            
            {/* Rota de fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </NewsProvider>
  );
}

export default App;
