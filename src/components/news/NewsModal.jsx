import { motion } from 'framer-motion';
import { useNewsContext } from '../../context/NewsContext';
import { usePoints } from '../../hooks/usePoints';
import { awardPoints } from '../../services/pointsService';
import { useNotifications } from '../../hooks/useNotifications';
import { useEffect } from 'react';

function NewsModal() {
  const { selectedNews, setSelectedNews } = useNewsContext();
  const { user } = usePoints();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (user && selectedNews) {
      awardPoints(user.uid, selectedNews.id).then((result) => {
        if (result.success) {
          addNotification('10 points awarded!');
        } else {
          addNotification(result.message, 'error');
        }
      });
    }
  }, [user, selectedNews]);

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedNews(null)}
    >
      <motion.div
        className="modal-content"
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 30, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="modal-close" onClick={() => setSelectedNews(null)}>×</span>
        <h2>{selectedNews.title}</h2>
        <p>{selectedNews.description}</p>
        <a href={selectedNews.url} target="_blank" rel="noopener noreferrer">
          Read Full Article
        </a>
      </motion.div>
    </motion.div>
  );
}

export default NewsModal;