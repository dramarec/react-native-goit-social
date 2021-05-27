import React from "react";
import { Provider } from "react-redux";
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from "./router";
import { store } from "./redux/store";

export default function App() {
    // null => auth, {} => MainTab
    const routing = useRoute(false)
    const [loaded] = useFonts({
        "DMMono-Regular": require("./assets/fonts/DMMono-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    };

    return (
        <Provider store={store}>
            <NavigationContainer>
                {routing}
            </NavigationContainer>
        </Provider>
    );
}