import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebaseConfig';

export const useTransactions = () => {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore
        .collection('transactions')
        .where('userId', '==', user.uid)
        .orderBy('timestamp', 'desc')
        .limit(50)
        .onSnapshot((snapshot) => {
          setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
      return () => unsubscribe();
    }
  }, [user]);

  return transactions;
};