import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Doacao() {
  const copyPixKey = () => {
    const key = '773f51bf-d4d9-48bc-9b26-812ed63618a8';
    navigator.clipboard.writeText(key).then(() => {
      alert('Chave PIX copiada com sucesso!');
    }).catch(() => {
      alert('Erro ao copiar chave PIX.');
    });
  };

  return (
    <main>
      <section className="container reveal">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          💰 Apoie a BIGFOOT Esports
        </motion.h2>
        <motion.div
          className="donation-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>Contribua com o <strong>BIGFOOT Esports</strong> via <strong>PIX</strong>! Escaneie o QR Code abaixo ou use outras formas de doação.</p>
          <img
            src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/qrcode-pix.jpg"
            alt="QR Code para doação"
            className="qr-code"
          />
          <p style={{ marginTop: '10px', wordBreak: 'break-all', fontSize: '14px', color: '#ccc' }}>
            Chave PIX: <span id="pix-key">773f51bf-d4d9-48bc-9b26-812ed63618a8</span>
          </p>
          <button
            onClick={copyPixKey}
            className="btn btn-primary"
            style={{ marginTop: '10px', fontSize: '14px', padding: '8px 16px' }}
          >
            Copiar chave PIX
          </button>
          <div style={{ marginTop: '20px' }}>
            <h3>Outras Formas de Doar</h3>
            <p>PayPal: <a href="mailto:bigftesports@gmail.com">bigftesports@gmail.com</a></p>
            <p>Cartão de Crédito: Em breve!</p>
          </div>
          <Link to="/contato" className="btn btn-primary hover-effect" style={{ marginTop: '12px' }}>
            Fale Conosco
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

export default Doacao;