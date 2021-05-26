import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";

const CreateScreen = ({ navigation }) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);

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

    const takePhoto = async () => {
        // console.log("{*} ===> CreateScreen ===> camera", camera.takePictureAsync());
        const photo = await camera.takePictureAsync();
        setPhoto(photo.uri);

        const location = await Location.getCurrentPositionAsync({});
        console.log("latitude", location.coords.latitude);
        console.log("longitude", location.coords.longitude);
        // console.log("{*} ===> takePhoto ===> location", location);

        // console.log("photo", photo);
    };

    const sendPhoto = () => {
        console.log("navigation", navigation);
        navigation.navigate("Posts", { photo });
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
});

export default CreateScreen;
