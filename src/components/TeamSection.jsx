import { motion } from 'framer-motion';

function TeamSection() {
  return (
    <section className="team-section reveal">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Sobre a gente
      </motion.h2>
      <div className="team-content">
        <motion.div
          className="team-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p>A BIGFOOT Esports nasceu em 2019, quando montamos nosso primeiro time para disputar campeonatos amadores. O que começou como um projeto entre amigos rapidamente cresceu e se transformou em uma comunidade apaixonada por competição, superação e trabalho em equipe.</p>
          <p>BIGFOOT Esports, o melhor ainda está por vir.</p>
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
            alt="Time BIGFOOT"
            className="hover-zoom"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default TeamSection;