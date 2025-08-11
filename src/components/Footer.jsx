import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.footer
      className="reveal"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="footer-content">
        <div className="footer-left">
          <p>BIGFOOT Esports</p>
          <p>bigftesports@gmail.com</p>
          <p>Brasil</p>
        </div>
        <div className="footer-right">
          <a href="https://discord.gg/3aHhvgzGSz" className="social-icon hover-effect">
            <img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/dc.svg" alt="Discord" />
          </a>
          <a href="https://x.com/BFTesports" className="social-icon hover-effect">
            <img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/x.svg" alt="X" />
          </a>
          <a href="https://youtube.com/@BIGFOOTEsports" className="social-icon hover-effect">
            <img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/yt.svg" alt="YouTube" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;