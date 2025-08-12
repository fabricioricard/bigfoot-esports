// src/components/news/NewsPage.jsx
import { motion } from 'framer-motion';
import { useNews } from '../../context/NewsContext'; // Changed from useNewsContext to useNews
import { useRedditNews } from '../../hooks/useRedditNews';
import { useSolanaWallet } from '../../hooks/useSolanaWallet';
import NewsCard from './NewsCard';
import AdModal from './AdModal';
import NewsModal from './NewsModal';
import PointsDisplay from './PointsDisplay';

function NewsPage() {
  const { news, loading, error } = useRedditNews();
  const { selectedNews, showAdModal } = useNews(); // Changed from useNewsContext to useNews
  const { publicKey, connectWallet } = useSolanaWallet();

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
        {!publicKey && (
          <button
            className="btn btn-primary"
            onClick={() => connectWallet('Phantom')}
          >
            Connect Solana Wallet
          </button>
        )}
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
