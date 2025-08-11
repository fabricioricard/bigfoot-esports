import { firestore } from '../firebase/firebaseConfig';

export const awardPoints = async (userId, newsId) => {
  const readNewsRef = firestore.collection('readNews').doc(`${userId}_${newsId}`);
  const userRef = firestore.collection('users').doc(userId);
  const transactionRef = firestore.collection('transactions').doc();

  try {
    const readNews = await readNewsRef.get();
    if (readNews.exists) {
      throw new Error('News already read');
    }

    await firestore.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      transaction.set(readNewsRef, {
        userId,
        newsId,
        readAt: new Date(),
      });

      transaction.update(userRef, {
        points: (userDoc.data().points || 0) + 10,
        lastActivity: new Date(),
      });

      transaction.set(transactionRef, {
        userId,
        points: 10,
        type: 'news_read',
        timestamp: new Date(),
      });
    });

    return { success: true, message: '10 points awarded' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getUserPoints = async (userId) => {
  const userRef = firestore.collection('users').doc(userId);
  const userDoc = await userRef.get();
  return userDoc.exists ? userDoc.data().points || 0 : 0;
};