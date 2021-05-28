import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import shortid from "shortid";
import db from "../../firebase/config";


const CreateScreen = ({ navigation }) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [comment, setComment] = useState("");
    const [location, setLocation] = useState(null);


    useEffect(() => {
        (async () => {
            Camera.requestPermissionsAsync();

            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();
        // await Location.getCurrentPositionAsync({});
        setPhoto(photo.uri);
    };

    const sendPhoto = () => {
        uploadPhotoToServer()
        navigation.navigate("DefaultScreen", { photo });
    };

    const uploadPhotoToServer = async () => {
        const response = await fetch(photo);
        const file = await response.blob();
        const uniId = shortid.generate();

        await db
            .storage()
            .ref(`postImage/${uniId}`)
            .put(file);


        const processedPhoto = await db
            .storage()
            .ref('postImage')
            .child(uniId)
            .getDownloadURL()

        console.log("{*} ===> processedPhoto", processedPhoto);
    };

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={setCamera}>
                {photo && (
                    <View style={styles.takePhotoContainer}>
                        <Image style={styles.picture} source={{ uri: photo }} />
                    </View>
                )}
                <TouchableOpacity style={styles.snapContainer} onPress={takePhoto} >
                    <Text style={styles.snap}>SNAP</Text>
                </TouchableOpacity>
            </Camera>

            <View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} onChangeText={setComment} />
                </View>

                <TouchableOpacity style={styles.sendBtn} onPress={sendPhoto} >
                    <Text style={styles.sendLabel}>SEND</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        height: "70%",
        marginHorizontal: 2,
        marginTop: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    takePhotoContainer: {
        position: "absolute",
        top: 50,
        left: 10,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
    },
    picture: {
        height: 200,
        width: 200,
        borderRadius: 20,
    },
    snapContainer: {
        borderWidth: 1,
        borderColor: "#ff0000",
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    snap: {
        color: "#fff",
    },
    sendBtn: {
        marginHorizontal: 30,
        height: 40,
        borderWidth: 2,
        borderColor: "#20b2aa",
        borderRadius: 10,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    sendLabel: {
        color: "#20b2aa",
        fontSize: 20,
    },
    inputContainer: {
        marginHorizontal: 10,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#fff",
        borderBottomColor: "#20b2aa",
    },
});

export default CreateScreen;

    // useEffect(() => {
    //     (async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             setErrorMsg('Permission to access location was denied');
    //             return;
    //         }

    //         let location = await Location.getCurrentPositionAsync({});
    //         setLocation(location);
    //     })();
    // }, []);