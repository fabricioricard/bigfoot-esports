import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function EquipeLol() {
  return (
    <main>
      <section className="team-section reveal">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          👥 Nossa Equipe LoL
        </motion.h2>
        <div className="team-content">
          <motion.div
            className="team-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>Conheça os jogadores que representam a BIGFOOT Esports nos torneios de League of Legends! Nosso time é formado por talentos dedicados e apaixonados.</p>
            <p>Quer se juntar a nós? Entre em contato!</p>
            <Link to="/contato" className="btn btn-primary hover-effect">Entre em Contato</Link>
          </motion.div>
          <motion.div
            className="team-image hover-effect"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/equipe.jpg"
              alt="Time BIGFOOT LoL"
              className="hover-zoom"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default EquipeLol;