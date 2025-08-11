import { motion } from 'framer-motion';
import { useState } from 'react';
import { usePoints } from '../../hooks/usePoints';
import { useSolanaWallet } from '../../hooks/useSolanaWallet';
import { useNewsContext } from '../../context/NewsContext';
import { requestWithdrawal } from '../../services/solanaService';
import { useNotifications } from '../../hooks/useNotifications';

function WithdrawalModal() {
  const { setShowWithdrawalModal } = useNewsContext();
  const { user, points } = usePoints();
  const { publicKey } = useSolanaWallet();
  const [solanaAddress, setSolanaAddress] = useState(publicKey?.toString() || '');
  const { addNotification } = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (points < 1000) {
      addNotification('Insufficient points', 'error');
      return;
    }

    const result = await requestWithdrawal(user.uid, solanaAddress, 1000);
    addNotification(result.message, result.success ? 'success' : 'error');
    if (result.success) {
      setShowWithdrawalModal(false);
    }
  };

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowWithdrawalModal(false)}
    >
      <motion.div
        className="modal-content"
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 30, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="modal-close" onClick={() => setShowWithdrawalModal(false)}>×</span>
        <h2>Withdraw Points to BIGFOOT</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="solana-address">Solana Address</label>
            <input
              type="text"
              id="solana-address"
              value={solanaAddress}
              onChange={(e) => setSolanaAddress(e.target.value)}
              placeholder="Enter Solana address"
              disabled={!!publicKey}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Withdraw 1000 Points (0.001 BIGFOOT)
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default WithdrawalModal;