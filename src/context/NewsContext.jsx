// src/context/NewsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews deve ser usado dentro de um NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // Se o usuário estiver logado, carrega seus pontos
      if (user) {
        loadUserPoints(user.uid);
      } else {
        setUserPoints(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserPoints = async (userId) => {
    try {
      // Aqui você pode implementar a lógica para carregar pontos do Firebase
      // Por enquanto, vamos usar um valor mock
      setUserPoints(150);
    } catch (error) {
      console.error('Erro ao carregar pontos:', error);
    }
  };

  const addPoints = (points) => {
    setUserPoints(prev => prev + points);
  };

  const spendPoints = (points) => {
    if (userPoints >= points) {
      setUserPoints(prev => prev - points);
      return true;
    }
    return false;
  };

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    // Remove a notificação após 3 segundos
    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const value = {
    user,
    loading,
    news,
    setNews,
    userPoints,
    addPoints,
    spendPoints,
    notifications,
    addNotification,
    removeNotification
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};
