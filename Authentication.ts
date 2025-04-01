import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FaceAuthScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [storedFaceData, setStoredFaceData] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');

            const savedFace = await AsyncStorage.getItem('faceData');
            if (savedFace) {
                setStoredFaceData(JSON.parse(savedFace));
            }
        })();
    }, []);

    const handleFacesDetected = ({ faces }) => {
        if (faces.length > 0) {
            const detectedFace = faces[0];
            if (!storedFaceData) {
                AsyncStorage.setItem('faceData', JSON.stringify(detectedFace));
                Alert.alert("Face Registered!", "Your face has been saved for future authentication.", [
                    { text: "OK" }
                ]);
                setStoredFaceData(detectedFace);
                return;
            }
            
            if (verifyFace(detectedFace, storedFaceData)) {
                setIsAuthenticated(true);
                Alert.alert("Face recognized!", "You are now authenticated.", [
                    { text: "OK", onPress: () => navigation.navigate('WalletConnect') }
                ]);
            } else {
                Alert.alert("Face not recognized", "Try again.");
            }
        }
    };

    const verifyFace = (detectedFace, storedFace) => {
        const tolerance = 10; // Adjust based on accuracy needs
        return Math.abs(detectedFace.bounds.origin.x - storedFace.bounds.origin.x) < tolerance &&
               Math.abs(detectedFace.bounds.origin.y - storedFace.bounds.origin.y) < tolerance;
    };

    if (hasPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            {!isAuthenticated ? (
                <Camera
                    style={{ flex: 1 }}
                    type={Camera.Constants.Type.front}
                    onFacesDetected={handleFacesDetected}
                    faceDetectorSettings={{
                        mode: FaceDetector.FaceDetectorMode.fast,
                        detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                        runClassifications: FaceDetector.FaceDetectorClassifications.all,
                    }}
                />
            ) : (
                <Text>Authenticated! Redirecting...</Text>
            )}
        </View>
    );
};

export default FaceAuthScreen;
