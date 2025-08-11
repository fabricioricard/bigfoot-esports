import { motion } from 'framer-motion';
import { usePoints } from '../../hooks/usePoints';
import { useNewsContext } from '../../context/NewsContext';

function PointsDisplay() {
  const { points } = usePoints();
  const { setShowWithdrawalModal } = useNewsContext();

  return (
    <motion.div
      className="points-display"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <p>Your Points: {points}</p>
      <button
        className="btn btn-primary"
        onClick={() => setShowWithdrawalModal(true)}
        disabled={points < 1000}
      >
        Withdraw to Nano
      </button>
    </motion.div>
  );
}

export default PointsDisplay;