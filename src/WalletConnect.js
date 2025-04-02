import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'; // Solana Web3.js
import * as WebBrowser from 'expo-web-browser';

const WalletConnect = ({ navigation }) => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);

    const connectWallet = async () => {
        try {
            // Check if Phantom is installed
            const { solana } = window;
            if (solana && solana.isPhantom) {
                // Connect to Phantom Wallet
                const response = await solana.connect();
                const publicKey = response.publicKey.toString();

                // Set the connected wallet address
                setWalletConnected(true);
                setWalletAddress(publicKey);

                // Show success alert
                Alert.alert('Wallet Connected!', `Connected to: ${publicKey}`, [
                    { text: 'OK', onPress: () => navigation.navigate('HomeScreen') },
                ]);

                // You can now interact with the Solana blockchain
                await getBalance(publicKey); // Get wallet balance

            } else {
                Alert.alert('Phantom Wallet not found', 'Please install Phantom Wallet extension.');
            }
        } catch (error) {
            Alert.alert('Connection Failed', 'Could not connect to wallet.');
        }
    };

    // Function to get balance of the wallet using Solana Web3.js
    const getBalance = async (publicKey) => {
        try {
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
            const walletPublicKey = new PublicKey(publicKey);

            // Get the wallet balance
            const balance = await connection.getBalance(walletPublicKey);
            console.log(`Wallet balance: ${balance / 1e9} SOL`); // SOL is in lamports, divide by 1e9 to get SOL value

            // Display balance in the UI
            Alert.alert('Wallet Balance', `Your wallet balance is: ${balance / 1e9} SOL`);
        } catch (error) {
            console.error('Error fetching balance:', error);
            Alert.alert('Error', 'Could not fetch wallet balance.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>
                {walletConnected ? `Connected: ${walletAddress}` : "Connect your Phantom Wallet"}
            </Text>
            <Button title="Connect Wallet" onPress={connectWallet} />
        </View>
    );
};

export default WalletConnect;
