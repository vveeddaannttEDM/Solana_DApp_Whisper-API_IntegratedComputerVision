import { Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export const fetchBalance = async (walletAddress) => {
    try {
        const publicKey = new PublicKey(walletAddress);
        const balance = await connection.getBalance(publicKey);
        return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
};

export const sendTransaction = async (senderAddress, receiverAddress, amount) => {
    try {
        const senderPublicKey = new PublicKey(senderAddress);
        const receiverPublicKey = new PublicKey(receiverAddress);
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: senderPublicKey,
                toPubkey: receiverPublicKey,
                lamports: amount * 1e9,
            })
        );

        // Placeholder for signing and sending the transaction
        console.log('Transaction ready:', transaction);
        return 'Transaction initiated';
    } catch (error) {
        console.error('Transaction error:', error);
        throw error;
    }
};
