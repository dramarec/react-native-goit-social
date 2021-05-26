import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator()

import RegisterScreen from "./screens/auth/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreateScreen from "./screens/mainScreen/CreateScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";

// icons import
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const useRoute = (isAuth) => {
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
        <MainTab.Navigator tabBarOptions={{ showLabel: false }}>

            <MainTab.Screen name="Posts" component={PostsScreen} options={{
                tabBarIcon: ({ focused, size, color }) => (
                    <MaterialCommunityIcons
                        name="postage-stamp"
                        size={size}
                        color={color}
                    />
                ),
            }}
            />

            <MainTab.Screen name="Create" component={CreateScreen} options={{
                tabBarIcon: ({ focused, size, color }) => (
                    <AntDesign
                        name="pluscircleo"
                        size={40}
                        color={color}
                    />
                ),
            }}
            />

            <MainTab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused, size, color }) => (
                    <MaterialCommunityIcons
                        name="face-profile"
                        size={size}
                        color={color}
                    />
                ),
            }} />

        </MainTab.Navigator>
    );
};