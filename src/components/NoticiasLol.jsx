import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function NoticiasLol() {
  return (
    <main>
      <section className="container reveal">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          📰 Notícias LoL
        </motion.h2>
        <div className="news-content">
          <motion.div
            className="news-item hover-effect"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Última Atualização do LoL</h3>
            <p>Confira as novidades do patch mais recente de League of Legends!</p>
            <Link to="#" className="btn btn-primary">Leia Mais</Link>
          </motion.div>
          <motion.div
            className="news-item hover-effect"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Torneio BIGFOOT LoL</h3>
            <p>Nosso time competiu no campeonato regional. Veja os destaques!</p>
            <Link to="#" className="btn btn-primary">Leia Mais</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default NoticiasLol;