import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase/firebaseConfig';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DonationSection from './components/DonationSection';
import StatsSection from './components/StatsSection';
import ShopSection from './components/ShopSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import LoginModal from './components/LoginModal';
import NoticiasLol from './components/NoticiasLol';
import Loja from './components/Loja';
import LanHouse from './components/LanHouse';
import Doacao from './components/Doacao';
import EquipeLol from './components/EquipeLol';

function App() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? { email: user.email, displayName: user.displayName, photoURL: user.photoURL } : null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        <Header user={user} setModalOpen={setModalOpen} />
        <LoginModal isOpen={modalOpen} setIsOpen={setModalOpen} />
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
            <Route path="/noticias-lol" element={<NoticiasLol />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/lan-house" element={<LanHouse />} />
            <Route path="/doacao" element={<Doacao />} />
            <Route path="/equipe-lol" element={<EquipeLol />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;