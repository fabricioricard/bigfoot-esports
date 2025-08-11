import { motion } from 'framer-motion';
import { useNewsContext } from '../../context/NewsContext';
import { useRedditNews } from '../../hooks/useRedditNews';
import NewsCard from './NewsCard';
import AdModal from './AdModal';
import NewsModal from './NewsModal';
import PointsDisplay from './PointsDisplay';

function NewsPage() {
  const { news, loading, error } = useRedditNews();
  const { selectedNews, showAdModal } = useNewsContext();

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
        <PointsDisplay />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className="news-content">
          {news.map((item, index) => (
            <NewsCard key={item.id} news={item} index={index} />
          ))}
        </div>
        {showAdModal && <AdModal />}
        {selectedNews && <NewsModal />}
      </section>
    </main>
  );
}

export default NewsPage;