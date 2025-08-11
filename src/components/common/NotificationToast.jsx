import { motion } from 'framer-motion';
import { useNotifications } from '../../hooks/useNotifications';

function NotificationToast() {
  const { notifications } = useNotifications();

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          className={`notification ${notification.type}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          {notification.message}
        </motion.div>
      ))}
    </div>
  );
}

export default NotificationToast;