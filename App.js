import React from "react";
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegisterScreen from "./screens/auth/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreateScreen from "./screens/mainScreen/CreateScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator()

const useRoute = (isAuth) => {
    if (!isAuth) {
        return (
            <AuthStack.Navigator>

                <AuthStack.Screen
                    options={{ headerShown: false }}
                    name='Register'
                    component={RegisterScreen}
                />

                <AuthStack.Screen
                    options={{ headerShown: false }}
                    name='Login'
                    component={LoginScreen}
                />

            </AuthStack.Navigator>
        );
    }
    return (
        <MainTab.Navigator>
            <MainTab.Screen name="Posts" component={PostsScreen} />
            <MainTab.Screen name="Create" component={CreateScreen} />
            <MainTab.Screen name="Profile" component={ProfileScreen} />
        </MainTab.Navigator>
    );
};

export default function App() {
    const routing = useRoute(null)
    const [loaded] = useFonts({
        "DMMono-Regular": require("./assets/fonts/DMMono-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    };

    return (
        <NavigationContainer>
            {routing}
        </NavigationContainer>

    );
}