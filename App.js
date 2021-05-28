import React from "react";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useFonts } from 'expo-font';

import Main from "./components/Main";


export default function App() {

    const [loaded] = useFonts({
        "DMMono-Regular": require("./assets/fonts/DMMono-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    };

    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}