import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

export const useSolanaWallet = () => {
  const { publicKey, connect, disconnect, wallets, select } = useWallet();
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const conn = new Connection(import.meta.env.VITE_SOLANA_RPC_URL, 'confirmed');
    setConnection(conn);
  }, []);

  const connectWallet = async (walletName) => {
    try {
      const wallet = wallets.find((w) => w.adapter.name === walletName);
      if (wallet) {
        select(wallet.adapter.name);
        await connect();
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  return { publicKey, connectWallet, disconnect, connection };
};