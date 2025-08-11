import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function LanHouse() {
  return (
    <main>
      <section className="container reveal">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          🖥️ Lan House BIGFOOT
        </motion.h2>
        <motion.div
          className="lan-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>Visite nossa Lan House para uma experiência imersiva de jogos! Equipada com PCs de alta performance, cadeiras ergonômicas e uma comunidade vibrante.</p>
          <p>Horário: 10h às 22h, todos os dias.</p>
          <Link to="/contato" className="btn btn-primary hover-effect">
            Reserve seu Horário
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

export default LanHouse;