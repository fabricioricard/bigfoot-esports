import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import { getUserPoints } from '../services/pointsService';

export const usePoints = () => {
  const [user] = useAuthState(auth);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (user) {
      getUserPoints(user.uid).then(setPoints);
    }
  }, [user]);

  return { points, user };
};