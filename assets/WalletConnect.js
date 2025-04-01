import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { encodeURL } from '@solana/pay';

const WalletConnect = ({ navigation }) => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);

    const connectWallet = async () => {
        try {
            const phantomDeepLink = 'https://phantom.app/ul/v1/connect';
            await WebBrowser.openBrowserAsync(phantomDeepLink);
            
            // Simulated response (In real case, we need backend handling)
            setWalletConnected(true);
            setWalletAddress('YourSolanaWalletAddress');
            
            Alert.alert("Wallet Connected!", "You are now connected to Phantom.", [
                { text: "OK", onPress: () => navigation.navigate('HomeScreen') }
            ]);
        } catch (error) {
            Alert.alert("Connection Failed", "Could not connect to wallet.");
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
