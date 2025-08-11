const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const { Connection, Keypair, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } = require('@solana/web3.js');
const { getOrCreateAssociatedTokenAccount, transfer } = require('@solana/spl-token');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert('./serviceAccountKey.json'),
});

const connection = new Connection(process.env.SOLANA_RPC_URL, 'confirmed');
const wallet = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env.SOLANA_SECRET_KEY))
);
const bigfootToken = new PublicKey(process.env.BIGFOOT_TOKEN_ADDRESS);

app.post('/api/solana/withdraw', async (req, res) => {
  const { userId, solanaAddress, bigfootAmount } = req.body;

  try {
    const recipient = new PublicKey(solanaAddress);
    const withdrawalRef = admin.firestore().collection('withdrawals').doc();

    // Get or create recipient's token account
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      bigfootToken,
      recipient
    );

    // Get sender's token account
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      bigfootToken,
      wallet.publicKey
    );

    // Transfer BIGFOOT tokens
    const amount = bigfootAmount * 1e9; // Assuming 9 decimals
    const signature = await transfer(
      connection,
      wallet,
      senderTokenAccount.address,
      recipientTokenAccount.address,
      wallet,
      amount
    );

    // Update Firestore
    await withdrawalRef.update({
      status: 'completed',
      completedAt: new Date(),
      transactionSignature: signature,
    });

    res.json({ success: true, signature });
  } catch (error) {
    await withdrawalRef.update({
      status: 'failed',
      completedAt: new Date(),
      error: error.message,
    });
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3001, () => console.log('Backend running on port 3001'));