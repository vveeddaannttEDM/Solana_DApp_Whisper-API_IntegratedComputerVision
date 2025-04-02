import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WalletConnect from '../components/WalletConnect';
import HomeScreen from '../components/HomeScreen';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="WalletConnect">
                <Stack.Screen name="WalletConnect" component={WalletConnect} options={{ title: 'Connect Wallet' }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
