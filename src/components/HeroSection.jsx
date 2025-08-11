import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Bem-vindo ao BIGFOOT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Junte-se a nós e faça parte da evolução do esporte eletrônico!
        </motion.p>
        <div className="hero-buttons">
          <Link to="/lan-house" className="btn btn-primary hover-effect">
            Conheça nossa Comunidade
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;