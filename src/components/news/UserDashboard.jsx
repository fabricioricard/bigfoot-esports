import { motion } from 'framer-motion';
import { usePoints } from '../../hooks/usePoints';
import { useTransactions } from '../../hooks/useTransactions';

function UserDashboard() {
  const { points } = usePoints();
  const transactions = useTransactions();

  return (
    <main>
      <section className="container reveal">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          📊 User Dashboard
        </motion.h2>
        <p>Total Points: {points}</p>
        <h3>Transaction History</h3>
        <ul>
          {transactions.map((tx) => (
            <li key={tx.id}>
              {tx.type === 'news_read' ? 'News Read' : 'Withdrawal'}: {tx.points} points on{' '}
              {new Date(tx.timestamp.toDate()).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default UserDashboard;