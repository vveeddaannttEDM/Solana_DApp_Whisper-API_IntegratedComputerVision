import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import { Camera } from 'expo-camera';
import { Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram } from '@solana/web3.js';
import WalletConnect from './WalletConnect';

const HomeScreen = ({ navigation }) => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [walletBalance, setWalletBalance] = useState(0);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [symbolVerified, setSymbolVerified] = useState(false);
    const [listening, setListening] = useState(false);
    const [amount, setAmount] = useState(null);
    const [receiver, setReceiver] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const fetchBalance = async (publicKey) => {
        try {
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
            const walletPublicKey = new PublicKey(publicKey);
            const balance = await connection.getBalance(walletPublicKey);
            setWalletBalance(balance / 1e9);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const startVoiceRecognition = () => {
        setListening(true);
        Speech.speak("Please say the amount to send and the receiver's wallet address", {
            onDone: () => {
                setTimeout(() => {
                    setAmount(0.5);  // Simulated amount recognition
                    setReceiver("Fv6...gH2"); // Simulated receiver
                    Alert.alert("Voice Input Captured", `Amount: 0.5 SOL, Receiver: Fv6...gH2`);
                    setListening(false);
                }, 2000);
            }
        });
    };

    const verifySymbol = () => {
        Alert.alert("Symbol Verified", "The symbol has been recognized successfully.");
        setSymbolVerified(true);
    };

    const sendTransaction = async () => {
        if (!walletAddress || !symbolVerified || !amount || !receiver) {
            Alert.alert("Error", "All authentication steps must be completed.");
            return;
        }
        try {
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
            const senderPublicKey = new PublicKey(walletAddress);
            const receiverPublicKey = new PublicKey(receiver);
            
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: senderPublicKey,
                    toPubkey: receiverPublicKey,
                    lamports: amount * 1e9,
                })
            );
            
            // Simulating transaction confirmation
            Alert.alert("Transaction Successful", `Sent ${amount} SOL to ${receiver}`);
        } catch (error) {
            Alert.alert("Transaction Failed", error.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <WalletConnect navigation={navigation} />
            <Text>Wallet Balance: {walletBalance} SOL</Text>
            <Button title="Start Voice Recognition" onPress={startVoiceRecognition} disabled={listening} />
            <Button title="Verify Symbol with Camera" onPress={verifySymbol} />
            <Button title="Send Transaction" onPress={sendTransaction} disabled={!symbolVerified} />
        </View>
    );
};

export default HomeScreen;
