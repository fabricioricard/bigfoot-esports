// src/context/NewsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const NewsContext = createContext();

export const useNewsContext = () => {  // mudou de useNews para useNewsContext
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext deve ser usado dentro de um NewsProvider');
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
