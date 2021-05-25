import React from "react";
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import RegisterScreen from "./screens/auth/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen";

const AuthStack = createStackNavigator();

export default function App() {
    const [loaded] = useFonts({
        "DMMono-Regular": require("./assets/fonts/DMMono-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <AuthStack.Navigator>
                <AuthStack.Screen name='Register' component={RegisterScreen} />
                <AuthStack.Screen name='Login' component={LoginScreen} />
            </AuthStack.Navigator>
        </NavigationContainer>

    );
}