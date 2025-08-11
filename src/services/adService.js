import { firestore } from '../firebase/firebaseConfig';

export const trackAdView = async (userId, adId) => {
  const adViewRef = firestore.collection('adViews').doc(`${adId}_${userId}_${Date.now()}`);

  try {
    await adViewRef.set({
      adId,
      userId,
      viewedAt: new Date(),
      completed: false,
    });

    // Simulate ad completion after 15 seconds
    setTimeout(async () => {
      await adViewRef.update({ completed: true });
    }, 15000);

    return { success: true, message: 'Ad view tracked' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};