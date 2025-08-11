import { PublicKey } from '@solana/web3.js';

export const validateSolanaAddress = (address) => {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
};

export const requestWithdrawal = async (userId, solanaAddress, points) => {
  const bigfootAmount = points / 1000; // 1000 points = 0.001 BIGFOOT
  const withdrawalRef = firestore.collection('withdrawals').doc();
  const userRef = firestore.collection('users').doc(userId);

  try {
    if (!validateSolanaAddress(solanaAddress)) {
      throw new Error('Invalid Solana address');
    }

    await firestore.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists || userDoc.data().points < points) {
        throw new Error('Insufficient points');
      }

      transaction.update(userRef, {
        points: userDoc.data().points - points,
        lastActivity: new Date(),
      });

      transaction.set(withdrawalRef, {
        userId,
        solanaAddress,
        pointsAmount: points,
        bigfootAmount,
        status: 'pending',
        requestedAt: new Date(),
      });
    });

    // Call backend API to process BIGFOOT transfer
    const response = await fetch('http://localhost:3001/api/solana/withdraw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, solanaAddress, bigfootAmount }),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error);
    }

    return { success: true, message: 'Withdrawal requested', signature: result.signature };
  } catch (error) {
    return { success: false, message: error.message };
  }
};