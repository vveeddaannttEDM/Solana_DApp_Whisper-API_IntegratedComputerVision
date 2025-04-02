import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WalletConnect from './WalletConnect';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="WalletConnect">
                <Stack.Screen name="WalletConnect" component={WalletConnect} options={{ title: 'Connect Wallet' }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
