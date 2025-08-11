import { motion } from 'framer-motion';

function ContactSection() {
  return (
    <section id="contato" className="contact-section reveal">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Entre em Contato
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Entre em contato com a BIGFOOT Esports! Estamos sempre prontos para ouvir você e responder suas perguntas sobre nossa comunidade.
      </motion.p>
      <div className="contact-content">
        <motion.div
          className="contact-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/foto1.jpg"
            alt="Contato"
            className="hover-zoom"
          />
        </motion.div>
        <motion.form
          className="contact-form"
          action="https://formspree.io/f/meozrpvl"
          method="POST"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <input type="hidden" name="_next" value="/?status=success" />
          <div className="form-group">
            <label htmlFor="nome-contato">Nome *</label>
            <input type="text" id="nome-contato" name="nome" placeholder="Digite seu nome" required />
          </div>
          <div className="form-group">
            <label htmlFor="sobrenome-contato">Sobrenome *</label>
            <input type="text" id="sobrenome-contato" name="sobrenome" placeholder="Digite seu sobrenome" required />
          </div>
          <div className="form-group full-width">
            <label htmlFor="email-contato">Email *</label>
            <input type="email" id="email-contato" name="_replyto" placeholder="Digite seu email" required />
          </div>
          <div className="form-group full-width">
            <label htmlFor="mensagem">Mensagem *</label>
            <textarea id="mensagem" name="mensagem" placeholder="Digite sua mensagem aqui..." rows="5" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary hover-effect">Enviar Mensagem</button>
        </motion.form>
      </div>
    </section>
  );
}

export default ContactSection;