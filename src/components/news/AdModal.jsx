import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { trackAdView } from '../../services/adService';
import { usePoints } from '../../hooks/usePoints';

function AdModal() {
  const [timeLeft, setTimeLeft] = useState(15);
  const { user } = usePoints();

  useEffect(() => {
    if (user) {
      trackAdView(user.uid, 'mock-ad-id');
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [user]);

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal-content"
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 30, scale: 0.95 }}
      >
        <h2>Advertisement</h2>
        <p>Please watch this ad for {timeLeft} seconds to view the news.</p>
        {/* Replace with actual ad integration, e.g., Google AdSense */}
        <div className="ad-placeholder">Mock Ad Content</div>
      </motion.div>
    </motion.div>
  );
}

export default AdModal;