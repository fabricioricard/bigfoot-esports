import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Connection } from '@solana/web3.js';
import { auth } from './firebase/firebaseConfig';
import { NewsProvider } from './context/NewsContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginModal from './components/common/LoginModal';
import BackToTop from './components/common/BackToTop';
import NotificationToast from './components/common/NotificationToast';
import HeroSection from './components/HeroSection';
import DonationSection from './components/DonationSection';
import StatsSection from './components/StatsSection';
import ShopSection from './components/ShopSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import NewsPage from './components/news/NewsPage';
import Loja from './components/Loja';
import LanHouse from './components/LanHouse';
import Doacao from './components/Doacao';
import EquipeLol from './components/EquipeLol';
import UserDashboard from './components/news/UserDashboard';
import { initializeAnalytics, trackPageView } from './services/analyticsService';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const wallets = [new PhantomWalletAdapter()];
  const connection = new Connection(import.meta.env.VITE_SOLANA_RPC_URL, 'confirmed');

  useEffect(() => {
    initializeAnalytics();
    trackPageView(window.location.pathname);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? { email: user.email, displayName: user.displayName, photoURL: user.photoURL } : null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ConnectionProvider endpoint={import.meta.env.VITE_SOLANA_RPC_URL}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <NewsProvider>
              <div>
                <Header user={user} setModalOpen={setModalOpen} />
                <LoginModal isOpen={modalOpen} setIsOpen={setModalOpen} />
                <NotificationToast />
                <main>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <>
                          <HeroSection />
                          <DonationSection />
                          <StatsSection />
                          <ShopSection />
                          <TeamSection />
                          <ContactSection />
                        </>
                      }
                    />
                    <Route path="/noticias-lol" element={<NewsPage />} />
                    <Route path="/loja" element={<Loja />} />
                    <Route path="/lan-house" element={<LanHouse />} />
                    <Route path="/doacao" element={<Doacao />} />
                    <Route path="/equipe-lol" element={<EquipeLol />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
                  </Routes>
                </main>
                <Footer />
                <BackToTop />
              </div>
            </NewsProvider>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;