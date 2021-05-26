import React from "react";
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import { useRoute } from "./router";

export default function App() {
    // null => auth, {} => MainTab
    const routing = useRoute({})
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