// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuração do Firebase (substitua pelos seus valores)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "sua-api-key-aqui",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "bigfoot-esports.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "bigfoot-esports",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "bigfoot-esports.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abc123def456"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços do Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
