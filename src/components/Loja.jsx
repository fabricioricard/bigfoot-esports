import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const shopItems = [
  // Reuse items from index.html and add more if needed
  {
    img: 'https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/image3.jpg',
    name: 'Moletom BIGFOOT Confortável',
    price: 'R$ 120,00',
  },
  {
    img: 'https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/image10.jpg',
    name: 'Mouse Gamer Ergonômico',
    price: 'R$ 120,00',
  },
  {
    img: 'https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/image6.jpg',
    name: 'Meias Estilosas BIGFOOT',
    price: 'R$ 20,00',
  },
  {
    img: 'https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/image4.jpg',
    name: 'Jaqueta Leve BIGFOOT',
    price: 'R$ 120,00',
  },
  // Add more items as needed
];

function Loja() {
  return (
    <main>
      <section id="loja" className="shop-section reveal">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Nossa Loja Completa
        </motion.h2>
        <div className="shop-items">
          {shopItems.map((item, index) => (
            <motion.div
              key={index}
              className="shop-item hover-effect"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={item.img} alt={item.name} className="hover-zoom" />
              <p>{item.name}</p>
              <p>{item.price}</p>
            </motion.div>
          ))}
        </div>
        <div className="shop-button-container">
          <Link to="/contato" className="btn btn-primary hover-effect">
            Entre em Contato para Comprar
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Loja;