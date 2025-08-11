import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function DonationSection() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const copyPixKey = () => {
    const key = '773f51bf-d4d9-48bc-9b26-812ed63618a8';
    navigator.clipboard.writeText(key).then(() => {
      alert('Chave PIX copiada com sucesso!');
    }).catch(() => {
      alert('Erro ao copiar chave PIX.');
    });
  };

  return (
    <motion.div
      className={`donation-section ${isVisible ? 'floating' : 'hidden'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="donation-content">
        <span className="close" onClick={() => setIsVisible(false)}>×</span>
        <h1>Doação</h1>
        <p>Contribua com o <strong>BIGFOOT Esports</strong> via <strong>PIX</strong>! Escaneie o QR Code abaixo e fortaleça nossa jornada.</p>
        <img
          src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/qrcode-pix.jpg"
          alt="QR Code para doação"
          className="qr-code"
        />
        <p style={{ marginTop: '10px', wordBreak: 'break-all', fontSize: '14px', color: '#ccc' }}>
          Chave PIX: <span id="pix-key">773f51bf-d4d9-48bc-9b26-812ed63618a8</span>
        </p>
        <button onClick={copyPixKey} className="btn btn-primary" style={{ marginTop: '10px', fontSize: '14px', padding: '8px 16px' }}>
          Copiar chave PIX
        </button>
        <a href="/doacao" className="btn btn-primary hover-effect" style={{ display: 'block', marginTop: '12px', fontSize: '14px', padding: '8px 16px', textAlign: 'center' }}>
          Outras formas de doar
        </a>
      </div>
    </motion.div>
  );
}

export default DonationSection;