import { auth, firestore } from './firebaseConfig';

export const initializeFirebase = () => {
  // Additional initialization logic if needed
  firestore.settings({ ignoreUndefinedProperties: true });
};

export { auth, firestore };