// src/components/common/NotificationToast.jsx
import React, { useEffect, useState } from 'react';

const NotificationToast = ({ message, type = 'success', onClose, autoClose = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animação de entrada
    setIsVisible(true);

    // Auto-close
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Aguarda a animação de saída
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [onClose, autoClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-600',
          icon: '✅',
          border: 'border-green-500'
        };
      case 'error':
        return {
          bg: 'bg-red-600',
          icon: '❌',
          border: 'border-red-500'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-600',
          icon: '⚠️',
          border: 'border-yellow-500'
        };
      case 'info':
        return {
          bg: 'bg-blue-600',
          icon: 'ℹ️',
          border: 'border-blue-500'
        };
      default:
        return {
          bg: 'bg-gray-600',
          icon: '📢',
          border: 'border-gray-500'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`
        ${styles.bg} ${styles.border} border rounded-lg shadow-lg p-4 text-white min-w-80 max-w-96
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-lg">{styles.icon}</span>
          <p className="text-sm font-medium">{message}</p>
        </div>
        
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
