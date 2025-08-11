import { motion } from 'framer-motion';
import { useNewsContext } from '../../context/NewsContext';

function NewsCard({ news, index }) {
  const { setSelectedNews, setShowAdModal } = useNewsContext();

  const handleClick = () => {
    setShowAdModal(true);
    setTimeout(() => {
      setShowAdModal(false);
      setSelectedNews(news);
    }, 15000); // 15-second ad
  };

  return (
    <motion.div
      className="news-item hover-effect"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      onClick={handleClick}
    >
      <img src={news.thumbnail} alt={news.title} className="news-thumbnail" />
      <h3>{news.title}</h3>
      <p>{news.description.slice(0, 100)}...</p>
    </motion.div>
  );
}

export default NewsCard;