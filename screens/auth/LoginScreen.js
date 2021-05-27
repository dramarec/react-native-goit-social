import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Platform,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
    email: "",
    password: "",
};

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [dimensions, setDimensions] = useState(
        Dimensions.get("window").width - 20 * 2
    );

    useEffect(() => {
        const onChange = () => {
            const width = Dimensions.get("window").width - 20 * 2;
            console.log("{*} ===> onChange ===> width", width);

            setDimensions(width);
        };
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    }, []);

    const handleSubmit = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        dispatch(authSignInUser(state));
        setState(initialState);
    };

    const keyboardHide = () => {
        Keyboard.dismiss();
        setIsShowKeyboard(false);
    };

    return (
        <TouchableWithoutFeedback onPress={keyboardHide} >

            <View style={styles.container}>
                <ImageBackground
                    style={styles.image}
                    source={require("../../assets/images/stars-on-night.jpg")}
                >

                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >

                        <View
                            style={{
                                ...styles.form, marginBottom: isShowKeyboard ? 20 : 150,
                                width: dimensions,
                            }}
                        >
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Hello again</Text>
                                <Text style={styles.headerTitle}>Welcome back</Text>
                            </View>
                            <View>
                                <Text style={styles.inputTitle}>EMAIL ADDRES</Text>
                                <TextInput
                                    style={styles.input}
                                    textAlign={"center"}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={state.email.toLowerCase()}
                                    onChangeText={(value) => setState((prevState) => ({
                                        ...prevState, email: value,
                                    }))}
                                />
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.inputTitle}>PASSWORD</Text>
                                <TextInput
                                    style={styles.input}
                                    textAlign={"center"}
                                    secureTextEntry={true}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={state.password}
                                    onChangeText={(value) => setState((prevState) => ({
                                        ...prevState, password: value,
                                    }))}
                                />
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.btn}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.btnTitle}>SIGN IN</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("Register")}
                                style={{
                                    marginTop: 20,
                                    alignSelf: "center",
                                }}
                            >
                                <Text style={{ color: "#fff" }}>
                                    New to applicatio?{"  "}
                                    <Text style={{ fontSize: 20, color: "#ff6347" }}>
                                        Sign Up
                                    </Text>
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </KeyboardAvoidingView>

                </ImageBackground>
            </View>
        </ TouchableWithoutFeedback>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#f0f8ff",
        height: 40,
        borderRadius: 6,
        color: "#f0f8ff",
    },
    form: {
        // marginHorizontal: 40,
    },
    inputTitle: {
        color: "#f0f8ff",
        marginBottom: 10,
        fontSize: 18,
        fontFamily: "DMMono-Regular",
    },
    btn: {
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
        ...Platform.select({
            ios: {
                backgroundColor: "transparent",
                borderColor: "#f0f8ff",
            },
            android: {
                backgroundColor: "#4169e1",
                borderColor: "transparent",
            },
        }),
    },
    btnTitle: {
        color: Platform.OS === "ios" ? "#4169e1" : "#f0f8ff",
        fontSize: 18,
        fontFamily: "DMMono-Regular",
    },
    header: {
        alignItems: "center",
        marginBottom: 150,
    },
    headerTitle: {
        fontSize: 40,
        color: "#f0f8ff",
        fontFamily: "DMMono-Regular",

    },
});