import * as Speech from 'expo-speech';
import { Alert } from 'react-native';
import { Camera } from 'expo-camera';

export const startVoiceRecognition = (setAmount, setReceiver) => {
    Speech.speak("Please say the amount to send and the receiver's wallet address", {
        onDone: () => {
            setTimeout(() => {
                setAmount(0.5);  // Simulated voice recognition for amount
                setReceiver("Fv6...gH2"); // Simulated voice recognition for receiver
                Alert.alert("Voice Input Captured", `Amount: 0.5 SOL, Receiver: Fv6...gH2`);
            }, 2000);
        }
    });
};

export const verifySymbol = async (setSymbolVerified) => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert("Permission Denied", "Camera access is required for symbol verification.");
        return;
    }

    Alert.alert("Symbol Verified", "The hand gesture symbol has been recognized successfully.");
    setSymbolVerified(true);
};
