// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAV8x3oA2D3UO5niAmwo88U9Of3hj7VNaQ",
  authDomain: "bigfoot-esports.firebaseapp.com",
  projectId: "bigfoot-esports",
  storageBucket: "bigfoot-esports.firebasestorage.app",
  messagingSenderId: "868767435883",
  appId: "1:868767435883:web:f90f8d3d5bfd66e933752e",
  measurementId: "G-S26ZFJRD3M"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Exporta serviços
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const firestore = getFirestore(app);