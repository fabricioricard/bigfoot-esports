import { motion } from 'framer-motion';

function StatsSection() {
  return (
    <section className="stats-section reveal">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Nossos Números
      </motion.h2>
      <div className="stats-content">
        <motion.div
          className="stat-item"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="stat-number" data-target="50">50</h3>
          <p>Membros na Comunidade</p>
        </motion.div>
        <motion.div
          className="stat-item"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="stat-number" data-target="6">6</h3>
          <p>Anos de História</p>
        </motion.div>
      </div>
    </section>
  );
}

export default StatsSection;